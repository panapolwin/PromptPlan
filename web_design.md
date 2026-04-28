# Online Grader

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend + Backend | Next.js App Router |
| Styling | Tailwind CSS |
| Auth | Auth.js (Credentials Provider) |
| Database | SQLite via Prisma |
| File Upload | Next.js API Route + formidable |
| Grader Execution | Node.js child_process (Windows) |
| Sandboxing | Windows Job Object to cap time/memory and block folder access |
| Live Status | Client polling every 2s |

---

## Data Models

### User
- id
- username
- passwordHash
- role: USER | ADMIN

### Task
- id
- name
- folderName (matches folder inside task_list/)
- description (markdown, from problem.md)
- visible (boolean — admin toggles whether task appears on main page)

### Submission
- id
- userId → User
- taskId → Task
- filePath (uploaded .cpp file)
- score (0–100, null while pending)
- status: PENDING | RUNNING | COMPILE_ERROR | ACCEPTED | WRONG_ANSWER | TIME_LIMIT | MEMORY_LIMIT | ERROR
- submittedAt

### TestCaseResult
- id
- submissionId → Submission
- testCaseIndex (1, 2, 3, …)
- passed (boolean)
- verdict: PASS | WRONG_OUTPUT | TIMEOUT | MEMORY_EXCEEDED
- timeTaken (ms, null if not measured)
- memoryUsed (KB, null if not measured)

---

## File Structure

```
app/
├── (main)/
│   ├── page.tsx                       ← Task list (main page)
│   ├── task/[name]/page.tsx           ← Individual task + submit
│   └── ranking/page.tsx               ← Global ranking
├── user/[username]/page.tsx           ← Personal score page
├── admin/
│   └── page.tsx                       ← Admin panel (ADMIN role only)
└── api/
    ├── submit/route.ts                ← Upload .cpp + start grading
    └── submission/[id]/route.ts       ← Poll submission status + test case results

task_list/
├── aplusb/
│   ├── problem.md                     ← Task description (markdown)
│   ├── config.json                    ← Per-task limits (see schema below)
│   └── testcases/
│       ├── 1.in / 1.out
│       ├── 2.in / 2.out
│       └── ...
└── sorting/
    └── ...
```

### config.json schema (per task)
```json
{
  "timeLimit": 2000,
  "memoryLimit": 65536
}
```
- `timeLimit` — milliseconds per test case
- `memoryLimit` — kilobytes per test case

---

## Pages

### Main Page (Task List)
- Header menu bar: **Tasks** | **Ranking**
- Search bar — filters task boxes by name in real time
- Grid of task cards — only tasks where `visible = true`

#### Task Card
- Task name
- Score: `?/100`
- Color by score:
  - Not attempted → pastel gray (`bg-gray-100 border-gray-300`)
  - `0/100` → pastel red (`bg-red-100 border-red-300`)
  - Partial score → pastel yellow (`bg-yellow-100 border-yellow-300`)
  - `100/100` → pastel green (`bg-green-100 border-green-300`)
- Click → go to individual task page

---

### Ranking Page
- Header menu bar: **Tasks** | **Ranking**
- Table of all users sorted by total score descending
- Top 3 rows highlighted (gold / silver / bronze)

#### Ranking Row
- Rank number
- Username
- Total score (sum of best score per visible task)
- Click → go to personal score page

---

### Individual Task Page
- Header: task name
- Task description (rendered from problem.md)
- File picker — accepts `.cpp` only
- Submit button → uploads file → shows judging state
- **Submission result panel** (appears after grading completes):
  - Overall score `XX/100`
  - Overall verdict badge with color:
    - COMPILE_ERROR → gray
    - ACCEPTED → green
    - WRONG_ANSWER → red
    - TIME_LIMIT → orange
    - MEMORY_LIMIT → purple
    - ERROR → gray
  - Test case result table:

| # | Verdict | Time | Memory |
|---|---|---|---|
| 1 | ✅ PASS | 12 ms | 1024 KB |
| 2 | ❌ WRONG OUTPUT | 8 ms | 980 KB |
| 3 | ❌ TIMEOUT | >2000 ms | — |
| 4 | ❌ MEMORY EXCEEDED | — | >65536 KB |

- Verdict color coding per row:
  - PASS → green
  - WRONG OUTPUT → red
  - TIMEOUT → orange
  - MEMORY EXCEEDED → purple
- Past submissions list below (date, score, status — click to expand test case table)

---

### Personal Score Page
- Header: username
- Table of all visible tasks sorted by best score descending
- Each row:
  - Task name (links to task page)
  - Best score out of 100
  - Visual progress bar (`w-[{score}%]`)
  - Date of best submission

---

### Admin Page (`/admin`, ADMIN role only)
- Redirect non-admin users to `/`
- List of all tasks discovered from task_list/ folder
- Each task row:
  - Task name (folderName)
  - Visible toggle (on/off) — updates `Task.visible` in DB
  - If task is in task_list/ but not yet in DB → show "Add" button to register it
- No task creation or deletion — task folders are managed on the filesystem

---

## Grader Backend (API)

### Submit flow (`/api/submit`)
1. Validate user is authenticated
2. Validate file extension is `.cpp`
3. Save file to `uploads/{userId}/{taskName}/{timestamp}.cpp`
4. Create `Submission` row with `status: PENDING`
5. Return `submissionId` immediately
6. Background job (Node.js, non-blocking):
   a. Compile `.cpp` with `g++` → if fails, set status `COMPILE_ERROR` and stop
   b. Read `task_list/{taskName}/config.json` for `timeLimit` and `memoryLimit`
   c. For each test case `{n}.in` / `{n}.out`:
      - Spawn compiled binary inside a **Windows Job Object**:
        - Cap wall-clock time via `setTimeout` + `process.kill`
        - Cap memory by monitoring with `wmic process` polling
        - Restrict filesystem access via Low Integrity level
      - Feed `{n}.in` as stdin
      - Compare stdout (trimmed) to `{n}.out` (trimmed)
      - Record verdict: PASS / WRONG_OUTPUT / TIMEOUT / MEMORY_EXCEEDED
      - Write `TestCaseResult` row immediately (so poll can show live progress)
   d. Compute `score = floor((passed / total) * 100)`
   e. Set overall `Submission.status`:
      - All pass → ACCEPTED
      - Any TIMEOUT → TIME_LIMIT
      - Any MEMORY_EXCEEDED → MEMORY_LIMIT
      - Any WRONG_OUTPUT (and no timeout/mem) → WRONG_ANSWER
   f. Update `Submission` with final score and status

### Poll flow (`/api/submission/[id]`)
- Returns `status`, `score`, and all `TestCaseResult` rows written so far
- Frontend polls every 2 seconds until status is not PENDING or RUNNING
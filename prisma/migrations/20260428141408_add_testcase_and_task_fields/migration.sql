-- CreateTable
CREATE TABLE "TestCase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "taskId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "expectedOutput" TEXT NOT NULL,
    CONSTRAINT "TestCase_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "folderName" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "timeLimit" INTEGER NOT NULL DEFAULT 2000,
    "memoryLimit" INTEGER NOT NULL DEFAULT 65536
);
INSERT INTO "new_Task" ("folderName", "id", "name", "visible") SELECT "folderName", "id", "name", "visible" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_name_key" ON "Task"("name");
CREATE UNIQUE INDEX "Task_folderName_key" ON "Task"("folderName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

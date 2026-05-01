const { spawn, exec } = require('child_process')
const http = require('http')
const { Resolver } = require('dns').promises
const resolver = new Resolver()
resolver.setServers(['1.1.1.1', '8.8.8.8'])

function get(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => { res.resume(); resolve(true) })
      .on('error', () => resolve(false))
  })
}

async function waitForNextJs() {
  process.stdout.write('Waiting for Next.js on localhost:3000')
  for (let i = 0; i < 60; i++) {
    if (await get('/')) break
    process.stdout.write('.')
    await new Promise((r) => setTimeout(r, 2000))
    if (i === 59) {
      console.error('\nNext.js did not start in time.')
      process.exit(1)
    }
  }
  console.log('\nNext.js ready. Starting tunnel...')
}

async function waitForDns(hostname) {
  for (let i = 0; i < 30; i++) {
    try {
      await resolver.resolve(hostname)
      return true
    } catch {
      await new Promise((r) => setTimeout(r, 1000))
    }
  }
  return false
}

function startTunnel() {
  const cf = spawn(require('cloudflared').bin, ['--url', 'http://localhost:3000'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  let opened = false

  async function checkLine(line) {
    process.stdout.write(line + '\n')
    if (opened) return
    const match = line.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/)
    if (match) {
      opened = true
      const url = match[0]
      const hostname = url.replace('https://', '')
      console.log('\n>>> Tunnel URL:', url, '— waiting for DNS...')
      const ok = await waitForDns(hostname)
      if (ok) {
        console.log('DNS ready. Opening browser...')
        exec(`start "" "${url}"`)
      } else {
        console.log('DNS timed out. Open manually:', url)
      }
    }
  }

  cf.stdout.on('data', (d) => d.toString().split('\n').forEach(checkLine))
  cf.stderr.on('data', (d) => d.toString().split('\n').forEach(checkLine))
  cf.on('exit', (code) => process.exit(code ?? 0))
}

waitForNextJs().then(startTunnel)
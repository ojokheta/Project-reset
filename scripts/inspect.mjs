import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 9333
const URL = process.argv[2] || 'http://localhost:3000/'
const EVAL = process.argv[3] || ''
const SHOT = process.argv[4] || ''

const running = await fetch(`http://127.0.0.1:${PORT}/json/version`).then(r => r.ok).catch(() => false)
const chrome = running ? null : spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu', '--no-sandbox',
  `--user-data-dir=/tmp/qoder-chrome-profile`,
  '--window-size=1680,990', '--hide-scrollbars', 'about:blank',
], { stdio: ['ignore', 'ignore', 'inherit'] })

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

const send = async (ws, id, method, params = {}) => {
  ws.send(JSON.stringify({ id, method, params }))
  return new Promise((resolve, reject) => {
    const on = (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.id !== id) return
      ws.removeEventListener('message', on)
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)
    }
    ws.addEventListener('message', on)
  })
}

const evalJs = async (ws, expression) => {
  const r = await send(ws, Math.random() * 1e6 | 0, 'Runtime.evaluate', {
    expression, returnByValue: true, awaitPromise: true,
  })
  return r.result?.value ?? r.exceptionDetails?.text
}

try {
  let target
  for (let i = 0; i < 40 && !target; i++) {
    await sleep(250)
    target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json())
      .find(t => t.type === 'page')
  }
  const ws = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise(r => ws.addEventListener('open', r))

  await send(ws, 1, 'Page.enable')
  await send(ws, 5, 'Runtime.enable')
  const logs = []
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails
      logs.push('EXCEPTION: ' + (d.exception?.description || d.text))
    }
    if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(msg.params.type)) {
      const fmt = (a) => a?.value ?? a?.description ?? (a?.preview ? JSON.stringify(a.preview.properties) : a?.type)
      logs.push(msg.params.type.toUpperCase() + ': ' + msg.params.args.map(fmt).join(' ').slice(0, 500))
    }
  })
  await send(ws, 2, 'Emulation.setDeviceMetricsOverride', {
    width: 1680, height: 990, deviceScaleFactor: 2, mobile: false,
  })
  await send(ws, 3, 'Page.navigate', { url: URL })
  await sleep(3500)

  if (EVAL) console.log(JSON.stringify(await evalJs(ws, EVAL), null, 2))
  if (SHOT) {
    const { data } = await send(ws, 4, 'Page.captureScreenshot', { format: 'png' })
    writeFileSync(SHOT, Buffer.from(data, 'base64'))
    console.log('screenshot:', SHOT)
  }
  console.log('--- console ---')
  console.log(logs.join('\n') || '(no errors or warnings)')
  ws.close()
} finally {
  chrome?.kill()
  process.exit(0)
}

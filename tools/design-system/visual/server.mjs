import { createReadStream } from 'node:fs'
import { realpath, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, sep } from 'node:path'
import { buildsDirectory } from './model.mjs'
import { readManifest, root, serverPort } from './runtime.mjs'

const manifest = readManifest()
const directory = await realpath(join(root, buildsDirectory))
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405).end()
    return
  }
  const pathname = new URL(request.url, 'http://127.0.0.1').pathname
  // Chromium requests the origin favicon independently of the story iframe.
  // This preview server has no origin-level application or favicon.
  if (pathname === '/favicon.ico') {
    response.writeHead(204).end()
    return
  }
  if (pathname === '/__shoreline_visual_ready') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(
      JSON.stringify({ themes: manifest.themes, inputHash: manifest.inputHash })
    )
    return
  }
  try {
    const segments = decodeURIComponent(pathname).split('/').filter(Boolean)
    if (
      !manifest.themes.includes(segments[0]) ||
      segments.some(
        (part) => part === '..' || part === '.' || part.includes('\\')
      )
    ) {
      throw new Error('Invalid asset path')
    }
    if (segments.length === 1 || pathname.endsWith('/'))
      segments.push('index.html')
    const file = await realpath(join(directory, ...segments))
    if (
      !file.startsWith(`${directory}${sep}`) ||
      !(await stat(file)).isFile()
    ) {
      throw new Error('Asset outside the static build')
    }
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(file)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    })
    if (request.method === 'HEAD') response.end()
    else
      createReadStream(file)
        .on('error', () => response.destroy())
        .pipe(response)
  } catch {
    response.writeHead(404).end('Static asset not found')
  }
})

server.listen(serverPort(), '127.0.0.1', () => {
  console.log(`Serving isolated theme builds on 127.0.0.1:${serverPort()}`)
})
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => server.close(() => process.exit(0)))
}

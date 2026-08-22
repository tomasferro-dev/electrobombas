/**
 * Verifica el ruteo de vercel.json contra el build.
 *
 * `vite preview` no lee vercel.json, así que los redirects, cleanUrls y el
 * 404 con status real no se pueden probar con el preview normal. Este script
 * levanta un servidor sobre dist/ aplicando las mismas reglas que Vercel
 * —redirects primero, después el filesystem, después 404.html— y corre una
 * tabla de aserciones.
 *
 * No reemplaza a probar el deploy real, pero atrapa los errores de config
 * antes de subir. Para verificar contra Vercel:
 *   node scripts/verify-routing.mjs --base https://<deploy>.vercel.app
 *
 * Uso:  node scripts/verify-routing.mjs
 */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'

const DIST = 'dist'
const vercel = JSON.parse(await readFile('vercel.json', 'utf-8'))
const baseArg = process.argv.indexOf('--base')
const REMOTO = baseArg > -1 ? process.argv[baseArg + 1] : null

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json',
}

const existe = async (p) => {
  try { return (await stat(p)).isFile() } catch { return false }
}

/** Reproduce el orden de resolución de Vercel para una ruta. */
async function resolver(pathname) {
  // 1. redirects. permanent:true en Vercel devuelve 308, que Google trata
  //    igual que un 301: ambos son redirecciones permanentes.
  for (const r of vercel.redirects ?? []) {
    if (r.source === pathname) {
      return { status: r.permanent ? 308 : 307, location: r.destination }
    }
  }

  // 2. trailingSlash: false -> /venta/ redirige a /venta
  if (vercel.trailingSlash === false && pathname.length > 1 && pathname.endsWith('/')) {
    return { status: 308, location: pathname.slice(0, -1) }
  }

  // 3. cleanUrls: /venta.html redirige a /venta
  if (vercel.cleanUrls && pathname.endsWith('.html')) {
    return { status: 308, location: pathname.slice(0, -5) }
  }

  // 4. filesystem
  const directo = join(DIST, pathname)
  if (pathname !== '/' && await existe(directo)) return { status: 200, file: directo }

  const comoHtml = join(DIST, pathname === '/' ? 'index.html' : `${pathname}.html`)
  if (await existe(comoHtml)) return { status: 200, file: comoHtml }

  const comoIndice = join(DIST, pathname, 'index.html')
  if (await existe(comoIndice)) return { status: 200, file: comoIndice }

  // 5. 404 real
  return { status: 404, file: join(DIST, '404.html') }
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost')
  const r = await resolver(decodeURIComponent(pathname))
  if (r.location) {
    res.writeHead(r.status, { Location: r.location })
    return res.end()
  }
  const body = await readFile(r.file)
  res.writeHead(r.status, { 'Content-Type': MIME[extname(r.file)] ?? 'application/octet-stream' })
  res.end(body)
})

const PUERTO = 4199
if (!REMOTO) await new Promise((r) => server.listen(PUERTO, r))
const BASE = REMOTO ?? `http://localhost:${PUERTO}`

// ── Aserciones ────────────────────────────────────────────────
const casos = [
  // 301/308 de consolidación
  { ruta: '/servicios/venta', status: 308, location: '/venta' },
  { ruta: '/servicios/reparacion', status: 308, location: '/reparacion' },
  { ruta: '/home', status: 308, location: '/' },

  // cleanUrls
  { ruta: '/venta', status: 200, contiene: 'Venta de Electrobombas' },
  { ruta: '/venta.html', status: 308, location: '/venta' },
  { ruta: '/servicios/bobinados', status: 200, contiene: 'Bobinados' },
  { ruta: '/proyectos/olivum', status: 200, contiene: 'Oliv' },
  { ruta: '/electrobombas-mendoza', status: 200, contiene: 'Electrobombas en Mendoza' },

  // trailingSlash
  { ruta: '/venta/', status: 308, location: '/venta' },

  // 404 real
  { ruta: '/ruta-que-no-existe-1234', status: 404, contiene: 'no existe' },
  { ruta: '/servicios/no-existe', status: 404 },
  { ruta: '/proyectos/no-existe', status: 404 },

  // archivos que deben servirse tal cual
  { ruta: '/robots.txt', status: 200, contiene: 'Sitemap:' },
  { ruta: '/sitemap.xml', status: 200, contiene: '<loc>' },
  { ruta: '/og-image.jpg', status: 200 },

  // la home
  { ruta: '/', status: 200, contiene: 'Electrobombas' },
]

let fallos = 0
console.log(`Verificando ruteo contra ${BASE}\n`)
console.log('RUTA'.padEnd(32) + 'ESPERADO'.padEnd(12) + 'OBTENIDO'.padEnd(12) + 'RESULTADO')

for (const c of casos) {
  const res = await fetch(BASE + c.ruta, { redirect: 'manual' })
  const problemas = []

  if (res.status !== c.status) problemas.push(`status ${res.status}`)

  if (c.location) {
    const loc = (res.headers.get('location') ?? '').replace(BASE, '')
    if (loc !== c.location) problemas.push(`location "${loc}"`)
  }

  if (c.contiene) {
    const body = await res.text()
    if (!body.includes(c.contiene)) problemas.push(`falta "${c.contiene}"`)
  }

  const ok = problemas.length === 0
  if (!ok) fallos++
  const esperado = c.location ? `${c.status} →` : String(c.status)
  console.log(
    c.ruta.padEnd(32) +
    esperado.padEnd(12) +
    String(res.status).padEnd(12) +
    (ok ? 'OK' : 'FALLA: ' + problemas.join(', ')),
  )
}

console.log(`\n${casos.length - fallos}/${casos.length} correctos`)
if (fallos) process.exitCode = 1
if (!REMOTO) server.close()

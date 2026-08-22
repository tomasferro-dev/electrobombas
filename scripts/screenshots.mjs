/**
 * Capturas de las páginas clave, en desktop y mobile.
 *
 * Existe porque toda la verificación de este proyecto fue estructural
 * —peso, dimensiones, atributos, HTML servido— y eso dejó pasar un bug
 * visual: los logos perdieron la transparencia y se veían con fondo negro.
 * Ningún chequeo de estructura lo detecta.
 *
 * Usa el Chrome instalado en la máquina, no descarga ningún navegador.
 *
 * Uso:
 *   node scripts/screenshots.mjs                       # contra dist/ servido
 *   node scripts/screenshots.mjs --base https://...    # contra un deploy
 *   node scripts/screenshots.mjs --full                # página completa
 */
import { launch } from 'puppeteer-core'
import { createServer } from 'node:http'
import { readFile, mkdir } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const SALIDA = 'screenshots'
const DIST = 'dist'
const argBase = process.argv.indexOf('--base')
const REMOTO = argBase > -1 ? process.argv[argBase + 1].replace(/\/$/, '') : null
const COMPLETA = process.argv.includes('--full')

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => existsSync(p))

if (!CHROME) {
  console.error('No encontré Chrome. Instalalo o editá la lista CHROME en este script.')
  process.exit(1)
}

/** Páginas que representan cada plantilla distinta del sitio. */
const PAGINAS = [
  ['home', '/'],
  ['venta', '/venta'],
  ['reparacion', '/reparacion'],
  ['servicios', '/servicios'],
  ['servicio-detalle', '/servicios/bobinados'],
  ['proyectos', '/proyectos'],
  ['proyecto-detalle', '/proyectos/olivum'],
  ['localidad', '/electrobombas-mendoza'],
  ['nosotros', '/nosotros'],
  ['contacto', '/contacto'],
  ['404', '/esta-ruta-no-existe'],
]

const VISTAS = [
  ['desktop', 1440, 900, 1],
  // 820 px: el ancho de tablet donde el header se rompia sin que nadie lo
  // viera, porque solo se miraba desktop y mobile.
  ['tablet', 820, 1100, 2],
  ['mobile', 390, 844, 2],
]

// ── Servidor local sobre dist/, si no hay --base ──────────────
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' }
const PUERTO = 4321
let server

if (!REMOTO) {
  server = createServer(async (req, res) => {
    // decodeURIComponent: hay assets con espacios en el nombre y el
    // navegador los pide como %20. Sin decodificar, este servidor los da
    // por inexistentes y parece una imagen rota que en realidad funciona.
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    const candidatos = [
      join(DIST, p),                                        // archivo tal cual
      join(DIST, p === '/' ? 'index.html' : `${p}.html`),    // cleanUrls
      join(DIST, '404.html'),                               // fallback
    ]
    for (const cand of candidatos) {
      if (!existsSync(cand) || !statSync(cand).isFile()) continue
      const body = await readFile(cand)
      const status = cand.endsWith('404.html') ? 404 : 200
      res.writeHead(status, { 'Content-Type': MIME[extname(cand)] ?? 'application/octet-stream' })
      return res.end(body)
    }
    res.writeHead(404).end()
  })
  await new Promise((r) => server.listen(PUERTO, r))
}

const BASE = REMOTO ?? `http://localhost:${PUERTO}`
await mkdir(SALIDA, { recursive: true })

const browser = await launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--hide-scrollbars'] })
console.log(`Capturando ${BASE}\n`)

const errores = []

for (const [vista, w, h, dpr] of VISTAS) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, deviceScaleFactor: dpr, isMobile: vista === 'mobile', hasTouch: vista === 'mobile' })

  const consola = []
  let rutaActual = ''
  // El 404 responde con status 404 a propósito y eso genera un error de
  // consola: no es un fallo, es la página funcionando como corresponde.
  page.on('console', (m) => {
    if (m.type() !== 'error') return
    const t = m.text()
    if (rutaActual === '/esta-ruta-no-existe' && /status of 404/.test(t)) return
    consola.push(t.slice(0, 120))
  })
  page.on('pageerror', (e) => consola.push(String(e).slice(0, 120)))

  for (const [nombre, ruta] of PAGINAS) {
    rutaActual = ruta
    const url = BASE + ruta
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 })
      // Deja correr la animación de entrada del hero antes de capturar.
      await new Promise((r) => setTimeout(r, 1200))

      const rotas = await page.evaluate(() =>
        [...document.querySelectorAll('img')]
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => (i.currentSrc || i.src).split('/').pop()))

      const archivo = join(SALIDA, `${vista}-${nombre}.png`)
      await page.screenshot({ path: archivo, fullPage: COMPLETA })

      const estado = rotas.length ? `IMAGENES ROTAS: ${rotas.join(', ')}` : 'ok'
      if (rotas.length) errores.push(`${vista}/${nombre}: ${estado}`)
      console.log(`  ${vista.padEnd(8)} ${nombre.padEnd(18)} ${estado}`)
    } catch (e) {
      errores.push(`${vista}/${nombre}: ${e.message}`)
      console.log(`  ${vista.padEnd(8)} ${nombre.padEnd(18)} ERROR: ${e.message.slice(0, 60)}`)
    }
  }

  if (consola.length) {
    errores.push(`${vista}: ${consola.length} errores de consola`)
    console.log(`\n  errores de consola en ${vista}:`)
    for (const c of [...new Set(consola)].slice(0, 5)) console.log(`    ${c}`)
  }
  await page.close()
}

await browser.close()
if (server) server.close()

console.log(`\nCapturas en ${SALIDA}/`)
if (errores.length) {
  console.log(`\n${errores.length} problemas:`)
  for (const e of errores) console.log(`  ${e}`)
  process.exitCode = 1
}

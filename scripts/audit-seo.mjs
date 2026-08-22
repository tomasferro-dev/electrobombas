/**
 * Audita el HTML generado por el build.
 *
 * Mira lo que realmente se sirve, no lo que el navegador arma después de
 * hidratar: los duplicados de <title> y canonical que introdujo la migración
 * a SSG eran invisibles desde el DOM (Helmet los limpiaba en el cliente) pero
 * estaban en el HTML crudo, que es el que lee Google primero.
 *
 * Uso:
 *   node scripts/audit-seo.mjs                     # sobre dist/
 *   node scripts/audit-seo.mjs --base https://...  # sobre un deploy real
 *
 * Sale con código 1 si encuentra algún problema, así sirve en CI.
 */
import { readdir, readFile } from 'node:fs/promises'
import { join, extname, relative, sep } from 'node:path'

const DIST = 'dist'
const BASE = 'https://www.arenaselectrobombas.com.ar'
const argBase = process.argv.indexOf('--base')
const REMOTO = argBase > -1 ? process.argv[argBase + 1].replace(/\/$/, '') : null
const MAX_TITLE = 65
const MIN_PALABRAS = 150

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name)
    if (e.isDirectory()) yield* htmlFiles(full)
    else if (extname(e.name) === '.html') yield full
  }
}

const sinComentarios = (html) => html.replace(/<!--[\s\S]*?-->/g, '')
const all = (re, s) => [...s.matchAll(re)].map((m) => m[1])

const problemas = []
const filas = []
const flag = (tipo, ruta, detalle = '') => problemas.push({ tipo, ruta, detalle })

/**
 * Las páginas a auditar salen siempre de dist/, que es la lista de rutas
 * que produce el build. Con --base se piden por HTTP en vez de leerse del
 * disco, para verificar lo que sirve el hosting y no sólo lo que se generó.
 */
async function* paginas() {
  const rutas = []
  for await (const file of htmlFiles(DIST)) {
    rutas.push('/' + relative(DIST, file).split(sep).join('/').replace(/\.html$/, '').replace(/^index$/, ''))
  }

  for (const ruta of rutas.sort()) {
    if (!REMOTO) {
      yield { ruta, raw: await readFile(join(DIST, ruta === '/' ? 'index.html' : `${ruta}.html`), 'utf-8') }
      continue
    }
    // El 404 se pide por una URL inexistente: cleanUrls redirige /404.
    const url = REMOTO + (ruta === '/404' ? '/_url-inexistente-de-auditoria' : ruta)
    const res = await fetch(url)
    const esperado = ruta === '/404' ? 404 : 200
    if (res.status !== esperado) {
      flag('status inesperado en el deploy', ruta, `HTTP ${res.status}, esperaba ${esperado}`)
      continue
    }
    yield { ruta, raw: await res.text() }
  }
}

for await (const { ruta, raw } of paginas()) {
  const html = sinComentarios(raw)

  const head = html.slice(0, html.indexOf('</head>'))
  const titles = all(/<title[^>]*>([\s\S]*?)<\/title>/g, head)
  const canonical = all(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/g, head)
  const desc = all(/<meta[^>]*name="description"[^>]*content="([^"]*)"/g, head)
  const robots = all(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/g, head)
  const ogImage = all(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/g, head)
  const twitter = all(/<meta[^>]*name="twitter:card"[^>]*content="([^"]+)"/g, head)

  const schemas = []
  for (const [, json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const d = JSON.parse(json)
      schemas.push(...(Array.isArray(d) ? d : [d]).map((x) => x['@type']))
    } catch {
      flag('JSON-LD inválido', ruta)
    }
  }

  const h1 = all(/<h1[^>]*>([\s\S]*?)<\/h1>/g, html)
  const cuerpo = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ')
  const palabras = cuerpo.split(/\s+/).filter(Boolean).length
  const esNoindex = robots.some((r) => r.includes('noindex'))

  if (titles.length !== 1) flag('title ausente o duplicado', ruta, `${titles.length}`)
  if (desc.length !== 1) flag('description ausente o duplicada', ruta, `${desc.length}`)
  if (ogImage.length !== 1) flag('og:image ausente o duplicada', ruta, `${ogImage.length}`)
  if (twitter.length !== 1) flag('twitter:card ausente o duplicada', ruta, `${twitter.length}`)
  if (h1.length !== 1) flag('h1 debe ser exactamente 1', ruta, `${h1.length}`)
  if (/as="image"/.test(html)) flag('preload de imagen', ruta)
  if (palabras < MIN_PALABRAS && !esNoindex) flag('contenido escaso', ruta, `${palabras} palabras`)

  if (esNoindex) {
    if (canonical.length) flag('noindex con canonical', ruta)
  } else {
    if (canonical.length !== 1) flag('canonical ausente o duplicado', ruta, `${canonical.length}`)
    else {
      if (!canonical[0].startsWith(BASE)) flag('canonical con dominio equivocado', ruta, canonical[0])
      const esperado = BASE + (ruta === '/' ? '/' : ruta)
      if (canonical[0] !== esperado) flag('canonical no apunta a su propia URL', ruta, canonical[0])
    }
  }

  const titulo = titles[0] ? titles[0].replace(/<[^>]+>/g, '').trim() : ''
  if (titulo.length > MAX_TITLE) flag('title largo (se trunca en Google)', ruta, `${titulo.length} chars`)

  filas.push({ ruta, palabras, titulo: titulo.length, schemas: [...new Set(schemas)].join(',') })
}

filas.sort((a, b) => a.ruta.localeCompare(b.ruta))
console.log(`Auditando: ${REMOTO ?? 'dist/ (build local)'}`)
console.log(`Páginas analizadas: ${filas.length}\n`)
console.log('RUTA'.padEnd(38) + 'PAL'.padStart(5) + 'TIT'.padStart(5) + '  SCHEMAS')
for (const f of filas) {
  console.log(f.ruta.padEnd(38) + String(f.palabras).padStart(5) + String(f.titulo).padStart(5) + '  ' + f.schemas)
}

console.log('\n=== PROBLEMAS ===')
if (!problemas.length) {
  console.log('ninguno')
} else {
  const porTipo = new Map()
  for (const p of problemas) {
    if (!porTipo.has(p.tipo)) porTipo.set(p.tipo, [])
    porTipo.get(p.tipo).push(p.detalle ? `${p.ruta} (${p.detalle})` : p.ruta)
  }
  for (const [tipo, rutas] of [...porTipo].sort()) {
    console.log(`\n  ${tipo}: ${rutas.length}`)
    for (const r of rutas.slice(0, 8)) console.log(`      ${r}`)
    if (rutas.length > 8) console.log(`      ... y ${rutas.length - 8} más`)
  }
  process.exitCode = 1
}

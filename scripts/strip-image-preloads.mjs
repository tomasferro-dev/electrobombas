/**
 * Saca los <link rel="preload" as="image"> del HTML generado.
 *
 * vite-react-ssg precarga todos los assets que importa el entry de cada ruta.
 * En la home eso son 16 preloads con las fotos de los servicios en tamaño
 * completo: ~3,5 MB que el navegador baja aunque las imágenes sean lazy y
 * estén ocultas en mobile. Encima salen con crossorigin="", que no matchea
 * el pedido que hace el <img>, así que la descarga ni se reutiliza.
 *
 * La librería no expone una opción para desactivarlos y el hook
 * onPageRendered corre antes de que se inyecten, así que se limpian acá.
 * Los preloads de CSS y JS se mantienen: sólo se sacan los de imagen.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, extname } from 'node:path'

const DIST = 'dist'
const IMAGE_PRELOAD = /<link[^>]*\bas="image"[^>]*>/g

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* htmlFiles(full)
    else if (extname(entry.name) === '.html') yield full
  }
}

let archivos = 0
let quitados = 0

for await (const file of htmlFiles(DIST)) {
  const html = await readFile(file, 'utf-8')
  const matches = html.match(IMAGE_PRELOAD)
  if (!matches) continue
  await writeFile(file, html.replace(IMAGE_PRELOAD, ''))
  archivos++
  quitados += matches.length
}

console.log(`[strip-image-preloads] ${quitados} preloads de imagen quitados en ${archivos} páginas`)

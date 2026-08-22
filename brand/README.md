# Logos originales

PNG a 1638×640 **con canal alfa**. Son la fuente de la que salen
`src/assets/logooo.webp` (header y formulario de contacto) y
`src/assets/logo-blanco.webp` (footer).

Viven acá y no en `src/assets/` a propósito: `scripts/optimize-images.py`
sólo recorre `src/assets/`, así que estos no se reprocesan ni generan
duplicados.

## Por qué existe esta carpeta

Al convertir todo a WebP, los logos perdieron la transparencia y el fondo
quedó negro en el sitio. El original ya no estaba en el árbol —lo había
reemplazado el `.webp`— y hubo que recuperarlo del bundle de respaldo.
Con los PNG acá, ese rescate no vuelve a hacer falta.

## Regenerar los WebP

```python
from PIL import Image
for src, dst in [('brand/logo-color.png',  'src/assets/logooo.webp'),
                 ('brand/logo-blanco.png', 'src/assets/logo-blanco.webp')]:
    im = Image.open(src).convert('RGBA').resize((512, 200), Image.LANCZOS)
    im.save(dst, format='WEBP', quality=88, method=6)
    im.resize((400, 156), Image.LANCZOS).save(
        dst.replace('.webp', '-w400.webp'), format='WEBP', quality=88, method=6)
```

512×200 es el doble del tamaño de display (48 px de alto en el header).
**Convertir siempre a `RGBA`**: sin eso la transparencia se aplasta a negro.

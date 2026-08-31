#!/usr/bin/env python3
"""
Genera los iconos del sitio desde brand/logo-icono.png.

El favicon anterior era el logotipo completo: 612x408, relación 1,5:1. A 16 px
se veía como una mancha roja ilegible, y Google pide que el favicon sea
**cuadrado y múltiplo de 48 px**, así que no cumplía ninguna de las dos cosas.

Qué produce en public/:

  favicon.ico            16/32/48 en un solo archivo, para navegadores viejos
                         y porque Google lo busca en la raíz por convención
  favicon-96.png         96 px  (48 x 2), el que declara <link rel="icon">
  favicon-192.png        192 px, para Android y pestañas en pantallas HiDPI
  favicon-dark-96.png    variante para modo oscuro
  favicon-dark-192.png
  apple-touch-icon.png   180 px CON fondo: iOS ignora la transparencia y la
                         pinta de negro, que arruinaría el contorno del logo
  logo.png               el logotipo de marca para el `logo` del JSON-LD

Uso:  python scripts/generate-icons.py
"""

import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    sys.exit("Falta Pillow.  pip install Pillow")

ROOT = Path(__file__).resolve().parent.parent
ORIGEN = ROOT / "brand" / "logo-icono.png"
LOGO_MARCA = ROOT / "brand" / "logo-color.png"
SALIDA = ROOT / "public"

# Cuánto puede alejarse del blanco puro un píxel para seguir contando como
# fondo. 40 tolera el ruido de compresión sin comerse el contorno negro.
TOLERANCIA_BLANCO = 40
# Margen alrededor del logo, en proporción del lado. Sin esto el glifo toca
# los bordes y en la pestaña se ve apretado.
MARGEN = 0.06


def quitar_fondo(im: Image.Image) -> Image.Image:
    """
    Vuelve transparente el fondo blanco, dejando el borde limpio.

    El recorte se hace con un umbral duro a resolución completa (2000 px) y el
    antialiasing lo aporta después el reescalado: bajar de 2000 a 96 px con
    LANCZOS suaviza el borde mucho mejor que cualquier umbral gradual, y evita
    los halos grises que deja hacer el corte a mano.

    Sólo se saca el blanco **exterior**, alcanzado desde los bordes. Así, si el
    logo tuviera zonas blancas internas, no se perforarían.
    """
    rgb = im.convert("RGB")
    ancho, alto = rgb.size
    pix = rgb.load()

    def es_blanco(x, y):
        r, g, b = pix[x, y]
        return r > 255 - TOLERANCIA_BLANCO and g > 255 - TOLERANCIA_BLANCO and b > 255 - TOLERANCIA_BLANCO

    # Relleno por inundación desde los cuatro bordes.
    fuera = bytearray(ancho * alto)
    pila = []
    for x in range(ancho):
        pila.append((x, 0))
        pila.append((x, alto - 1))
    for y in range(alto):
        pila.append((0, y))
        pila.append((ancho - 1, y))

    while pila:
        x, y = pila.pop()
        if not (0 <= x < ancho and 0 <= y < alto):
            continue
        i = y * ancho + x
        if fuera[i] or not es_blanco(x, y):
            continue
        fuera[i] = 1
        pila.append((x + 1, y))
        pila.append((x - 1, y))
        pila.append((x, y + 1))
        pila.append((x, y - 1))

    alfa = Image.frombytes("L", (ancho, alto), bytes(255 if not v else 0 for v in fuera))
    out = rgb.convert("RGBA")
    out.putalpha(alfa)
    return out


def recortar_y_encuadrar(im: Image.Image, margen: float = MARGEN) -> Image.Image:
    """Recorta al contenido y lo centra en un lienzo cuadrado con margen."""
    caja = im.getbbox()
    if caja:
        im = im.crop(caja)
    lado = max(im.size)
    lienzo_lado = int(lado * (1 + margen * 2))
    lienzo = Image.new("RGBA", (lienzo_lado, lienzo_lado), (0, 0, 0, 0))
    lienzo.alpha_composite(im, ((lienzo_lado - im.width) // 2, (lienzo_lado - im.height) // 2))
    return lienzo


def reducir(im: Image.Image, lado: int) -> Image.Image:
    """
    Reescala en alfa premultiplicado.

    Sin premultiplicar, el RGB de los píxeles transparentes (que sigue siendo
    blanco) se promedia con el del logo y deja un halo claro en todo el borde.
    """
    r, g, b, a = im.split()
    pm = Image.merge("RGB", (
        Image.composite(r, Image.new("L", im.size, 0), a),
        Image.composite(g, Image.new("L", im.size, 0), a),
        Image.composite(b, Image.new("L", im.size, 0), a),
    ))
    pm = pm.resize((lado, lado), Image.LANCZOS)
    a = a.resize((lado, lado), Image.LANCZOS)

    # Desmultiplicar para recuperar el color real donde el alfa es parcial.
    pr, pg, pb = pm.split()
    px_a = a.load()
    canales = []
    for canal in (pr, pg, pb):
        c = canal.copy()
        px_c = c.load()
        for y in range(lado):
            for x in range(lado):
                av = px_a[x, y]
                if av:
                    px_c[x, y] = min(255, px_c[x, y] * 255 // av)
        canales.append(c)
    return Image.merge("RGBA", (*canales, a))


def variante_oscura(im: Image.Image) -> Image.Image:
    """
    Pastilla clara con esquinas redondeadas, para modo oscuro.

    El logo es negro y rojo: sobre una pestaña oscura el contorno negro
    desaparece y queda la forma roja flotando.

    Se probaron tres caminos comparando capturas a 16, 32, 48 y 96 px sobre
    gris oscuro: dejar el logo tal cual (el contorno se pierde), ponerle un
    halo blanco detrás (funciona de 32 px para arriba, pero a 16 el halo se
    come el glifo), y esta pastilla, que es la única que sigue siendo legible
    a 16 px — el tamaño al que el navegador dibuja la pestaña.

    Se aplica al tamaño final, no al original: el radio y el margen tienen que
    ser proporcionales al icono que se va a ver.
    """
    lado = im.width
    mascara = Image.new("L", (lado, lado), 0)
    ImageDraw.Draw(mascara).rounded_rectangle(
        [0, 0, lado - 1, lado - 1], radius=max(2, int(lado * 0.22)), fill=255
    )
    pastilla = Image.new("RGBA", (lado, lado), (255, 255, 255, 255))
    pastilla.putalpha(mascara)

    margen = max(1, int(lado * 0.12))
    dentro = im.resize((lado - 2 * margen, lado - 2 * margen), Image.LANCZOS)
    pastilla.alpha_composite(dentro, (margen, margen))
    return pastilla


def sobre_fondo(im: Image.Image, color=(255, 255, 255, 255)) -> Image.Image:
    fondo = Image.new("RGBA", im.size, color)
    fondo.alpha_composite(im)
    return fondo


def main() -> None:
    if not ORIGEN.exists():
        sys.exit(f"No encuentro {ORIGEN.relative_to(ROOT)}")

    SALIDA.mkdir(exist_ok=True)
    original = Image.open(ORIGEN)
    print(f"Origen: {ORIGEN.relative_to(ROOT)}  {original.size}  {original.mode}")

    icono = recortar_y_encuadrar(quitar_fondo(original))
    print(f"Fondo quitado y encuadrado: {icono.size}")

    generados = []

    # Claro
    for lado in (96, 192):
        f = SALIDA / f"favicon-{lado}.png"
        reducir(icono, lado).save(f, optimize=True)
        generados.append(f)

    # Oscuro: la pastilla se arma sobre el icono ya reducido, para que el
    # radio y el margen queden proporcionales al tamaño real.
    for lado in (96, 192):
        f = SALIDA / f"favicon-dark-{lado}.png"
        variante_oscura(reducir(icono, lado)).save(f, optimize=True)
        generados.append(f)

    # .ico multi-tamaño
    ico = SALIDA / "favicon.ico"
    reducir(icono, 256).save(ico, sizes=[(16, 16), (32, 32), (48, 48)])
    generados.append(ico)

    # iOS: con fondo, porque ignora la transparencia y la pinta de negro
    apple = SALIDA / "apple-touch-icon.png"
    sobre_fondo(reducir(icono, 180)).convert("RGB").save(apple, optimize=True)
    generados.append(apple)

    # Logotipo de marca para el `logo` del JSON-LD
    if LOGO_MARCA.exists():
        marca = Image.open(LOGO_MARCA).convert("RGBA")
        ancho = 600
        marca = marca.resize((ancho, round(marca.height * ancho / marca.width)), Image.LANCZOS)
        f = SALIDA / "logo.png"
        marca.save(f, optimize=True)
        generados.append(f)

    print()
    for f in generados:
        im = Image.open(f)
        print(f"  {f.name:24s} {str(im.size):12s} {f.stat().st_size / 1024:6.1f} KB")


if __name__ == "__main__":
    main()

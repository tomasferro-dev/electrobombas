#!/usr/bin/env python3
"""
Convierte las imágenes de src/assets a WebP redimensionado.

Las fotos vienen directo del celular: 3000-4000 px de ancho y hasta 9 MB.
El sitio nunca las muestra a más de ~1600 px, así que se sirve un archivo
20 veces más pesado de lo necesario. Este script las lleva a un ancho
razonable y a WebP, que pesa ~30% menos que JPEG a calidad equivalente.

Escribe el .webp al lado del original y, con --replace, borra el original.
Los imports del código apuntan a .webp después de correrlo (ver README).

Uso:
  python scripts/optimize-images.py --dry-run     # que haría, sin tocar nada
  python scripts/optimize-images.py               # convierte, deja los originales
  python scripts/optimize-images.py --replace     # convierte y borra los originales
"""

import argparse
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Falta Pillow.  pip install Pillow")

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src" / "assets"

SOURCE_EXT = {".jpg", ".jpeg", ".png"}
# Ancho máximo al que el sitio muestra cada familia de imágenes.
# Los banners y heros ocupan el viewport completo; las fotos de galería
# viven dentro de una grilla y nunca pasan de media pantalla.
MAX_WIDTH_DEFAULT = 1600
MAX_WIDTH_BY_PREFIX = {
    # Las fotos de obra se ven en grilla y en lightbox, nunca a pantalla
    # completa en desktop grande. 1200 px alcanza y las deja bajo 250 KB.
    "proyectos/": 1200,
    "bombas/": 1000,
    "hidraulica/": 1000,
}
QUALITY_DEFAULT = 80
# Fotos de obra: son documentales, no de catálogo. 72 es indistinguible a
# tamaño de pantalla y las mantiene por debajo del techo de 250 KB.
QUALITY_BY_PREFIX = {"proyectos/": 72}
# Los PNG con transparencia (logos) se convierten sin perder el alfa.
KEEP_ALPHA_EXT = {".png"}


def max_width_for(rel_path: str) -> int:
    for prefix, width in MAX_WIDTH_BY_PREFIX.items():
        if rel_path.startswith(prefix):
            return width
    return MAX_WIDTH_DEFAULT


def quality_for(rel_path: str) -> int:
    for prefix, q in QUALITY_BY_PREFIX.items():
        if rel_path.startswith(prefix):
            return q
    return QUALITY_DEFAULT


def convert(path: Path, dry_run: bool, replace: bool) -> dict:
    rel = path.relative_to(ASSETS).as_posix()
    original = path.stat().st_size
    target = path.with_suffix(".webp")
    try:
        with Image.open(path) as im:
            # exif_transpose: sin esto, las fotos verticales del iPhone
            # se guardan rotadas (el visor las endereza por metadata EXIF,
            # que WebP no arrastra).
            im = ImageOps.exif_transpose(im)
            has_alpha = path.suffix.lower() in KEEP_ALPHA_EXT and im.mode in ("RGBA", "LA", "P")
            im = im.convert("RGBA" if has_alpha else "RGB")

            limit = max_width_for(rel)
            if im.width > limit:
                height = round(im.height * limit / im.width)
                im = im.resize((limit, height), Image.LANCZOS)

            if dry_run:
                from io import BytesIO
                buf = BytesIO()
                im.save(buf, format="WEBP", quality=quality_for(rel), method=6)
                new = buf.tell()
            else:
                im.save(target, format="WEBP", quality=quality_for(rel), method=6)
                new = target.stat().st_size
                if replace:
                    path.unlink()

        return {"rel": rel, "original": original, "new": new, "error": None}
    except Exception as e:  # noqa: BLE001 — se reporta y se sigue con el resto
        return {"rel": rel, "original": original, "new": original, "error": str(e)}


def human(n: float) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if abs(n) < 1024:
            return f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} TB"


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--dry-run", action="store_true", help="mostrar el ahorro sin escribir nada")
    ap.add_argument("--replace", action="store_true", help="borrar el original después de convertir")
    ap.add_argument("--quiet", action="store_true", help="solo el resumen")
    args = ap.parse_args()

    images = sorted(p for p in ASSETS.rglob("*") if p.suffix.lower() in SOURCE_EXT)
    if not images:
        print("No hay imágenes para convertir.")
        return

    prefix = "[DRY RUN] " if args.dry_run else ""
    print(f"{prefix}Convirtiendo {len(images)} imágenes a WebP...\n")

    results = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(convert, p, args.dry_run, args.replace) for p in images]
        for i, fut in enumerate(as_completed(futures), 1):
            r = fut.result()
            results.append(r)
            if r["error"]:
                print(f"  ERROR  {r['rel']} — {r['error']}")
            elif not args.quiet:
                pct = (1 - r["new"] / r["original"]) * 100 if r["original"] else 0
                print(f"  [{i:>3}/{len(images)}] {r['rel'][:52]:52s} "
                      f"{human(r['original']):>9} -> {human(r['new']):>9}  (-{pct:.0f}%)")

    total_old = sum(r["original"] for r in results)
    total_new = sum(r["new"] for r in results)
    errors = [r for r in results if r["error"]]
    over = [r for r in results if not r["error"] and r["new"] > 250 * 1024]

    print("\n" + "-" * 72)
    print(f"  Imágenes          : {len(results)}")
    print(f"  Antes             : {human(total_old)}")
    print(f"  Después           : {human(total_new)}")
    print(f"  Ahorro            : {human(total_old - total_new)} ({(1 - total_new/total_old)*100:.0f}%)")
    if over:
        print(f"  Sobre 250 KB      : {len(over)}")
        for r in sorted(over, key=lambda x: -x["new"])[:10]:
            print(f"      {human(r['new']):>9}  {r['rel']}")
    if errors:
        print(f"  Errores           : {len(errors)}")
    if args.dry_run:
        print("\n  DRY RUN — no se escribió nada.")


if __name__ == "__main__":
    main()

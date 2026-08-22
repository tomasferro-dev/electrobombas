import { useEffect } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

/**
 * Recupera la navegación cuando falla la carga de un chunk.
 *
 * Cada página se carga como un módulo aparte con hash en el nombre, y Vercel
 * sirve únicamente los archivos del deploy vigente. Si alguien tiene el sitio
 * abierto cuando se publica una versión nueva, su pestaña sigue apuntando a
 * los chunks viejos: la siguiente navegación pide un archivo que ya no existe
 * y React Router muestra "Failed to fetch dynamically imported module".
 *
 * No es un error del usuario ni algo que pueda reintentar: la única salida es
 * recargar para tomar el HTML nuevo. Eso se hace acá, una sola vez por sesión
 * —el flag evita un bucle de recargas si el fallo fuera por otra cosa, por
 * ejemplo estar sin conexión.
 */
const CLAVE_RECARGA = 'recarga-por-chunk';

const ES_ERROR_DE_CHUNK = (e: unknown): boolean => {
  const msg = e instanceof Error ? e.message : String(e ?? '');
  return /dynamically imported module|Importing a module script failed|error loading dynamically imported/i.test(msg);
};

export default function RouteError() {
  const error = useRouteError();
  const esChunk = ES_ERROR_DE_CHUNK(error);

  useEffect(() => {
    if (!esChunk) return;
    if (sessionStorage.getItem(CLAVE_RECARGA)) return;
    sessionStorage.setItem(CLAVE_RECARGA, '1');
    window.location.reload();
  }, [esChunk]);

  // Al recargar se limpia el flag, así una segunda versión publicada más
  // tarde en la misma sesión también puede recuperarse.
  useEffect(() => {
    if (esChunk) return;
    sessionStorage.removeItem(CLAVE_RECARGA);
  }, [esChunk]);

  if (esChunk) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-red-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Actualizando el sitio…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center bg-red-50 rounded-2xl p-4 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-700" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
          Algo salió mal
        </h1>
        <p className="text-gray-600 mb-8">
          No pudimos cargar esta sección. Probá recargar la página; si sigue
          fallando, escribinos y lo resolvemos.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Recargar
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

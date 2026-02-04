const CACHE_NAME = 'portal-policia-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/lucide@latest'
];

// Instalación: Guardar archivos esenciales
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting(); // Forzar activación
});

// Activación: Limpiar cachés antiguas
self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            clients.claim(),
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.filter((name) => name !== CACHE_NAME)
                        .map((name) => caches.delete(name))
                );
            })
        ])
    );
});

// Estrategia: Network First para index.html, Cache First para el resto
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Si es el HTML principal, intentamos red primero
    if (url.origin === location.origin && (url.pathname === '/' || url.pathname.endsWith('index.html'))) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
    } else {
        // Para lo demás (imágenes, scripts), caché primero
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});

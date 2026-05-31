const CACHE_NAME = 'portal-policia-cache-v1.29';
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './manifest.json',
    './icono.jpg',
    './codigos_policiales.jpg',
    'https://unpkg.com/lucide@latest'
];

// Instalación: Guardar archivos esenciales en la caché
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting(); // Forzar activación del nuevo service worker
});

// Activación: Limpiar cachés antiguas que ya no son necesarias
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

// Estrategia: Network First para HTML y recursos externos (CDNs), Cache First para imágenes locales
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Network First para HTML y CDNs externos
    if ((url.origin === location.origin && (url.pathname === '/' || url.pathname.endsWith('index.html'))) || url.origin !== location.origin) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Solo guardamos en caché si la respuesta es válida (o opaca para CDNs)
                    if (response && (response.status === 200 || response.type === 'opaque')) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    }
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
    } else {
        // Cache First para el resto (imágenes, manifest locales)
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((fetchRes) => {
                    if (fetchRes && fetchRes.status === 200) {
                        const copy = fetchRes.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    }
                    return fetchRes;
                });
            })
        );
    }
});

// Service Worker para cache de recursos de terceiros
const CACHE_NAME = 'homsi-cache-v1';
const TILE_CACHE_NAME = 'openstreetmap-tiles-v1';

// Recursos estáticos para cache
const STATIC_RESOURCES = [
  '/',
  '/images/icon-white.svg',
  '/images/hero-home.webp',
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== TILE_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache OpenStreetMap tiles por 7 dias
  if (url.hostname.includes('openstreetmap.org') && url.pathname.includes('.png')) {
    event.respondWith(
      caches.open(TILE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) {
            // Retorna do cache
            return response;
          }

          // Busca da rede e adiciona ao cache
          return fetch(event.request).then((networkResponse) => {
            // Clona a resposta porque pode ser usada apenas uma vez
            const responseToCache = networkResponse.clone();
            
            // Adiciona ao cache
            cache.put(event.request, responseToCache);
            
            return networkResponse;
          }).catch(() => {
            // Retorna imagem placeholder se falhar
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="256" height="256" fill="#f0f0f0"/></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          });
        });
      })
    );
    return;
  }

  // Para outros recursos, usar estratégia network-first
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clona a resposta
        const responseToCache = response.clone();
        
        // Adiciona ao cache se for sucesso
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        
        return response;
      })
      .catch(() => {
        // Tenta retornar do cache se network falhar
        return caches.match(event.request);
      })
  );
});

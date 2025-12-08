// Pizza Express VR - Service Worker for PWA Support
const CACHE_NAME = 'pizza-express-vr-v2';

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('✅ Cache opened');
      return cache.addAll([
        '/pizza-express-vr/',
        '/pizza-express-vr/index.html',
        '/pizza-express-vr/game.html',
        '/pizza-express-vr/css/main.css',
        '/pizza-express-vr/js/app-no-auth.js',
        '/pizza-express-vr/manifest.json',
        '/pizza-express-vr/landing-page-background.gif'
      ]).catch(err => {
        console.log('⚠️ Cache addAll failed (some files may not be available):', err);
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - NETWORK FIRST for game files, cache as fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  // For game assets (JS files), use network-first to get latest updates
  const isGameAsset = event.request.url.includes('/assets/');

  if (isGameAsset) {
    // Network first for game files - always get latest
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    // Cache first for static assets (landing page, images)
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }).catch(() => {
          return caches.match('/pizza-express-vr/index.html');
        });
      })
    );
  }
});


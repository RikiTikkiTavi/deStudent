/* eslint-disable no-restricted-globals,no-undef,array-callback-return,consistent-return */
// service-worker.js

// Flag for enabling cache in production
const doCache = true;
console.log('CACHING');
const CACHE_NAME = 'destudent-app-cache';

// Delete old caches
self.addEventListener('activate', event => {
  const currentCachelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!currentCachelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// This triggers when user starts the app
self.addEventListener('install', event => {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log('FETCHING ASSET-MANIFEST');
        fetch('/asset-manifest.json').then(response => {
          response.json().then(assets => {
            // We will cache initial page and the main.js
            // We could also cache assets like CSS and images
            const urlsToCache = [
              '/',
              assets['main.js'],
              '/manifest.json',
              assets['favicon.ico'],
              assets['images/start_back.jpg']
            ];
            cache.addAll(urlsToCache);
          });
        });
      })
    );
  }
});

// Here we intercept request and serve up the matching files
self.addEventListener('fetch', event => {
  if (doCache) {
    event.respondWith(
      caches
        .match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});

/* eslint-disable */
// service-worker.js

// Flag for enabling cache in production
const doCache = true;
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
              '/services',
              '/services/1',
              '/services/Test',
              assets['main.js'],
              '/manifest.json',
              '/api/is_logged_in',
              '/api/get_list_of_services',
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
    if (event.request.url.includes('/api/is_logged_in')) {
      event.respondWith(async function() {
        // Try to get the response from a cache.
        const cachedResponse = await caches.match(event.request);
        let serverResponse;
        serverResponse =
          await fetch(event.request, { credentials: 'include' })
            .catch(error => console.log(error));

        if(serverResponse!==undefined){
          console.log("SERVER RESPONSE", serverResponse)
          await caches.open(CACHE_NAME).then(cache => {
            cache.put('/api/is_logged_in', serverResponse.clone());
          });
          return serverResponse
        }
        console.log("cachedResponse", cachedResponse)

        return cachedResponse;
      }());
    } else {
      event.respondWith(
        caches
          .match(event.request)
          .then(response => response || fetch(event.request))
          .catch(err => console.log("RespondWith error"))
      );
    }
  }
});

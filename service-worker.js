const CACHE_NAME = "Ligue1-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "/club-info.html",
    "/pages/home.html",
    "/pages/match.html",
    "/pages/saved.html",
    "/manifest.json",
    "/js/db.js",
    "/js/idb.js",
    "/js/materialize.min.js",
    "/js/navigation.js",
    "/js/scripts.js",
    "/js/sw-register.js",
    "/js/scripts-saved.js",
    "/js/club-info.js",
    "/js/preloader.js",
    "/css/materialize.min.css",
    "/img/icon-192x192.png",
    "/img/icon-256x256.png",
    "/img/icon-384x384.png",
    "/img/icon-512x512.png",
    "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
];

self.addEventListener("install",event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    const api_url = "https://api.football-data.org/v2";
    if (event.request.url.indexOf(api_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME)
            .then(function(cache) {
                return fetch(event.request)
                .then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true })
            .then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`ServiceWorker : Chace ${cacheName} dihapus`)
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', event => {
    let body;
    if(event.data) {
        body = event.data.text();
    } else {
        body = 'Push Notification'
    }
    const options = {
        body : body,
        icon : '/img/icon-512x512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival : Date.now(),
            primaryKey : 1
        }
    };
    event.waitUntil(self.registration.showNotification('Push Notification', options))
});
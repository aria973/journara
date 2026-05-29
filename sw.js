const CACHE_NAME =
"journara-v1";

const STATIC_ASSETS = [

  "./",
  "./index.html",

  "./css/base.css",
  "./css/layout.css",
  "./css/components.css",
  "./css/animations.css",
  "./css/mobile.css",
  "./css/desktop.css",

  "./js/app.js",
  "./js/db.js",
  "./js/ui.js",
  "./js/storage.js",

  "./manifest.webmanifest"

];

self.addEventListener(
"install",
(event)=>{

  event.waitUntil(

    caches.open(CACHE_NAME)
    .then(cache=>{

      return cache.addAll(
        STATIC_ASSETS
      );

    })

  );

  self.skipWaiting();

});

self.addEventListener(
"activate",
(event)=>{

  event.waitUntil(

    caches.keys()
    .then(keys=>{

      return Promise.all(

        keys
        .filter(
          key=>key!==CACHE_NAME
        )

        .map(
          key=>caches.delete(key)
        )

      );

    })

  );

  self.clients.claim();

});

self.addEventListener(
"fetch",
(event)=>{

  if(
    event.request.method!=="GET"
  ) return;

  event.respondWith(

    caches.match(
      event.request
    )

    .then(cached=>{

      if(cached){

        fetch(event.request)
        .then(response=>{

          caches.open(CACHE_NAME)
          .then(cache=>{

            cache.put(
              event.request,
              response
            );

          });

        });

        return cached;

      }

      return fetch(event.request)
      .then(response=>{

        const cloned =
        response.clone();

        caches.open(CACHE_NAME)
        .then(cache=>{

          cache.put(
            event.request,
            cloned
          );

        });

        return response;

      });

    })

  );

});

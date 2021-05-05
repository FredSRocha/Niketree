self.addEventListener('fetch', function(event) {
  event.respondWith(caches.open('cache').then(function(cache) {
    return cache.match(event.request).then(function(response) {
      console.log("cache request: " + event.request.url);
      var fetchPromise = fetch(event.request).then(function(networkResponse) {           
          console.log("fetch completed: " + event.request.url, networkResponse);
          if (!(event.request.url.indexOf('http') === 0)) return;
          if (networkResponse) {
              console.debug("updated cached page: " + event.request.url, networkResponse);
              cache.put(event.request, networkResponse.clone());
            }
              return networkResponse;
              }, function (e) {   
              console.log("Error in fetch()", e);
              e.waitUntil(
              caches.open('cache').then(function(cache) {
              return cache.addAll
              ([              
                '/',
                '/index.html',
                '/index.html?launcher=true',
                '/index.html?homescreen=1',
                '/?homescreen=1',
                '/assets/*',
                'sw.js',
                'manifest.json'  
              ]);
            })
          );
        });
      return response || fetchPromise;
    });
  }));
});

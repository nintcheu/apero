
const staticCache = 'static-cache-v0';
const dynamicCache = 'dynamic-cache-v0';
const defaultCacheSize = 1;
const fallbackPage = '/fallback.html'
const assets =
  [
    '/',
    '/index.html',
    '/favicon.ico',
    '/fallback.html',
    '/css/style.css',
    '/css/materialize.min.css',
    '/images/android-chrome-192x192.png',
    '/images/android-chrome-512x512.png',
    '/images/maskable_icon_x192.png',
    '/images/maskable_icon_x512.png',
    '/images/favicon-16x16.png',
    '/images/favicon-32x32.png',
    '/images/apple-touch-icon.png',
    '/images/screen-540x7xx.png',
    '/js/bundle.js',
    '/js/wNumb.min.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://dummyimage.com/150x150',
    'https://dummyimage.com/300x250',
    'https://materializecss.com/images/office.jpg',
  ];

// cache size limit function
const limitCacheSize = (name: string, size: number) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener('install', (event) => {
  //console.log('sw installed ', event);

  event.waitUntil(
    caches.open(staticCache).then((cache) => {
      //console.log('Adding static files to cache', cache);
      return cache.addAll(assets);
    })
  );
});


self.addEventListener('activate', (event) => {
  //console.log('sw activated');

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys
        .filter((key) => key !== staticCache && key !== dynamicCache)
        .map(key => caches.delete(key)));
    })
  );
});


// fetch events
self.addEventListener('fetch', (evt: Event) => {
  //if(evt.request.url.indexOf('googletagmanager.com') === -1){
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCache).then(cache => {

          if ((fetchRes instanceof Response) && (200 === fetchRes.status)) {
            cache.put(evt.request.url, fetchRes.clone());
          } else {
           // console.log("fetchRes: ", fetchRes);
          }
          // check cached items size
          limitCacheSize(dynamicCache, defaultCacheSize);
          return fetchRes;
        })
      });
    }).catch(() => {
      if (evt.request.url.indexOf('.html') > -1) {
        return caches.match(fallbackPage);
      }
    })
  );
  //}
});


function closeNotification(msg, evt) {
  console.log(msg, evt.notification.data);
  evt.notification.close();
}

self.addEventListener('notificationclose', (evt) => {
  closeNotification("Notification closed", evt);
});

self.addEventListener('notificationclick', (evt) => {
  if (evt.action !== "close") {

    evt.waitUntil(
      self.clients.matchAll({ type: 'window', includeUncontrolled: 'true' }).then(function (allclients) {
        // do something with your clients list
        console.log("allclients", allclients);
        for (let i = 0; i < allclients.length; i++) {
          if (allclients[i].visibilityState === 'visible') {

            console.log("Navigating...");
            allclients[i].navigate(evt.notification.data.loc);
            break;
          }
        }
      })
    );
  }

  closeNotification("Notification Clicked", evt);
  
});

self.addEventListener('push', function (e) {
  var options = {
    body: 'This notification for apéro',
    icon: "images/android-chrome-192x192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore', title: 'Explore this new world',
        //icon: 'images/checkmark.png'
      },
      {
        action: 'close', title: 'Close',
        //icon: 'images/xmark.png'
      },
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});






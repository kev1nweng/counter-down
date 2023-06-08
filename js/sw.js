const cacheStorageKey = "cd-2702d90faad4046f-";
const cacheList = [
  "/index.html",
  "/style.css",
  "/manifest.json",
  "/js/counter.js",
  "/js/star.js",
  "/favicon.ico",
  "/icons/icon256x.png",
  "/icons/icon512x.png",
  "/icons/icon1024x.png",
  "/fonts/noto-sans-sc-regular.ttf",
  "/fonts/noto-sans-sc-regular.woff",
  "/fonts/noto-sans-sc-regular.woff2",
  "/fonts/STZHONGS.ttf",
  "/fonts/Rajdhani-Medium-3.ttf",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(cacheStorageKey)
      .then((cache) => cache.addAll(cacheList))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      if (response != null) {
        return response;
      }
      return fetch(e.request.url);
    })
  );
});
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      let cacheDeletePromises = [];
      for (let i = 0; i < keyList.length; i++) {
        if (keyList[i] !== cacheStorageKey) {
          cacheDeletePromises.push(caches.delete(keyList[i]));
        }
      }
      return Promise.all(cacheDeletePromises);
    })
  );
});

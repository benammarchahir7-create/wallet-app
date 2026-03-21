const CACHE_NAME = "tikit-v1";
const ASSETS = ["/", "/index.html", "/static/js/main.chunk.js", "/static/js/bundle.js", "/manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // Ne pas cacher les appels API
  if (e.request.url.includes("anthropic") || e.request.url.includes("workers.dev")) return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return response;
      });
    }).catch(() => caches.match("/index.html"))
  );
});

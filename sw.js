// A release uses one coherent code shell. New code becomes active only after all
// its files are cached. Open forms stay open; the next navigation uses this release.
const PREFIX = 'mixbook-' + encodeURIComponent(self.registration.scope) + '-',
  CACHE = PREFIX + 'v2.7.0',
  IMAGES = PREFIX + 'images',
  SHELL = ['./', './index.html', './styles.css', './boot.js', './core.js',
    './catalog.js', './hierarchy.js', './app.js', './manifest.webmanifest',
    './assets/icon-192.png', './assets/icon-512.png'],
  shellPaths = new Set(SHELL.map((p) => new URL(p, self.registration.scope).pathname));
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) =>
    cache.addAll(SHELL.map((p) => new Request(new URL(p, self.registration.scope), { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('message', (event) => {
  if (event.data?.type === 'ACTIVATE_UPDATE') self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys
    .filter((k) => k.startsWith(PREFIX) && k !== CACHE && k !== IMAGES)
    .map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  const req = event.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  const isImage = /\.(webp|png|jpe?g|avif)$/i.test(url.pathname);
  const isShell = shellPaths.has(url.pathname);
  if (!isImage && !isShell && req.mode !== 'navigate') return;
  event.respondWith((async () => {
    const cache = await caches.open(isShell ? CACHE : isImage ? IMAGES : CACHE),
      key = isShell ? url.origin + url.pathname : req,
      cached = await cache.match(key);
    // Catalog content remains independently editable: refresh it online, while
    // keeping the matching code release and an offline copy of the data.
    const isCatalog = url.pathname === new URL('./catalog.js', self.registration.scope).pathname;
    if (cached && !isCatalog) return cached;
    try {
      const response = await fetch(req);
      // Cache failures must never hide a successfully downloaded image.
      if (response.ok && (isImage || isCatalog)) {
        const copy = response.clone();
        event.waitUntil((async () => {
          try {
            await cache.put(key, copy);
            if (isImage && !isShell) {
              const keys = await cache.keys();
              await Promise.all(keys.slice(0, Math.max(0, keys.length - 120)).map((k) => cache.delete(k)));
            }
          } catch { /* storage pressure: the network response is still usable */ }
        })());
      }
      return !response.ok && cached ? cached : response;
    } catch (error) {
      if (cached) return cached;
      if (req.mode === 'navigate') {
        const shell = await caches.open(CACHE), fallback = await shell.match(new URL('./index.html', self.registration.scope));
        if (fallback) return fallback;
      }
      throw error;
    }
  })());
});

/* Marlow service worker: network first, cache fallback, so the app opens offline and updates on the next online load.
   It touches only caches whose names begin with "marlow-", so other projects on the same host keep theirs. */
const PREFIX = "marlow-", CACHE = PREFIX + "v15";
const ASSETS = ["./", "./index.html", "./content/book.js", "./manifest.webmanifest", "./icon.svg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; /* fonts and anything external go straight to the network */
  if (!url.pathname.startsWith(new URL("./", self.registration.scope).pathname)) return; /* only this project's own files */
  e.respondWith(fetch(req).then(res => {
    if (res.ok && res.type === "basic") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } /* a 404 or an error page is never cached */
    return res;
  }).catch(() => caches.match(req).then(r => r || (req.mode === "navigate" ? caches.match("./index.html") : Response.error())))); /* the page shell stands in only for a page, never for a missing file */
});

/* Only the public app shell is cached. Never intercept or cache GitHub API traffic. */
const CACHE='mixbook-shell-v1';
const ASSETS=['./','./index.html','./styles.css','./core.js','./seed.js','./app.js','./assets/negroni.webp','./assets/icon-192.png','./assets/icon-512.png','./manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mixbook-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 event.respondWith(fetch(event.request).then(response=>{if(response.ok&&ASSETS.some(p=>new URL(p,self.registration.scope).pathname===url.pathname)){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(event.request,copy)))}return response}).catch(async()=>{const hit=await caches.match(event.request);if(hit)return hit;if(event.request.mode==='navigate')return(await caches.match('./index.html'))||Response.error();return Response.error()}));
});

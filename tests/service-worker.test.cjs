const test = require('node:test'), assert = require('node:assert/strict'), vm = require('node:vm'), fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname, '../sw.js'), 'utf8');
function harness({ quota = false, offline = false } = {}) {
  const scope = 'https://example.test/mixbook/', events = {}, stores = new Map(), calls = [];
  let activated = false;
  const caches = {
    async open(name) {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name), key = (req) => typeof req === 'string' ? req : req.url || req.href;
      return {
        async match(req) { return store.get(key(req))?.clone(); },
        async put(req, response) { if (quota) throw Error('quota'); store.set(key(req), response); },
        async addAll(reqs) { for (const req of reqs) store.set(key(req), new Response('release-shell')); },
        async keys() { return [...store.keys()]; },
        async delete(req) { return store.delete(key(req)); },
      };
    },
    async keys() { return [...stores.keys()]; },
    async delete(name) { return stores.delete(name); },
  };
  vm.runInNewContext(source, { URL, Request, Response, caches,
    fetch: async (req) => { calls.push(req.url); if (offline) throw Error('offline'); return new Response('network'); },
    self: { registration: { scope }, location: { origin: 'https://example.test' }, clients: { claim() {} },
      skipWaiting() { activated = true; }, addEventListener(name, fn) { events[name] = fn; } },
  });
  const lifecycle = async (name) => { let work; events[name]({ waitUntil(p) { work = p; } }); await work; };
  const request = async (path, mode = 'cors') => {
    let result; const pending = [];
    events.fetch({ request: { url: new URL(path, scope).href, method: 'GET', mode }, respondWith(p) { result = p; }, waitUntil(p) { pending.push(p); } });
    const response = await result; await Promise.all(pending); return response;
  };
  return { scope, stores, calls, events, lifecycle, request, activated: () => activated };
}
test('offline shell uses one cached release and ignores unrelated requests', async () => {
  const h = harness({ offline: true }); await h.lifecycle('install');
  assert.equal(await (await h.request('./app.js')).text(), 'release-shell');
  assert.equal(await (await h.request('./?from=home', 'navigate')).text(), 'release-shell');
  assert.equal(await (await h.request('./another-route', 'navigate')).text(), 'release-shell');
  assert.equal(await h.request('https://api.github.com/user'), undefined);
  assert.equal(h.calls.length, 1); // Only the uncached navigation attempted the network.
});
test('cache quota failures do not discard a successful image response', async () => {
  const h = harness({ quota: true });
  assert.equal(await (await h.request('./assets/cocktails/Negroni.webp')).text(), 'network');
});
test('activation only removes old releases within this site scope', async () => {
  const h = harness(); await h.lifecycle('install');
  h.stores.set('mixbook-' + encodeURIComponent(h.scope) + '-old', new Map());
  h.stores.set('mixbook-other-site-old', new Map());
  await h.lifecycle('activate');
  assert.ok(h.stores.has('mixbook-other-site-old'));
  assert.ok(!h.stores.has('mixbook-' + encodeURIComponent(h.scope) + '-old'));
  assert.equal(h.activated(), false);
  h.events.message({ data: { type: 'ACTIVATE_UPDATE' } });
  assert.equal(h.activated(), true);
});
test('catalog edits can refresh independently while retaining an offline fallback', async () => {
  const online = harness(); await online.lifecycle('install');
  assert.equal(await (await online.request('./catalog.js')).text(), 'network');
  const offline = harness({ offline: true }); await offline.lifecycle('install');
  assert.equal(await (await offline.request('./catalog.js')).text(), 'release-shell');
});

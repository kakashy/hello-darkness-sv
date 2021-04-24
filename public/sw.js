const oldcache = 'darkness_v1'
const cache = 'darkness_v2'
const assets = [
    '/',
    '/k_fav.png',
    '/global.css',
    '/index.html',
    '/res/pouchdb-7.2.1.min.js',
    '/build',
    '/build/bundle.css',
    '/build/bundle.js',
    '/build/bundle.js.map'
]
self.addEventListener('install', installEvent=>{
    installEvent.waitUntil(
        caches.open(cache)
        .then(cache =>
            cache.addAll(assets))
            )
            caches.delete(oldcache)
})
self.addEventListener('fetch', fetchEvent=>{
    fetchEvent.respondWith(
        caches.match(fetchEvent.request)
        .then(res=>{
            return res || fetch(fetchEvent.request)
        })
    )
})
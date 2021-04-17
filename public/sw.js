const cache = 'darkness'
const assets = [
    '/',
    '/k_fav.png',
    '/global.css',
    '/index.html',
    '/bundle',
    '/bundle/bundle.css',
    '/bundle/bundle.js',
    'bundle/bundle.js.map'
]
self.addEventListener('install', installEvent=>{
    installEvent.waitUntil(
        caches.open(cache)
        .then(cache =>
            cache.addAll(assets))
    )
})
self.addEventListener('fetch', fetchEvent=>{
    fetchEvent.respondWith(
        caches.match(fetchEvent.request)
        .then(res=>{
            return res || fetch(fetchEvent.request)
        })
    )
})
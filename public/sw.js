const cache = 'darkness'
const assets = [
    '/',
    '/k_fav.png',
    '/global.css',
    '/index.html',
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
})
self.addEventListener('fetch', fetchEvent=>{
    fetchEvent.respondWith(
        caches.match(fetchEvent.request)
        .then(res=>{
            return res || fetch(fetchEvent.request)
        })
    )
})
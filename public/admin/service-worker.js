const ADMIN_CACHE_PREFIX = 'fireside-admin-pwa-cache-'
const ADMIN_CACHE = `${ADMIN_CACHE_PREFIX}v1`
const ADMIN_ROUTES = ['/admin', '/admin/login', '/admin/reset-password']

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(ADMIN_CACHE).then(cache => cache.addAll(ADMIN_ROUTES))
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name.startsWith(ADMIN_CACHE_PREFIX) && name !== ADMIN_CACHE)
          .map(name => caches.delete(name))
      )
    )
  )
})

self.addEventListener('fetch', event => {
  if (!event.request.url.includes('/admin')) {
    return
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response
      return fetch(event.request)
    })
  )
})

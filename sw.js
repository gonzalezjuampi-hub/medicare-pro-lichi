
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Este es el motor que recibe la orden de tu index.html y despierta a Android
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIF') {
    const options = {
      body: event.data.body,
      vibrate: [200, 100, 200],
      requireInteraction: true,
      tag: 'med-alarm-pwa'
    };
    self.registration.showNotification(event.data.title, options);
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});

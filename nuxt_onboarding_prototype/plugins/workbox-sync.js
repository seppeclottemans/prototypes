const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('formQueue', {
  maxRetentionTime: 96 * 60 // Retry for max of 96 Hours (specified in minutes)
});
const allTodosUploaded = new CustomEvent('swUpdated', { detail: null });


workbox.routing.registerRoute(
  /http:\/\/localhost:3000\/api\/todos/,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);

workbox.routing.registerRoute(
  /http:\/\/localhost:3001\/api\/api\/todos/,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'GET'
);

workbox.routing.registerRoute(
  /http:\/\/localhost:3000\/api\/todos/,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'DELETE'
);

workbox.routing.registerRoute(
  /http:\/\/localhost:3000\/api\/todos/,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'PUT'
);

self.addEventListener('sync', function(event) {
  const channel = new BroadcastChannel('sw-todos-messages');
  channel.postMessage({title: 'All todos are uploaded'});
});
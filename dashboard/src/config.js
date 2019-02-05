export default {
  app: {
    baseHref: __INJECTED_CONFIG.dashboard.baseHref || '/',
    logoHeight: __INJECTED_CONFIG.dashboard.logoHeight || '80px',
    title: __INJECTED_CONFIG.dashboard.title || 'Chill Dashboard',
    logoUrl: __INJECTED_CONFIG.dashboard.logo || require('../public/images/chill.png')
  },
  api: {
    endpoints: {
      status: '/status'
    },
    baseUrl: __INJECTED_CONFIG.dashboard.apiBaseUrl || 'http://localhost:8000/api'
  },
  websocket: {
    reconnectTimeout: 5000,
    endpoint: __INJECTED_CONFIG.dashboard.websocketBaseUrl || 'ws://localhost:8080'
  }
};

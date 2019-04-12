export default {
  app: {
    baseUrl: __INJECTED_CONFIG.dashboard.baseUrl || '/',
    title: __INJECTED_CONFIG.dashboard.title || 'Chill Dashboard',
    logo: {
      url: __INJECTED_CONFIG.dashboard.logo.url || require('../public/images/chill.png'),
      height: __INJECTED_CONFIG.dashboard.logo.height || '80px'
    },
    projectLogo: {
      url: __INJECTED_CONFIG.dashboard.projectLogo.url || require('../public/images/chill.png'),
      height: __INJECTED_CONFIG.dashboard.projectLogo.height || '80px'
    }
  },
  api: {
    endpoints: {
      status: '/status',
      history: '/status/logs'
    },
    baseUrl: __INJECTED_CONFIG.dashboard.apiBaseUrl || 'http://localhost:8000/api'
  },
  websocket: {
    reconnectTimeout: 5000,
    endpoint: __INJECTED_CONFIG.dashboard.websocketBaseUrl || 'ws://localhost:8080'
  }
};

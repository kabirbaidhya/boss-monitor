export default {
  logging: {
    level: process.env.LOGGING_LEVEL || 'info'
  },
  monitoring: {
    minInterval: 1000,
    maxInterval: 10000,
    method: 'OPTIONS',
    downStatus: '^(5..|4..)$'
  },
  notifications: {
    slack: {
      enabled: false,
      endpoint: null
    }
  },
  services: []
};

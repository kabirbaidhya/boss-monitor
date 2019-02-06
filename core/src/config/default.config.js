// Note: This file is a total copy-paste from the chill repository
// we'll need to extract a new package called chill-core or chill-common where
// we can put all the common, initialization/config code.

import path from 'path';

export default {
  logging: {
    maxFiles: 3,
    level: 'info',
    logDir: 'logs',
    jsonFormat: false,
    levelColumnWidth: 7,
    dateFormat: 'yyyy-MM-dd',
    tsFormat: () => new Date().toISOString()
  },
  db: {
    client: 'sqlite3',
    connection: {
      filename: null
    },
    useNullAsDefault: true
  },
  restApi: {
    port: 8000
  },
  dashboard: {
    logo: null,
    logoHeight: '80px',
    title: 'Chill Dashboard',
    apiBaseUrl: null,
    websocketBaseUrl: null
  },
  monitoring: {
    method: 'OPTIONS',
    minInterval: 1000,
    maxInterval: 10000,
    downStatus: '^(5..|4..)$'
  },
  notifications: {
    slack: {
      enabled: false,
      endpoint: null,
      baseUrl: 'https://hooks.slack.com/services'
    },
    twilio: {
      enabled: false,
      sender: null,
      receiver: null,
      authToken: null,
      accountSid: null
    },
    email: {
      enabled: false,
      transport: {
        service: null,
        auth: {
          user: null,
          pass: null
        }
      },
      sender: null,
      receivers: [],
      encoding: 'utf-8',
      templateDir: path.resolve(__dirname, '../common/templates/')
    }
  },
  services: []
};

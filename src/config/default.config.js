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
      filename: './chill.db'
    },
    useNullAsDefault: true
  },
  monitoring: {
    maxRetry: 3,
    method: 'OPTIONS',
    minInterval: 1000,
    maxInterval: 10000,
    downStatus: '^(5..|4..)$'
  },
  socket: {
    enabled: false,
    port: 34455,
    host: 'http://127.0.0.1'
  },
  notifications: {
    slack: {
      enabled: false,
      color: {
        up: 'good',
        down: 'danger'
      },
      endpoint: null,
      baseUrl: 'https://hooks.slack.com/services'
    },
    hipchat: {
      enabled: false,
      notify: true,
      color: {
        up: 'green',
        down: 'red'
      },
      roomId: null,
      authToken: null,
      emailId: 'chill@noreply.com',
      baseUrl: 'https://api.hipchat.com/v2/room/'
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

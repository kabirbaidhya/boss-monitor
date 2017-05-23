import path from 'path';

export default {
  logging: {
    level: 'info',
    logDir: 'logs',
    jsonFormat: false,
    levelColumnWidth: 7,
    tsFormat: () => new Date().toISOString(),
    dateFormat: 'yyyy-MM-dd'
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
    hipchat: {
      enabled: false,
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

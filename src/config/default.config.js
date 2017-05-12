export default {
  logging: {
    level: 'info',
    logDir: 'logs',
    jsonFormat: false,
    spaceLength: 8,
    dateFormat: 'yyyy-MM-dd',
    tsFormat: new Date()
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
      endpoint: null
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
      templateDir: null
    }
  },
  services: []
};

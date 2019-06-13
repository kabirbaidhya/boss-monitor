const STATUS_UP = 'up';
const STATUS_DOWN = 'down';
const NOT_REGISTERED = 'not_registered';

const messages = {
  [STATUS_UP]: {
    title: 'Service is Up',
    text: name => `${name} is up`
  },

  [STATUS_DOWN]: {
    title: 'Service is Down',
    text: name => `${name} is down.`
  },

  [NOT_REGISTERED]: {
    title: 'Not Registered',
    text: () => `Current channel has not been registered in chill.`
  }
};

export default messages;

const STATUS_UP = 'up';
const STATUS_DOWN = 'down';

const messages = {
  [STATUS_UP]: {
    title: 'Service is Up',
    text: name => `${name} is up`
  },

  [STATUS_DOWN]: {
    title: 'Service is Down',
    text: name => `${name} is down.`
  }
};

export default messages;

const STATUS_UP = 'Up';
const STATUS_DOWN = 'Down';
const messages = {
  [STATUS_UP]: {
    title: 'Service is Up',
    text: name => {
      return `${name} is up`;
    }
  },

  [STATUS_DOWN]: {
    title: 'Service is Down',
    text: name => `${name} is down.`
  }
};

export default messages;

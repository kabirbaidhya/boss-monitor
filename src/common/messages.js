import { STATUS_UP, STATUS_DOWN } from '../services/status';

const messages = {
  [STATUS_UP]: {
    color: 'green',
    colorCode: '#5cb85c',
    title: 'Service is Up',
    text: (name, downtime) => {
      return `${name} is up` + (downtime ? ` after ${downtime} of downtime.` : '.');
    }
  },

  [STATUS_DOWN]: {
    color: 'red',
    colorCode: '#d9534f',
    title: 'Service is Down',
    text: (name) => `${name} went down.`
  }
};

export default messages;

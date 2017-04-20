import { STATUS_UP, STATUS_DOWN } from '../services/status';

const messages = {
  [STATUS_UP]: {
    color: 'good',
    title: 'Service is Up',
    text: (name, downtime) => {
      return `${name} is up` + (downtime > 0 ? ` after ${downtime} of downtime.` : '.');
    }
  },

  [STATUS_DOWN]: {
    color: 'danger',
    title: 'Service is Down',
    text: (name) => `${name} went down.`
  }
};

export default messages;
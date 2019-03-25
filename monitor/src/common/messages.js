import { STATUS_UP, STATUS_DOWN, STATUS_MAINTENANCE } from '../services/status';

const messages = {
  [STATUS_UP]: {
    title: 'Service is Up',
    text: (name, downtime) => {
      return `${name} is up` + (downtime ? ` after ${downtime} of downtime.` : '.');
    }
  },

  [STATUS_DOWN]: {
    title: 'Service is Down',
    text: (name) => `${name} went down.`
  },

  [STATUS_MAINTENANCE]: {
    title: 'Service is under maintenance',
    text: (name) => `${name} is under maintenance.`
  }
};

export default messages;

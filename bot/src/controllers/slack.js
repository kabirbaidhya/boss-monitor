import * as slackService from '../services/slack';
import * as config from '../config/config';

export function getSlackInfo(req, res, next) {
  slackService
    .getInfo()
    .then(data => {
      const data1 = config.get();
      console.log(data);
    })
    .catch(err => next(err));
}

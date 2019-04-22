import * as slackService from '../services/slack';

export function getSlackInfo(req, res, next) {
  slackService
    .getInfo()
    .then(data => console.log(data))
    .catch(err => next(err));
}

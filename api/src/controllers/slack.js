import * as slackServices from '../services/slack';

export function getStatus(req, res) {
  res.json({ response_type: 'in_channel' });
  slackServices.notify(req.body);
}

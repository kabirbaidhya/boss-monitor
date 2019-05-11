import { Router } from 'express';

import { verifySlackRequest } from './validators/slack';

import * as slackController from './controllers/slack';
import * as notifierController from './controllers/notifier';

const router = Router();

// Slack Request
router.post('/webhook/slack', verifySlackRequest, slackController.getStatus);

//Auto-notification Request
router.post('/notify', notifierController.sendNotification);

export default router;

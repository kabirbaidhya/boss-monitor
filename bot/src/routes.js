import { Router } from 'express';


import * as slackController from './controllers/slack';
import { verifySlackRequest } from './validators/slack';
import * as notifierController from './controllers/notifier';

const router = Router();

// Slack Request
router.post('/webhook/slack', verifySlackRequest, slackController.getStatus);
//Auto-notification Request
router.post('/notify', notifierController.sendNotification);

export default router;

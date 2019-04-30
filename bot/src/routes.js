import { Router } from 'express';

import { verifySlackRequest } from './validators/slack';

import * as slackController from './controllers/slack';

const router = Router();

// Slack Request
router.post('/webhook/slack', verifySlackRequest, slackController.getStatus);

export default router;

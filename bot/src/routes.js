import { Router } from 'express';

import * as slackController from './controllers/slack';
import { verifySlackRequest } from './validators/slack';

const router = Router();

// Slack Request
router.post('/webhook/slack', verifySlackRequest, slackController.getStatus);

export default router;

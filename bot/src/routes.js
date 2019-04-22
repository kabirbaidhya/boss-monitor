import { Router } from 'express';

import * as slackContorller from './controllers/slack';

const router = Router();

router.get('/', slackContorller.getSlackInfo);

export default router;

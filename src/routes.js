import express from 'express';
import { sayHello } from './controllers/hello';

let router = express.Router();

// Hello World
router.get('/', sayHello);

export default router;
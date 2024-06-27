import { Router } from 'express';
import HelloController from '../controllers/HelloController';

const router = Router();

router.post('/hello', HelloController.createHello);

export default router;
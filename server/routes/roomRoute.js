import express from 'express';
import controller from '../controllers/roomController.js';

const router = express.Router();

router.get('/', controller.roomController.getRoomList);

export default router;

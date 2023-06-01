import express from 'express';
import controller from '../controllers/eachRoomController.js';

const router = express.Router();

router.get('/', controller.eachRoomController.getNumberAssetList);
router.get('/:room_id', controller.eachRoomController.getNumberAssetByRoomList);

export default router;

import express from 'express';
import controller from '../controllers/dropdownController.js';

const router = express.Router();

router.get('/year', controller.yearController.getYearList);
router.get('/year/:id',controller.yearController.getAssetByYearList);
router.get('/room', controller.roomController.getRoomList);
router.get('/room/:id',controller.roomController.getAssetByRoomList);

export default router;

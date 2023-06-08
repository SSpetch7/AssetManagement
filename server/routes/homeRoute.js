import express from 'express';
import controller from '../controllers/homeController.js';

const router = express.Router();

router.get('/number/notebook', controller.numberStatusController.getNumberNotebookList);
router.get('/status/notebook',controller.numberStatusController.getStatusNotebookList);
router.get('/number/tablet', controller.numberStatusController.getNumberTabletList);
router.get('/status/tablet',controller.numberStatusController.getStatusTabletList);

export default router;

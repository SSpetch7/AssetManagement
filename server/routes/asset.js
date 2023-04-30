import express from 'express';
import assetController from '../controllers/assetController.js';
const router = express.Router();

router.get('/', assetController.getAllAssestList);

export default router;

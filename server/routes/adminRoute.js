import express from 'express';
import controller from '../controllers/adminController.js';

const router = express.Router();

router.get('/', controller.adminController.getAllAdminList);

export default router;

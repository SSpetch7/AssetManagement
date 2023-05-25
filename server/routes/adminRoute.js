import express from 'express';
import controller from '../controllers/adminController.js';

const router = express.Router();

router.get('/', controller.adminController.getAllAdminList);

router.post('/create', controller.adminController.createAdmin);

export default router;

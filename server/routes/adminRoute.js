import express from 'express';
import controller from '../controllers/adminController.js';

const router = express.Router();

router.get('/', controller.adminController.getAllAdminList);
router.get('/:id', controller.adminController.getAdminByIdList);
router.post('/create', controller.adminController.createAdmin);

export default router;

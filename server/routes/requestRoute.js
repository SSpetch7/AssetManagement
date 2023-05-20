import express from 'express';
import controller from '../controllers/requestController.js';

const router = express.Router();

// ส่ง Requests ทั้งหมด
router.get('/', controller.requestController.getAllRequestList);
// ส่ง Request ตาม id (เติม ?asset=true ถ้าอยากให้แตกข้อมูล asset)
router.get('/:id', controller.requestController.getRequestByID);

// user_email = 'test@blabla.com'
// asset_id = '58E0100998'
// reqStatus = 'WAIT' (มี 'WAIT' 'ALLOW' 'DENY')
// dateWant = '2023-05-20 14:38:23.000000'
// dateDue = '2023-05-31 19:38:24'
// (userNote กับ adminNote ถ้าไม่มีก็ไม่ต้องส่งมา)
// userNote = 'Something the user said'
// adminNote = 'Something the admin said'
router.post('/', controller.requestController.createRequest)

export default router;

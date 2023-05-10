import express from 'express';
import imageController from '../controllers/imgAssetController.js';

const router = express.Router();

// router.post('/', upload.single('image'), imageController.uploadImage);
router.get('/:fileName', imageController.getImage);

export default router;

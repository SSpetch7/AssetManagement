import express from 'express';
import controller from '../controllers/chartController.js';

const router = express.Router();

router.get('/number/asset', controller.numController.getNumberAssetList);
router.get('/numberasset/cate',controller.numController.getNumberAssetCateList);
router.get('/year/asset', controller.numController.getYearAssetList);
router.get('/number/status', controller.numController.getNumberStatusList);

export default router;

import express from 'express';
import controller from '../controllers/chartController.js';

const router = express.Router();

router.get('/', controller.assetController.getAllAssestList);
router.get('/:id', controller.assetController.getAssetByIDList);
router.get('/number/asset', controller.optionController.getNumberAssetList);
router.get('/numbertable/asset/', controller.optionController.getNumberAssetTableList);
router.get('/year/asset', controller.optionController.getYearAssetList);
router.get('/number/status', controller.optionController.getNumberStatusList);

export default router;

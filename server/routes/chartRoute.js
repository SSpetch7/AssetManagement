import express from 'express';
import controller from '../controllers/chartController.js';

const router = express.Router();

router.get('/number/allasset', controller.numController.getNumberAllAssetList);
router.get(
  '/number/asset/useable',
  controller.numController.getNumberUseableAssetList
);

router.get('/number/asset', controller.numController.getNumberAssetList);
router.get(
  '/numberasset/cate',
  controller.numController.getNumberAssetCateList
);
router.get('/year/asset', controller.numController.getYearAssetList);
router.get('/year/cate/:id', controller.yearController.getCateAssetYearList);
router.get('/year/sub/:id', controller.yearController.getSubAssetYearList);
router.get('/number/status', controller.numController.getNumberStatusList);
router.get('/status/year/:id', controller.statusController.getStatusYearList);

export default router;

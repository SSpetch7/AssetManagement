import express from 'express';
import controller from '../controllers/assetController.js';

const router = express.Router();

router.get('/', controller.assetController.getAllAssestList);
router.get('/:id', controller.assetController.getAssetByIDList);

router.get('/state/status', controller.optionController.getStatusList);
router.get('/state/stock', controller.optionController.getStockList);
router.get('/state/useable', controller.optionController.getUseableList);
router.get('/v1/types', controller.optionController.getTypeAssetList);
router.get('/type/com', controller.optionController.getTypeComList);

export default router;

import express from 'express';
import controller from '../controllers/assetController.js';

const router = express.Router();

router.get('/', controller.assetController.getAllAssetList);
router.get('/:id', controller.assetController.getAssetByIDList);

router.get('/state/status', controller.optionController.getStatusList);
router.get('/state/stock', controller.optionController.getStockList);
router.get('/state/useable', controller.optionController.getUseableList);
router.get('/v1/types', controller.optionController.getTypeAssetList);
router.get('/type/com', controller.optionController.getTypeComList);
router.get('/images/:imageName', async (req, res, next) => {
  try {
    const imageName = req.params.imageName;
    const blob = bucket.file(imageName);
    const blobStream = blob.createReadStream();
    blobStream.pipe(res);
  } catch (error) {
    next(error);
  }
});
router.put('/update/:id', controller.updateController.updateAsset);
router.delete('/delete/:id', controller.deleteController.deleteAsset);

// create route
router.post('/', controller.assetController.createNewAsset);

export default router;

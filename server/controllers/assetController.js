import db from '../db.js';
import assetModel from '../models/assetModel.js';

const assetController = {
  getAllAssestList: (req, res) => {
    assetModel.getAllAsset((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getAssetByID: (req, res) => {},
};
export default assetController;

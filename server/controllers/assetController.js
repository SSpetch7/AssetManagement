import db from '../config/db.js';
import assetModel from '../models/assetModel.js';

const assetController = {
  getAllAssetList: (req, res) => {
    assetModel.getAllAsset((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getAssetByIDList: (req, res) => {
    const id = req.params.id;
    assetModel.getAssetByID(id, (err, asset) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ data: asset });
      }
    });
  },
  //   create new asset
  createNewAsset: (req, res) => {
    console.log('createNewAsset', req.body);
    if (req.body.contructor === Object && Object(req.body).length === 0) {
      res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
      console.log('valid data');
    }
  },
};
const optionController = {
  getStatusList: (req, res) => {
    assetModel.getStatusState((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getStockList: (req, res) => {
    assetModel.getStockState((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getUseableList: (req, res) => {
    assetModel.getUseableState((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getTypeAssetList: (req, res) => {
    assetModel.getTypeAsset((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getTypeComList: (req, res) => {
    assetModel.getTypeCom((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
};
export default { assetController, optionController };

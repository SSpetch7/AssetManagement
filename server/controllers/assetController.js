import db from '../config/db.js';
import Asset from '../models/assetModel.js';
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
    const assetReqData = new assetModel(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
      assetModel.createAsset(assetReqData, (err, asset) => {
        if (err) res.send(err);
        res.json({
          status: true,
          message: 'Employee Created Successfully',
          data: asset.insertId,
        });
      });
    }
  },
  getDisposaledAssetList: (req, res) => {
    assetModel.getDisposaledAsset((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
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

// Update Controller
const updateController = {
  updateAsset: (req, res) => {
    const assetReqData = new assetModel(req.body);
    console.log('assetReqData update', assetReqData);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
      assetModel.updateAsset(req.params.id, assetReqData, (err, assets) => {
        if (err) res.send(err);
        res.json({ status: true, message: 'Asset updated Successfully' });
      });
    }
  },
};

// Delete Controller
const deleteController = {
  deleteAsset: (req, res) => {
    assetModel.deleteAsset(req.params.id, (err, assets) => {
      console.log('req.params.id', req.params.id);
      if (err) res.send(err);
      res.json({ success: true, message: 'Asset deleted successully!' });
    });
  },
};

const numController = {
  getLatestOrderList: (req, res) => {
    assetModel.getLOrder((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json(assets);
    });
  },
};

export default {
  assetController,
  optionController,
  numController,
  updateController,
  deleteController,
};

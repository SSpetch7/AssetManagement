import chartModel from '../models/chartModel.js';

const assetController = {
  getAllAssestList: (req, res) => {
    chartModel.getAllAsset((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getAssetByIDList: (req, res) => {
    const id = req.params.id;
    chartModel.getAssetByID(id, (err, asset) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ data: asset });
      }
    });
  },
};
const optionController = {
  getStatusList: (req, res) => {
    chartModel.getStatusState((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getStockList: (req, res) => {
    chartModel.getStockState((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getUseableList: (req, res) => {
    chartModel.getUseableState((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getTypeAssetList: (req, res) => {
    chartModel.getTypeAsset((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getTypeComList: (req, res) => {
    chartModel.getTypeCom((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
};
export default { assetController };

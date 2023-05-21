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
  getNumberAssetList: (req, res) => {
    chartModel.getNumberAsset((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getNumberAssetTableList: (req, res) => {
    chartModel.getNumberAssetTable((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getYearAssetList: (req, res) => {
    chartModel.getYearAsset((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getNumberStatusList: (req, res) => {
    chartModel.getNumberStatus((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
};
export default { assetController, optionController };

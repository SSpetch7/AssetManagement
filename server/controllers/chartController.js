import chartModel from '../models/chartModel.js';

const numController = {
  getNumberAssetList: (req, res) => {
    chartModel.getNumberAsset((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getNumberAssetCateList: (req, res) => {
    chartModel.getNumberAssetCate((err, assets) => {
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
export default { numController };

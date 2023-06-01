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
      console.log(assets);
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

const yearController = {
  getCateAssetYearList: (req, res) => {
    const id = req.params.id;
    chartModel.getCateAssetYear(id, (err, assets) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ data: assets });
        console.log(assets);
      }
    });
  },
  getSubAssetYearList: (req, res) => {
    const id = req.params.id;
    chartModel.getSubAssetYear(id, (err, assets) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ data: assets });
        console.log(assets);
      }
    });
  },
};

export default { numController, yearController };

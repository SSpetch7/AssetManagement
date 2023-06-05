import chartModel from '../models/chartModel.js';

const numController = {
  getNumberAllAssetList: (req, res) => {
    chartModel.getNumberAllAsset((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getNumberUseableAssetList: (req, res) => {
    chartModel.getNumberAllUseable((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },

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

const statusController = {
  getStatusYearList: (req, res) => {
    const id = req.params.id;
    chartModel.getStatusYear(id, (err, assets) => {
      if (err) {
        res.send(err);
      } else {
        console.log(assets);
        console.log('assets5555555555555555555');
        res.json({ data: assets });
      }
    });
  },
};

export default { numController, yearController, statusController };

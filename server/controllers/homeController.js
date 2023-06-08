import homeModel from '../models/homeModel.js';

const numberStatusController = {
  getNumberNotebookList: (req, res) => {
    homeModel.getNumberNotebook((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getStatusNotebookList: (req, res) => {
    homeModel.getStatusNotebook((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },

  getNumberTabletList: (req, res) => {
    homeModel.getNumberTablet((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getStatusTabletList: (req, res) => {
    homeModel.getStatusTablet((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
};

export default { numberStatusController };

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
  getStatusNotebookAList: (req, res) => {
    homeModel.getStatusANotebook((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getStatusNotebookBList: (req, res) => {
    homeModel.getStatusBNotebook((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getStatusNotebookCList: (req, res) => {
    homeModel.getStatusCNotebook((err, assets) => {
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
  getStatusTabletAList: (req, res) => {
    homeModel.getStatusATablet((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getStatusTabletBList: (req, res) => {
    homeModel.getStatusBTablet((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getStatusTabletCList: (req, res) => {
    homeModel.getStatusCTablet((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
};

export default { numberStatusController };

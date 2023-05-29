import dropdownModel from "../models/dropdownModel.js";

const yearController = {
  getYearList: (req, res) => {
    dropdownModel.getYear((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getAssetByYearList: (req, res) => {
    const id = req.params.id;
    dropdownModel.getAssetByYear(id, (err, assets) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ data: assets });
      }
    });
  },
};

const roomController = {
  getRoomList: (req, res) => {
    dropdownModel.getRoom((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
  getAssetByRoomList: (req, res) => {
    const id = req.params.id;
    dropdownModel.getAssetByRoom(id, (err, assets) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ data: assets });
      }
    });
  },
};

export default { yearController, roomController };

import EachRoomModel from '../models/eachRoomModel.js';

const eachRoomController = {
  getNumberAssetList: (req, res) => {
    EachRoomModel.getNumberAsset((err, assets) => {
      if (err) {
        res.status(500).json({ error: 'Error while fetching assets' });
      } else {
        res.json({ data: assets });
      }
    });
  },
  getNumberAssetByRoomList: (req, res) => {
    const room_id = req.params.room_id;
    EachRoomModel.getNumberAssetByRoom(room_id, (err, assets) => {
      if (err) {
        res.status(500).json({ error: 'Error while fetching assets' });
      } else {
        res.json({ data: assets });
      }
    });
  },
};

export default {
  eachRoomController,
};

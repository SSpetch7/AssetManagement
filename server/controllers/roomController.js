import roomModel from '../models/roomModel.js';

const roomController = {
  getRoomList: (req, res) => {
    roomModel.getRoom((err, assets) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: assets });
    });
  },
};
export default { roomController };

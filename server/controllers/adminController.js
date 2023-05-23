import adminModel from '../models/adminModel.js';

const adminController = {
  getAllAdminList: (req, res) => {
    adminModel.getAllAdmin((err, admins) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: admins });
    });
  },
};

export default { adminController };

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
  
  getAdminByIdList: (req, res) => {
    const adminId = req.params.id;
    adminModel.getAdminById(adminId, (err, admin) => {
      if (err) {
        res.send(err);
      }
      res.json({ data: admin });
    });
  },

  // getAdminByName: (req, res) => {
  //   const adminName = req.admin_username;
  //   adminModel.getAdminById(adminName, (err, admin) => {
  //     if (err) {
  //       res.send(err);
  //     }
  //     res.json({ data: admin });
  //   });
  // },

  createAdmin: (req, res) => {
    const adminData = req.body;
    adminModel.createAdmin(adminData, (err, result) => {
      if (err) {
        return res.json({ error: 'Error creating admin' });
      }
      return res.json({ message: 'Admin created successfully' });
    });
  },
};

export default { adminController };

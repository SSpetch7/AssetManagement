import db from '../db.js';

var Admin = (admin) => {
  this.admin_id = admin.admin_id;
  this.admin_username = admin.admin_username;
  this.admin_email = admin.admin_email;
  this.admin_addDate = admin.admin_addDate;
};

const sqlAllAdmin =
  'SELECT admin_id, admin_email, admin_username, admin_addDate FROM admin ';
Admin.getAllAdmin = (result) => {
  db.query(sqlAllAdmin, (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('asset_detail fetching successfully');
      result(null, res);
    }
  });
};

export default Admin;

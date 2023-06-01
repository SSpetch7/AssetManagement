import db from '../config/db.js';
import bcrypt from 'bcrypt';

var Admin = function (admin) {
  this.admin_id = admin.admin_id;
  this.admin_username = admin.admin_username;
  this.admin_email = admin.admin_email;
  this.admin_addDate = admin.admin_addDate;
  this.role = admin.role;
};

const sqlAllAdmin =
  'SELECT admin_id, admin_email, admin_username, admin_addDate, role FROM admin ';
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


const sqlAdminById =
  'SELECT admin_id, admin_email, admin_username, admin_addDate FROM admin WHERE admin_email = ?';
Admin.getAdminById = (admidEmail, result) => {
  db.query(sqlAdminById, [admidEmail], (err, res) => {
    if (err) {
      console.log('Error while fetching asset ', err);
      result(null, err);
    } else {
      console.log('asset_detail fetching successfully');
      result(null, res);
    }
  });
};

const generateRandomPassword = () => {
  const length = 10; // Length of the random password
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
};

const sql =
  'INSERT INTO admin (admin_username, admin_email, admin_password, role) VALUES (?, ?, ?, ?)';
Admin.createAdmin = (newAdmin, callback) => {
  const { admin_username, admin_email } = newAdmin;
  const admin_password = generateRandomPassword();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return callback(err, null);
    }

    bcrypt.hash(admin_password, salt, (err, hash) => {
      if (err) {
        return callback(err, null);
      }

      db.query(
        sql,
        [admin_username, admin_email, hash, 'admin'],
        (err, result) => {
          if (err) {
            return callback(err, null);
          }
          return callback(null, result);
        }
      );
    });
  });
};

export default Admin;

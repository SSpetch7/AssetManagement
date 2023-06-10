import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import connection from './config/db.js';

import assetRoutes from './routes/assetRoute.js';

import adminRoutes from './routes/adminRoute.js';
import chartRoutes from './routes/chartRoute.js';
import Admin from './models/adminModel.js';
import roomRoutes from './routes/roomRoute.js';
import dropdownRoutes from './routes/dropdownRoute.js';
import eachRoomRoutes from './routes/eachRoomRoute.js';
import homeRoutes from './routes/homeRoute.js';

// CONFIGURATION

const app = express();
// app.locals.express = express;
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());

const salt = 10;

dotenv.config();

/* ROUTES */
app.use('/admin', adminRoutes);
app.use('/asset', assetRoutes);
app.use('/chart', chartRoutes);
app.use('/room', roomRoutes);
app.use('/dropdown', dropdownRoutes);
app.use('/eachroom', eachRoomRoutes);
app.use('/homeasset', homeRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, function (req, res) {
  console.log('The server has been connect by port : ' + PORT);
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: 'You are not authenticated' });
  } else {
    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ Error: 'Token is not correct' });
      } else {
        req.admin_username = decoded.admin_username;
        req.role = decoded.role;
        next();
      }
    });
  }
};


const transporter = nodemailer.createTransport({
  service: 'Gmail', // Replace with your email service provider's SMTP host
  auth: {
    user: 'kmutt.asset@gmail.com', // Replace with your email address
    pass: 'ddchebbutcibpsce', // Replace with your email password or an app-specific password
  },
});

// Route to handle forgot password request
app.post('/forgot-password', async (req, res) => {
  const { admin_email } = req.body;

  // Retrieve the user's password from the database
  const query = 'SELECT admin_password FROM admin WHERE admin_email = ?';
  const values = [admin_email];
  connection.query(query, values, async (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const admin_password = results[0].admin_password;

    // Generate a random token (implementation may vary)
    const token = jwt.sign({ admin_email, admin_password }, 'jwt-secret-key', {
      expiresIn: '1h',
    });

    // Store the token in the database or any other storage mechanism

    // Send password reset email
    const mailOptions = {
      from: 'kmutt.asset@gmail.com', // Replace with your email address
      to: admin_email,
      subject: 'Password Reset',
      html: `<!doctype html>
      <html lang="en-US">
      
      <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Reset Password</title>
          <meta name="description" content="Reset Password Email Template.">
          <style type="text/css">
              a:hover {text-decoration: underline !important;}
          </style>
      </head>
      
      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          <!--100% body table-->
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
              style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
              <tr>
                  <td>
                      <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                          align="center" cellpadding="0" cellspacing="0">
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                <a href="https://asset-management-kmutt.vercel.app" title="logo" target="_blank">
                                  <img width="300" src="https://i.imgur.com/wl0sW39.png" title="logo" alt="logo">
                                </a>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                      style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                      <tr>
                                          <td style="padding:0 35px;">
                                              <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">กรุณาเปลี่ยนรหัสผ่านเพื่อใช้งานเว็บไซต์</h1>
                                              <span
                                                  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                              <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              โปรดทำการเปลี่ยนรหัสผ่านของท่านภายในระยะเวลา 24 ชั่วโมง นับจากที่ท่านได้รับอีเมลฉบับนี้ มิฉะนั้นอีเมลนี้จะหมดอายุ คลิกที่ปุ่ม "เปลี่ยนรหัสผ่าน" ด้านล่างเพื่อเริ่มเข้าสู่หน้าเปลี่ยนรหัสผ่าน
                                              </p>
                                              <a href="http://localhost:3000/reset-password?token=${token}"
                                                  style="background:#FF8261;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">เปลี่ยนรหัสผ่าน</a>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                  </table>
                              </td>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                  <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>KMUTT AssetManagement</strong></p>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
          
      </body>
      
      </html>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send password reset email' });
    }
  });
});

// Route to handle password reset
app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  console.log(token, newPassword);
  // Verify the token
  try {
    const decodedToken = jwt.verify(token, 'jwt-secret-key');
    const admin_email = decodedToken.admin_email;
    const passwordFromToken = decodedToken.admin_password;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const query = 'UPDATE admin SET admin_password = ? WHERE admin_email = ?';
    const values = [hashedPassword, admin_email];
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'Password reset successful' });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

app.get('/', verifyUser, (req, res) => {
  return res.json({ Status: 'Success', admin_username: req.admin_username, role : req.role });
});

app.post('/register', (req, res) => {
  const email = req.body.admin_email;
  
  const emailCheckQuery = 'SELECT admin_email FROM admin WHERE admin_email = ?';
  connection.query(emailCheckQuery, [email], (err, rows) => {
    if (err) {
      console.log(err);
      return res.json({ Error: 'Error in server' });
    }
    
    if (rows.length > 0) {
      return res.json({ Error: 'Email already exists' });
    }
  
    const sql =
      'INSERT INTO admin (admin_username, admin_email, admin_password) VALUES(?)';
    bcrypt.hash(req.body.admin_password.toString(), salt, (err, hash) => {
      if (err) {
        console.log(err);
        return res.json({ Error: 'Error hashing password' });
      }
      
      const values = [req.body.admin_username, req.body.admin_email, hash];
      connection.query(sql, [values], (err, result) => {
        if (err) {
          console.log(err);
          return res.json({ Error: 'Error inserting data in server' });
        }
        
        return res.json({ Status: 'Success' });
      });
    });
  });
});

app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM admin WHERE admin_email = ?';
  connection.query(sql, [req.body.admin_email], (err, data) => {
    if (err) return res.json({ Error: 'Login Error in server' });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.admin_password.toString(),
        data[0].admin_password,
        (err, response) => {
          if (err) return res.json({ Error: 'Password compare error' });
          if (response) {
            const admin_username = data[0].admin_username;
            const role = data[0].role;
            const token = jwt.sign({ admin_username, role }, 'jwt-secret-key', {
              expiresIn: '30d',
            });
            res.cookie('token', token);
            return res.json({ Status: 'Success' });
          } else {
            return res.json({ Status: 'Password is incorrect' });
          }
        }
      );
    } else {
      return res.json({ Error: 'No email exists' });
    }
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: 'Success' });
});

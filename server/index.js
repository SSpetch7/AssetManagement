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
      text: `Click the following link to reset your password: http://localhost:3000/reset-password?token=${token}`,
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
  return res.json({ Status: 'Success', admin_username: req.admin_username });
});

app.post('/register', (req, res) => {
  const sql =
    'INSERT INTO admin (admin_username, admin_email, admin_password) VALUES(?)';
  bcrypt.hash(req.body.admin_password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: 'Error for hassing password' });
    const values = [req.body.admin_username, req.body.admin_email, hash];
    connection.query(sql, [values], (err, result) => {
      console.log(err);
      if (err) return res.json({ Error: 'Inserting data Error in server' });
      return res.json({ Status: 'Success' });
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
            const token = jwt.sign({ admin_username }, 'jwt-secret-key', {
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

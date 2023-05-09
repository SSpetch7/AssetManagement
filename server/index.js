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
import connection from './db.js';
// import clientRoutes from './routes/client.js';
// import generalRoutes from './routes/general.js';
// import routes
import assetRoutes from './routes/assetRoute.js';
// import managementRoutes from "./routes/management.js";

// CONFIGURATION

const app = express();
// app.locals.express = express;
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: [ "POST", "GET" ],
  credentials: true
}));
app.use(cookieParser());

const salt = 10;

dotenv.config();

/* ROUTES */
app.use('/asset', assetRoutes);
// app.use('/state', assetRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, function (req, res) {
  console.log('The server has been connect by port : ' + PORT);
});

app.post('/register', (req, res) => {
  const sql = "INSERT INTO admin (admin_username, admin_email, admin_password) VALUES(?)";
  bcrypt.hash(req.body.admin_password.toString(), salt, (err, hash) => {
      if(err) return res.json({Error: "Error for hassing password"});
      const values = [
        req.body.admin_username,
        req.body.admin_email,
        hash
      ]
      connection.query(sql, [values], (err, result) => {
        if(err) return res.json({Error: "Inserting data Error in server"});
        return res.json({Status: "Success"});
      })
  })
})

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM admin WHERE admin_email = ?";
  connection.query(sql, [req.body.admin_email], (err, data) => {
    if(err) return res.json({Error: "Login Error in server"});
    if(data.length > 0) {
      bcrypt.compare(req.body.admin_password.toString(), data[0].admin_password, (err, response) => {
        if(err) return res.json({Error: "Password compare error"});
        if(response) {
          const admin_username = data[0].admin_username;
          const token = jwt.sign({admin_username}, "jwt-secret-key", {expiresIn: '1d'});
          res.cookie('token', token);
          return res.json({Status: "Success"});
        } else {
          return res.json({Status: "Password is incorrect"});
        }
    })
  } else {
    return res.json({Error: "No email exists"});
  }
  })
})


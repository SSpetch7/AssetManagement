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
app.use(cors());
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
        console.log(err);
        if(err) return res.json({Error: "Inserting data Error in server"});
        return res.json({Status: "Success"});
      })
  })
})


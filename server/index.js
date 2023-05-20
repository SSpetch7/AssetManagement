import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// import clientRoutes from './routes/client.js';
// import generalRoutes from './routes/general.js';
// import routes
import assetRoutes from './routes/assetRoute.js';
// import imgRoutes from './routes/imgRoute.js';
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

dotenv.config();

/* ROUTES */
app.use('/asset', assetRoutes);
// app.use('/image', imgRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, function (req, res) {
  console.log('The server has been connect by port : ' + PORT);
});

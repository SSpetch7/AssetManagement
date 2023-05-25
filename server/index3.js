import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());

dotenv.config();

/* MYSQL SETUP */
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to MYSQL  database = ', err);
    return;
  }
  console.log('MYSQL database Connected!!');
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM user_details ',
    function (err, results, fields) {
      res.send(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

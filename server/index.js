import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';

// import managementRoutes from "./routes/management.js";

// CONFIGURATION

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

dotenv.config();

/* ROUTES */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
// app.use("/management", managementRoutes);

// var host = 'localhost';
// if (process.env.NODE_ENV == 'production') {
//   host = 'mysql-server';
// }

/* MYSQL SETUP */
const PORT = process.env.PORT || 9000;
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
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
});

app.get('/', function (req, res, next) {
  res.json({ msg: 'test test' });
  connection.query(
    'SELECT * FROM user_details',
    function (err, results, fields) {
      res.json(results);
    }
  );
});
connection.query(
  'SELECT * FROM `user_details` ',
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

app.listen(3333, function () {
  console.log('test');
});
/* CREATE Routes */

// import express from 'express';
// import cors from 'cors';
// import mysql from 'mysql2';
// const app = express();
// app.use(express.json());

// // create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   //   password: '12345',
//   database: 'samplevideo_db',
// });
// app.use(cors());
// app.get('/attractions', function (req, res, next) {
//   res.json({ msg: 'test test' });
// });

// // simple query
// connection.query(
//   'SELECT * FROM samplevideo_db',
//   function (err, results, fields) {
//     res.json(results);
//   }
// );

// app.listen(3333, function () {
//   console.log('test');
// });

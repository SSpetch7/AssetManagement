import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mysql',
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
  res.json({ msg: 'test' });
});

app.listen(5000, function () {
  console.log('test again');
});

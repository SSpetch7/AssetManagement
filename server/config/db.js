import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

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
});
export default connection;

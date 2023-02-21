import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";

// import managementRoutes from "./routes/management.js";

// CONFIGURATION

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

dotenv.config();

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
// app.use("/management", managementRoutes);

/* MYSQL SETUP */
const PORT = process.env.PORT || 9000;
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 3307,
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to MYSQL  database = ", err);
    return;
  }
  console.log("MYSQL database Connected!!");
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
});

/* CREATE Routes */

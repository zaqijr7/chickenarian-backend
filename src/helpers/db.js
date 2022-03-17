const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD
} = process.env;

const db = mysql.createConnection({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  insecureAuth: true,
  port: 3307
});

db.connect();

module.exports = db;
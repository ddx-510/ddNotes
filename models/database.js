require("dotenv").config();
const PORT = process.env.PORT || 8080;
const fetch = require("cross-fetch");
const { response } = require("express");
const Pool = require('pg').Pool

const currentDB = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

module.exports = currentDB;
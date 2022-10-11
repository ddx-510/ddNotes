require("dotenv").config();
const PORT = process.env.PORT || 8080;
const fetch = require("cross-fetch");
const { response } = require("express");
const Pool = require('pg').Pool

const connectStr = process.env.DATABASE_URL;
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const isProduction = process.env.NODE_ENV === 'production'; // heroku default

const currentDB = new Pool({
  connectionString: isProduction ? connectStr : connectionString,
  ssl: isProduction ? {rejectUnauthorized: false} : false 
});

module.exports = currentDB;
const { response } = require("express");
const currentDB = require("../models/database");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  // Search the user in a database, throw an error if not found.
  //todo: encrypt the password => currently exposed
  const results = await currentDB.query("SELECT * FROM users where email = $1 AND password = $2", [email, password]);
  // if get no response => email and password are mismatched
  if (results.rows.length === 0) {
    return res.status(400).json({
      msg: "User / Password are incorrect",
    });
  }
  
  res.json({
    name: results.rows[0].name,
    id: results.rows[0].id,
    token: "A JWT token to keep the user logged in.",
    msg: "Successful login",
  });
};

module.exports = {
  login,
};

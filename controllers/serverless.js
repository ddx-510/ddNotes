const fetch = require("cross-fetch");
const { response } = require("express");
const URL = "https://us-central1-otot-b-ddnote.cloudfunctions.net/weather?name=";


const getWeather = async (req, res = response) => {
    const { name } = req.params;
    try {
      const resp = await fetch(
        URL + name,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (resp.status >= 400) {
        throw new Error("Bad response from server");
      }
  
      const data = await resp.json();
      res.json(data);
    } catch (err) {
      console.error(err);
    }
  };
  
  module.exports = {
    getWeather
  };
  
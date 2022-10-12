const { Router } = require("express");
const router = Router();

const {getWeather} = require("../controllers/serverless");

router.get("/:name", getWeather);

module.exports = router;

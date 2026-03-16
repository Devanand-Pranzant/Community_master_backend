const express = require("express");
const router = express.Router();

const controller = require("../controllers/location_master.controller");


// GET COUNTRIES
router.get("/countries", controller.getCountries);


// GET CITIES BY COUNTRY
router.get("/cities/:country_id", controller.getCitiesByCountry);


module.exports = router;
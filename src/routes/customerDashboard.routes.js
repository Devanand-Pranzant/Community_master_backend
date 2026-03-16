const express = require("express");
const router = express.Router();

const controller = require("../controllers/customerDashboard.controller");


// TEST ENDPOINT - Add this temporarily
router.get("/test", (req, res) => {
  res.json({ message: "Customer dashboard test route is working!" });
});

// GET CUSTOMER DASHBOARD
router.get("/", controller.getCustomerDashboard);

module.exports = router;
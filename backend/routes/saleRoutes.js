const express = require("express");
const router = express.Router();

const { checkout } = require("../controllers/saleController");

router.post("/checkout", checkout);

module.exports = router;
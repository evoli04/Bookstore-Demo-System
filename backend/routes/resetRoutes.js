const express = require("express");
const router = express.Router();

const { resetData } = require("../controllers/resetController");

router.post("/reset", resetData);

module.exports = router;
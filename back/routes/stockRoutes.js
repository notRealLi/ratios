const express = require("express");
const router = express.Router();
const { searchSymbol } = require("../controllers/stockController");

router.route("/search/:text").get(searchSymbol);

module.exports = router;

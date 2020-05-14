const express = require("express");
const router = express.Router();
const { searchSymbol, getApiKey } = require("../controllers/stockController");

router.route("/search/:text").get(searchSymbol);
router.route("/keys").get(getApiKey);

module.exports = router;

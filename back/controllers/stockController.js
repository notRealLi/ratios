const Stock = require("../models/Stock");
const axios = require("axios");

// @desc   get api keys for Alpha Vantage
// @route  GET /api/v1/stocks/keys
// @access public
// TODO: move api keys to database
exports.getApiKey = async (req, res, next) => {
  try {
    const keys = [
      { provider: "AV", key: "W52VB1BHI4STUX4G" },
      { provider: "AV", key: "SB2DUP7HDP6YVKCF" },
      { provider: "AV", key: "VCFW0GH7VDILM9PH" },
    ];
    return res.status(200).json({
      success: true,
      size: keys.length,
      data: keys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc   search for stock symbol
// @route  GET /api/v1/stocks/search
// @access public
exports.searchSymbol = async (req, res, next) => {
  try {
    const { text } = req.params;
    const {
      data: { bestMatches },
    } = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=W52VB1BHI4STUX4G`
    );

    return res.status(200).json({
      success: true,
      data: bestMatches,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

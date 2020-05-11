const Stock = require("../models/Stock");
const axios = require("axios");

// @desc   search for stock symbol
// @route  GET /api/v1/stocks/search
// @access public
exports.searchSymbol = async (req, res, next) => {
  try {
    const { text } = req.params;
    const symbols = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=W52VB1BHI4STUX4G`
    );

    return res.status(200).json({
      success: true,
      data: symbols.data.bestMatches,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

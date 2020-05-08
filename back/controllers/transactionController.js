const Transaction = require("../models/Transaction");

// @desc   get all transactions
// @route  GET /api/v1/transactions
// @access public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc   add a transactions
// @route  POST /api/v1/transactions
// @access public
exports.addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        errors: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
// @desc   delete a transactions
// @route  DELETE /api/v1/transactions
// @access public
exports.deleteTransactions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    if (!transaction)
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });

    await transaction.remove();
    return res.status(200).json({
      success: true,
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

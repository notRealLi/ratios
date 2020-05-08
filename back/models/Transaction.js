const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, "Please enter some text"],
  },
  amount: {
    type: Number,
    required: [true, "Enter a non-zero number"],
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);

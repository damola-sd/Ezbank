const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let transactionHistory = new Schema(
  {
    amount: Number,
    sentFrom: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    receivedIn: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    channel: String,
    is_successful: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TransactionHistory", transactionHistory);

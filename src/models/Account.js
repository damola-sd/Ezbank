const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let accountDetails = new Schema(
  {
    account_name: String,
    account_number: String,
    balance: {
      type: Number,
      default: 1000,
    },
    account_owner: { type: Schema.Types.ObjectId, ref: "User" },
    transaction_history: [
      {
        transaction_type: String,
        amount: Number,
        comment: String,
        is_successful: { type: Boolean, default: true },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountDetails);

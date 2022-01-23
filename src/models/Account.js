const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let accountDetails = new Schema(
  {
    account_name: String,
    account_number: { type: String, unique: true },
    balance: {
      type: Number,
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

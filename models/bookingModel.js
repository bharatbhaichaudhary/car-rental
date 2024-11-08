const mongoose = require("mongoose");

const bookingSchma = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookedTimeSlots: { from: { type: String }, to: { type: String } },
    totalHours: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String },
    diverRequired: { typeof: Boolean },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("Booking", bookingSchma);

module.exports = bookingModel;

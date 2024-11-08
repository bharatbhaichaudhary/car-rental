const { Schema, model } = require("mongoose");

const carSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rentPerHour: { type: Number, required: true },
  fuelType: { type: String, required: true },
  capacity: { type: Number, required: true },
  bookedTimeSlots: [{ from: { type: String }, to: { type: String } }],
});

const carModel = model("Car", carSchema);

module.exports = carModel;
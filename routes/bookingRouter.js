const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const stripe = require("stripe")(
  "sk_test_51Q2aQV07pFCNk7gZXSpE1XMDufJOeliY68Zo504k0syuLIGu6WKesJQOTCsEYjjYagMX0Y9ipByRfQQjC5tQhNvg00y0uio9rt"
);
const { v4: uuidv4 } = require("uuid");

router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;

      await Booking.create(req.body);

      const car = await Car.findOne({ _id: req.body.car });
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await car.save();
      // const car = await Car.findOne({ _id: req.body.car });
      // await Car.findOneAndUpdate({ _id: req.body.car },{ bookedTimeSlots:[...car.bookedTimeSlots,req.body.bookedTimeSlots]});
      res.status(200).json({ message: "Your Booking is Successfully" });
    } else {
      return res.status(400).json({ message: "payment error......" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;

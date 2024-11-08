const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");
// carList,
router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// carDitelbyid
router.get("/carDetails/:carid", async (req, res) => {
  const id = req.params.carid;
  try {
    const carDetail = await Car.findById(id);
    if (carDetail) {
      res.status(200).json(carDetail);
    } else {
      res.status(404).json({ message: "car not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Add Car

router.post("/addcar", async (req, res) => {
  try {
    const newcar = new Car(req.body);
    console.log(newcar, "newcar");

    await newcar.save();
    res.status(200).json({ message: "car add successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// updatedcar
router.post("/editcar", async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });

    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;

    await car.save();

    res.status(200).json({ message: "car ditals updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// deletecar

router.post("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.status(200).json({ message: "car data delete successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;

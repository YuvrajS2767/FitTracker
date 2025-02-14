const mongoose = require("mongoose");

const BMISchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  height: { type: Number, required: true }, // in cm
  weight: { type: Number, required: true }, // in kg
  bmi: { type: Number, required: true }, // calculated BMI
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BMI", BMISchema);

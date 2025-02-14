const mongoose = require("mongoose");

const CalorieSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) }, // Stores only the day, ignoring time
});

// Ensure a user can only have one calorie entry per day
CalorieSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Calorie", CalorieSchema);

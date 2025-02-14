const mongoose = require("mongoose");

const FoodLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    item: { type: String, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FoodLog", FoodLogSchema);

const express = require("express");
const { 
  saveDailyCalories, 
  getUserCaloricNeeds, 
  calculateCalories 
} = require("../controllers/calorieController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Save or update user's daily caloric needs
router.post("/save", authMiddleware, saveDailyCalories);

// ✅ Get user's caloric needs history
router.get("/user", authMiddleware, getUserCaloricNeeds);

// ✅ Calculate daily caloric needs (returns recommended calories)
router.post("/calculate", authMiddleware, calculateCalories);

module.exports = router;

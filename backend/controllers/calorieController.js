const Calorie = require("../models/Calorie");

// ✅ Save or Update Daily Caloric Needs
exports.saveDailyCalories = async (req, res) => {
  try {
    const { calories } = req.body;
    const userId = req.user.id;

    if (!calories) {
      return res.status(400).json({ message: "Caloric value is required" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight for date comparison

    // ✅ Fix: Use `$gte` to find entries from today
    let calorieEntry = await Calorie.findOne({
      user: userId,
      date: { $gte: today }, 
    });

    if (calorieEntry) {
      calorieEntry.calories = calories; // Update existing entry
    } else {
      calorieEntry = new Calorie({ user: userId, calories, date: today }); // Create new entry
    }

    await calorieEntry.save();

    res.status(201).json({ message: "Daily calories saved", entry: calorieEntry });
  } catch (error) {
    console.error("Error saving daily calories:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ Get User's Caloric Needs History
exports.getUserCaloricNeeds = async (req, res) => {
  try {
    const calorieRecords = await Calorie.find({ userId: req.user.id }).sort({ date: -1 });

    res.json(calorieRecords); // ✅ Return only relevant data
  } catch (error) {
    console.error("Error fetching calorie records:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Calculate Daily Caloric Needs
exports.calculateCalories = async (req, res) => {
  try {
    const { age, gender, height, weight, activityLevel } = req.body;

    if (!age || !gender || !height || !weight || !activityLevel) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["male", "female"].includes(gender)) {
      return res.status(400).json({ message: "Invalid gender. Must be 'male' or 'female'." });
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    if (!activityMultipliers[activityLevel]) {
      return res.status(400).json({
        message: "Invalid activity level. Must be one of: sedentary, light, moderate, active, very_active.",
      });
    }

    // Calculate Basal Metabolic Rate (BMR)
    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    // Calculate Total Daily Energy Expenditure (TDEE)
    const calories = Math.round(bmr * activityMultipliers[activityLevel]);

    res.json({ message: "Calories calculated successfully", calories });
  } catch (error) {
    console.error("Error calculating calories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

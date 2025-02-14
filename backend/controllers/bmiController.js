const BMI = require("../models/BMI");

exports.calculateBMI = async (req, res) => {
  try {
    console.log("User Object:", req.user); // ✅ Debugging log

    const { height, weight } = req.body;
    const userId = req.user?.id; // ✅ Ensure `req.user.id` exists
    console.log("Decoded User ID:", userId); // ✅ Check if user ID is available

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    if (!height || !weight) {
      return res.status(400).json({ message: "Height and weight are required" });
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    const newBMI = await BMI.create({ user: userId, height, weight, bmi: bmiValue });

    res.status(201).json({ message: "BMI calculated successfully", bmi: newBMI });
  } catch (error) {
    console.error("Error calculating BMI:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserBMI = async (req, res) => {
  try {
    const userId = req.user?.id;
    console.log("Decoded User ID:", userId); // ✅ Check if user ID exists

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const bmiRecords = await BMI.find({ user: userId }).sort({ createdAt: -1 });

    console.log("Fetched BMI Records:", bmiRecords); // ✅ Debugging log

    res.json({ bmiRecords: bmiRecords.length > 0 ? bmiRecords : [] });
  } catch (error) {
    console.error("Error fetching BMI records:", error);
    res.status(500).json({ message: "Server error" });
  }
};

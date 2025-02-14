const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BMI = require("../models/BMI"); // ✅ Add this line
const Calorie = require("../models/Calorie");



// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from JWT token
    const { name, email, password } = req.body;

    // Find the user
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the new email is already in use
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) return res.status(400).json({ message: "Email is already in use" });
      user.email = email;
    }

    // Update name if provided
    if (name) user.name = name;

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save updated user data
    await user.save();

    res.json({ message: "Profile updated successfully", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Get User Profile
// Get User Profile (with BMI Records)
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // ✅ Fetch user data
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Fetch BMI records
    const bmiRecords = await BMI.find({ user: userId }).sort({ date: -1 });
    const calorieRecords = await Calorie.find({ user: userId }).sort({ date: -1 });

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        bmiRecords,calorieRecords,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


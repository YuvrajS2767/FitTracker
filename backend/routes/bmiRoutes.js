const express = require("express");
const { calculateBMI, getUserBMI } = require("../controllers/bmiController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/calculate", authMiddleware, calculateBMI);
router.get("/user", authMiddleware, getUserBMI);

module.exports = router;

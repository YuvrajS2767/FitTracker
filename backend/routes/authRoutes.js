const express = require("express");
const { register, login , updateProfile , getUserProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", authMiddleware, updateProfile);
router.get("/profile", authMiddleware, getUserProfile);


module.exports = router;

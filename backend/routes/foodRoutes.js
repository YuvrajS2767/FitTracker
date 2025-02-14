const express = require("express");
const { getNutritionData } = require("../controllers/foodController");

const router = express.Router();

router.post("/nutrition", getNutritionData);

module.exports = router;

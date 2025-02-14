const axios = require("axios");

exports.getNutritionData = async (req, res) => {
  try {
    let { food } = req.body;
    const appId = process.env.EDAMAM_APP_ID;
    const apiKey = process.env.EDAMAM_APP_KEY;

    if (!/^\d+/.test(food)) {
      food = `100g ${food}`;
    }

    const response = await axios.get(
      `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${apiKey}&ingr=${encodeURIComponent(food)}`
    );

    const nutritionData = response.data;

    // Extract relevant data
    const formattedData = {
      food: food,
      calories: nutritionData.calories || 0,
      carbs: nutritionData.totalNutrients?.CHOCDF?.quantity || 0,
      fat: nutritionData.totalNutrients?.FAT?.quantity || 0,
      protein: nutritionData.totalNutrients?.PROCNT?.quantity || 0,
    };

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nutrition data" });
  }
};

import { useState } from "react";
import { fetchNutrition } from "../utils/api";
import "../styles/Nutrition.css";
const Nutrition = () => {
  const [food, setFood] = useState("");
  const [foodEntries, setFoodEntries] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  // Fetch Nutrition Data
  const handleFetch = async (e) => {
    e.preventDefault();
    if (!food.trim()) return;

    try {
      const res = await fetchNutrition(food);
      const newFoodItem = {
        id: Date.now(),
        name: food,
        calories: res.data.calories,
        carbs: res.data.carbs,
        protein: res.data.protein,
        fat: res.data.fat,
      };

      // Update food list and total calories
      setFoodEntries([...foodEntries, newFoodItem]);
      setTotalCalories((prev) => prev + res.data.calories);
      setFood(""); // Clear input after adding
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
    }
  };

  // Remove food item
  const handleRemove = (id, calories) => {
    setFoodEntries(foodEntries.filter((item) => item.id !== id));
    setTotalCalories((prev) => prev - calories);
  };

  return (
    <div className="container1">
      <h1>Calorie Tracker</h1>
      <form onSubmit={handleFetch} id="tracker-form">
        <input
          type="text"
          id="item"
          placeholder="Enter food or drink"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          required
        />
        <button type="submit" className="AddBtn">
          Add
        </button>
      </form>

      <ul id="log">
        {foodEntries.map((item) => (
          <li key={item.id} className="food-item">
            <strong>{item.name}</strong>: {item.calories} kcal
            
            <small>🍞 Carbs: {item.carbs}g | 🍗 Protein: {item.protein}g |🧈 Fat: {item.fat}g</small>
            <button onClick={() => handleRemove(item.id, item.calories)} className="delete">
              X
            </button>
          </li>
        ))}
      </ul>

      <h2>
        Total Calories: <span id="total-calories" >{totalCalories}</span> kcal
      </h2>
    </div>
  );
};

export default Nutrition;

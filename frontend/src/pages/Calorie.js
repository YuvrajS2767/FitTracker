import { useState, useEffect } from "react";
import { calculateCalories, saveDailyCalories, getUserCaloricNeeds } from "../utils/api";
import "../styles/Calorie.css";

const Calorie = () => {
  const [calorieData, setCalorieData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
  });
  const [calorieResult, setCalorieResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch previous calorie data
  const fetchCalorieHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await getUserCaloricNeeds(token);
      console.log("Fetched Calorie History:", response);

      if (response && response.length > 0) {
        setCalorieResult(response[0].calories); // Update UI with last saved result
      }
    } catch (error) {
      console.error("Error fetching calorie history:", error);
    }
  };

  useEffect(() => {
    fetchCalorieHistory();
  }, []);

  // ✅ Calculate & Save Calories
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        return;
      }

      const response = await calculateCalories(calorieData, token);
      console.log("API Response for Calories:", response);

      if (response && response.calories) {
        setCalorieResult(response.calories); // ✅ Set result to display on UI
        console.log("Set Calories:", response.calories);

        await saveDailyCalories({ calories: response.calories }, token);
        console.log("Calories saved successfully!");

        // ✅ Fetch updated calorie history
        fetchCalorieHistory();
      } else {
        setError("Unexpected API Response");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Calorie Calculator</h1>
      </header>

      <div className="main-content-container">
        <aside className="sidebar2">
          <h2><u>Wellness Tips</u></h2>
          <h3>Weight Loss →</h3>
          <p>To lose weight you need to eat in a calorie deficit, meaning that you will have to consume lesser calories than your maintainence calories (your daily calorie need)</p>
          <h3>Weight Gain →</h3>
          <p>To gain weight you need to be in a calorie surplus, meaning that you will have to consume more calories than your maintainence calories (your daily calorie needs)</p>
        </aside>

        <main className="main-content">
          <div className="calculator-container">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Gender</label>
                <select
                  value={calorieData.gender}
                  onChange={(e) => setCalorieData({ ...calorieData, gender: e.target.value })}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="input-group">
                <label>Age (years)</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  placeholder="Enter your age"
                  value={calorieData.age}
                  onChange={(e) => setCalorieData({ ...calorieData, age: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  min="30"
                  max="300"
                  placeholder="Enter your weight"
                  value={calorieData.weight}
                  onChange={(e) => setCalorieData({ ...calorieData, weight: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  min="100"
                  max="250"
                  placeholder="Enter your height"
                  value={calorieData.height}
                  onChange={(e) => setCalorieData({ ...calorieData, height: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label>Activity Level</label>
                <select
                  value={calorieData.activityLevel}
                  onChange={(e) => setCalorieData({ ...calorieData, activityLevel: e.target.value })}
                  required
                >
                  <option value="">Select Activity Level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light Exercise</option>
                  <option value="moderate">Moderate Exercise</option>
                  <option value="active">Heavy Exercise</option>
                  <option value="very_active">Athlete</option>
                </select>
              </div>

              <div className="button-group">
                <button type="submit" className="calculate-btn">
                  {loading ? "Calculating..." : "Calculate"}
                </button>
                <button
                  type="reset"
                  className="reset-btn"
                  onClick={() => setCalorieData({ age: "", gender: "", weight: "", height: "", activityLevel: "" })}
                >
                  Reset
                </button>
              </div>
            </form>

            {/* ✅ Display the calculated calories */}
            {error && <p className="error">{error}</p>}

            {calorieResult !== null && (
              <div className="result3">
                <h3>Your Daily Calorie Needs:</h3>
                <p><strong>{calorieResult} calories/day</strong></p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calorie;

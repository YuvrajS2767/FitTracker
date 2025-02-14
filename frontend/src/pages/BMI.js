import { useState } from "react";
import { calculateBMI } from "../utils/api";
import "../styles/BMI.css"

const BMI = () => {
  const [bmiData, setBmiData] = useState({ height: "", weight: "" });
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setBmiData({ ...bmiData, [e.target.name]: e.target.value });
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      const response = await calculateBMI(bmiData, token);
      const bmiValue = response.bmi.bmi;
      setBmiResult(bmiValue);
      const category = getBMICategory(bmiValue);
      setBmiCategory(category);
      setProgress(Math.min(Math.max(((bmiValue - 15) / (40 - 15)) * 100, 0), 100));
    } catch (error) {
      console.error("BMI Calculation Error:", error);
    }
  };

  const handleReset = () => {
    setBmiData({ height: "", weight: "" });
    setBmiResult(null);
    setBmiCategory("");
    setProgress(0);
  };

  const dietSuggestions = {
    'Underweight': ['Consume calorie-dense foods like nuts and dried fruits',
                    'Eat frequent small meals throughout the day',
                    'Include protein-rich foods in every meal',
                    'Consider smoothies instead of water for hydration',
                    'Add healthy fats like avocado and olive oil'],
    
                    'Normal': [ 'Maintain balanced diet with variety of foods',
                'Focus on whole grains and lean proteins',
                'Include 5 servings of fruits/vegetables daily',
                'Stay hydrated with water throughout the day',
                'Maintain regular physical activity'],
    
                'Overweight': ['Focus on portion control',
                    'Increase vegetable intake for fiber',
                    'Choose lean protein sources',
                    'Limit processed foods and sugars',
                    'Incorporate regular cardio exercise'],
    
                    'Obese': ['Consult with a nutritionist or doctor',
                    'Focus on gradual weight loss (1-2 lbs/week)',
                    'Track food intake and calories (Through our website ofcourse 😏) ',
                    'Increase physical activity gradually',
                    'Reduce sugar and refined carbs intake'],
  };

  return (
    <div className="container">
      <header>
        <h1>BMI Calculator</h1>
      </header>
      <div className="main-content-container">
        <aside className="sidebar">
          <h2>ADDITIONAL INFORMATION</h2>
          <ul className="infoListHolder">
            <li>&lt; 16 - Severe Thinness</li>
            <li>16-17 - Moderate Thinness</li>
            <li>17-18.5 - Mild Thinness</li>
            <li>18.5-25 - Normal</li>
            <li>25-30 - Overweight</li>
            <li>30-35 - Obese Class I</li>
            <li>35-40 - Obese Class II</li>
            <li>&gt; 40 - Obese Class III</li>
          </ul>
        </aside>

        <main className="main-content">
          <div className="calculator-container">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Height (cm)</label>
                <input type="number" placeholder="Enter your Height" name="height" value={bmiData.height} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Weight (kg)</label>
                <input type="number" placeholder="Enter your Weight" name="weight" value={bmiData.weight} onChange={handleChange} required />
              </div>
              <div className="button-group">
                <button className="calculate-btn" type="submit">Calculate</button>
                <button className="reset-btn" type="button" onClick={handleReset}>Reset</button>
              </div>
            </form>
            {bmiResult && (
              <div className="result1">
                <div className="bmi-value">{bmiResult.toFixed(1)}</div>
                <div className="bmi-category">{bmiCategory}</div>
                <div className="progress-container">
                  <div className={`progress-fill ${bmiCategory.toLowerCase()}`} style={{ width: `${progress}%` }}></div>
                </div>
                <button className="diet-btn" onClick={() => setShowModal(true)}>Get Diet Suggestions</button>
              </div>
            )}
          </div>
        </main>
      </div>
      {showModal && (
        <div className="modal-overlay1" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
            <div className="diet-suggestions">
              <h3>Diet Suggestions for {bmiCategory}</h3>
              <ul>
                {dietSuggestions[bmiCategory].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMI;
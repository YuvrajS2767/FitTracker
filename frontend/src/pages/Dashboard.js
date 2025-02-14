import { useState, useEffect } from "react";
import { getUserData } from "../utils/api";
import { Bar } from "react-chartjs-2";
import "../styles/Dashboard.css"; // Import the CSS file

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [bmiRecords, setBmiRecords] = useState([]);
  const [calorieRecords, setCalorieRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchData(storedToken);
    }
  }, []);

  const fetchData = async (token) => {
    try {
      setLoading(true);
      setError(null);

      const userResponse = await getUserData(token);
      setBmiRecords(userResponse.user.bmiRecords || []);
      setCalorieRecords(userResponse.user.calorieRecords || []);
    } catch (error) {
      setError("Failed to fetch dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // BMI Chart Data
  const bmiChartData = {
    labels: bmiRecords.map((record) => new Date(record.date).toLocaleDateString()),
    datasets: [
      {
        label: "BMI",
        data: bmiRecords.map((record) => record.bmi),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // Calorie Chart Data
  const calorieChartData = {
    labels: calorieRecords.map((record) => new Date(record.date).toLocaleDateString()),
    datasets: [
      {
        label: "Calories",
        data: calorieRecords.map((record) => record.calories),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">User Dashboard</h2>

      {loading && <p className="dashboard-loading">Loading...</p>}
      {error && <p className="dashboard-error">{error}</p>}

      {/* BMI Records */}
      <section className="dashboard-section">
        <h3>BMI Records</h3>
        {bmiRecords.length > 0 ? (
          <ul className="dashboard-list">
            {bmiRecords.map((record) => (
              <li key={record._id} className="dashboard-list-item">
                <strong>Date:</strong> {new Date(record.date).toLocaleDateString()} <br />
                <strong>Height:</strong> {record.height} cm <br />
                <strong>Weight:</strong> {record.weight} kg <br />
                <strong>BMI:</strong> {record.bmi}
              </li>
            ))}
          </ul>
        ) : (
          <p className="dashboard-empty">No BMI records found.</p>
        )}
      </section>

      {/* BMI Bar Chart */}
      {bmiRecords.length > 0 && (
        <section className="dashboard-chart">
          <h3>BMI Chart</h3>
          <Bar data={bmiChartData} />
        </section>
      )}

      {/* Calorie Records */}
      <section className="dashboard-section">
        <h3>Daily Calorie Records</h3>
        {calorieRecords.length > 0 ? (
          <ul className="dashboard-list">
            {calorieRecords.map((record) => (
              <li key={record._id} className="dashboard-list-item">
                <strong>Date:</strong> {new Date(record.date).toLocaleDateString()} <br />
                <strong>Calories:</strong> {record.calories} kcal
              </li>
            ))}
          </ul>
        ) : (
          <p className="dashboard-empty">No calorie records found.</p>
        )}
      </section>

      {/* Calorie Bar Chart */}
      {calorieRecords.length > 0 && (
        <section className="dashboard-chart">
          <h3>Calorie Chart</h3>
          <Bar data={calorieChartData} />
        </section>
      )}
    </div>
  );
};

export default Dashboard;

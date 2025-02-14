import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Auth Endpoints
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);

// ✅ User Profile
export const getUserData = async (token) => {
  try {
    const response = await api.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("User Data:", response.data); // ✅ Debugging log
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error.response?.data || error.message);
    throw error;
  }
};

export const updateProfile = (userData, token) =>
  api.put("/auth/update-profile", userData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ✅ Nutrition Data
export const fetchNutrition = (food) => api.post("/food/nutrition", { food });

// ✅ BMI Endpoints
export const calculateBMI = async (data, token) => {
  try {
    const response = await api.post("/bmi/calculate", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("BMI Calculation Response:", response.data); // ✅ Debugging log
    return response.data;
  } catch (error) {
    console.error("Error calculating BMI:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserBMI = async (token) => {
  try {
    const response = await api.get("/bmi/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("BMI Data:", response.data); // ✅ Debugging log
    return response.data.bmiRecords || [];
  } catch (error) {
    console.error("Error fetching BMI data:", error.response?.data || error.message);
    return []; // Return empty array to prevent undefined errors in components
  }
};

// ✅ Calorie Endpoints
export const saveDailyCalories = async (data, token) => {
  try {
    const response = await api.post("/calories/save", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Calorie Save Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving calorie data:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserCaloricNeeds = async (token) => {
  try {
    const response = await api.get("/calories/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Caloric Needs Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching caloric needs:", error.response?.data || error.message);
    return null;
  }
};

export const calculateCalories = async (data, token) => {
  try {
    const response = await api.post("/calories/calculate", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Calorie Calculation Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error calculating calories:", error.response?.data || error.message);
    throw error;
  }
};

export default api;

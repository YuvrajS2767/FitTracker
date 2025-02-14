import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Nutrition from "./pages/Nutrition";
import BMI from "./pages/BMI";
import Calorie from "./pages/Calorie";
import Profile from "./pages/Profile";
import Home from "./pages/Home";



const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/calorie" element={<Calorie />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

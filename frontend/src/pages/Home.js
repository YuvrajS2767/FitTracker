import { Link } from "react-router-dom";
import Nutrition from "../pages/Nutrition"; // Your existing Nutrition component
import "../styles/Home.css"; // Ensure this matches your CSS file location


const Home = () => {
  return (
<div className="main">
{/* Header Section */}
      <div className="header-container">
        <header>
          <img src="logoBhau.png" alt="Logo" className="logo" />
          <div className="headerBtns">
            <Link to="/login" className="signinHLink">Sign-in</Link>
            <Link to="/register" className="registerBtnHLink">Register</Link>
            <Link to="/dashboard" className="signinHLink">Dashboard</Link>
            <Link to="/profile" className="signinHLink">Profile</Link>
          </div>
        </header>
      </div>

      {/* Slogan Section */}
      <div className="slogan-heading-container">
        <h1>A better way to track your nutrition</h1>
      </div>

      {/* Nutrition Component */}
      <div className="main-container">
          <Nutrition />
        </div>

      {/* Login Call-to-Action */}
      <div className="LogInHLink-holder">
        <Link to="/login" className="LogInHLink">
          Log-in to track your progress <span className="fa fa-chevron-circle-right"></span>
        </Link>
      </div>

      {/* BMI Calculator Section */}
      <div className="BmiCalculatorSection">
        <h1 className="BmiCalculatorSection-Heading">BMI Calculator</h1>
        <div className="BmiInfoHolder">
          <div className="BmiCalculatorSection-inner1">
            <div className="bmiLogosHolder">
              <img src="bmicalclogo2.PNG" alt="BMI Logo" className="bmiLogo1" />
            </div>
            <p className="BmiDefinition">
              BMI is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy body weight for their height.
            </p>
          </div>
          <div className="BmiCalculatorSection-inner2">
            <p className="bmiCalcDefinition" align="justify">
              A BMI (Body Mass Index) calculator is a tool used to determine if a person has a healthy body weight for a given height. It works by taking the individual's weight and height, and then using the following formula:
              <br />
              <u className="bmi-formula">BMI = weight (kg) / height (m)<sup>2</sup></u>
            </p>
            <div className="bmiLogosHolder">
              <img src="graph2.PNG" alt="Graph" className="bmiLogo2" />
            </div>
          </div>
        </div>
        <div className="BmiCalcButtonHolder">
          <Link to="/bmi">
            <button className="BmiCalcButton">BMI Calculator</button>
          </Link>
        </div>
      </div>
      <div className="BmiCalcToCalorieCalcDivider2"></div>


      {/* Calorie Calculator Section */}
      <div className="CalorieCalculatorSection">
        <h1 className="CalorieCalculatorSection-Heading">Calorie Calculator</h1>
        <div className="CalorieInfoHolder">
          <div className="CalorieCalculatorSection-inner1">
            <div className="CalorieCalcLogoHolder">
              <img src="calorieLogo.png" alt="Calorie Logo" className="CalorieLogo1" />
            </div>
            <p className="CalorieDefinition">
              A calorie is a unit of measurement for energy. In terms of nutrition and diet, calories measure the amount of energy that food provides when consumed. The body uses this energy to fuel various functions like breathing, moving, and maintaining body temperature.
            </p>
          </div>
          <div className="CalorieCalculatorSection-inner2">
            <p className="calorieCalcDefinition">
              A calorie calculator is a tool that helps you estimate the number of calories you need to consume each day to maintain, lose, or gain weight, based on various factors such as age, gender, weight, height, and activity level.
            </p>
            <div className="CalorieCalcLogoHolder">
              <img src="calories-calculator.png" alt="Calorie Calculator" className="CalorieLogo2" />
            </div>
          </div>
        </div>
        <div className="CalorieCalcButtonHolder">
          <Link to="/calorie">
            <button className="CalorieCalcButton">Calorie Calculator</button>
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <footer>
  <div className="footer-container">
    <div className="footer-section">
      <h3>Contact Us</h3>
      <p>Email: info@example.com</p>
      <p>Phone: (123) 456-7890</p>
    </div>
    <div className="footer-section">
      <h3>Follow Us</h3>
      <Link to="/twitter" className="social-icon">Twitter</Link>
      <Link to="/instagram" className="social-icon">Instagram</Link>
    </div>
    <div className="footer-section">
      <h3>Quick Links</h3>
      <Link to="/about">About Us</Link>
      <Link to="/services">Services</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; 2025 FITTRACKER. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
};

export default Home;

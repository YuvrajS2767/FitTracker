import { useState, useEffect, useContext } from "react";
import { getUserData, updateProfile } from "../utils/api";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/Profile.css"; // Import CSS

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await getUserData(token);
        setUser(response.user);
        setName(response.user.name || "");
        setEmail(response.user.email || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const token = localStorage.getItem("token");

    const updatedData = { name, email };
    if (password) updatedData.password = password;

    try {
      const response = await updateProfile(updatedData, token);

      if (response && response.message) {
        setMessage(response.message);
      } else {
        setMessage("Profile updated successfully!");
      }

      setError("");
      setPassword(""); // Clear password field after update

      localStorage.setItem("user", JSON.stringify({ ...user, name, email }));

      setTimeout(() => setMessage(""), 5000); // Show message for 5s
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to update profile.";
      setError(errorMsg);
      setMessage("");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>User Profile</h2>

        {user ? (
          <form className="profile-form" onSubmit={handleUpdate}>
            <div className="input-group">
              <label>Name:</label>
              <input
                type="text"
                placeholder="Leave blank to keep current Name"

                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>New Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
              />
            </div>

            <button type="submit" className="update-btn">Update Profile</button>
          </form>
        ) : (
          <p>Loading profile...</p>
        )}

        {/* ✅ Show success or error messages */}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

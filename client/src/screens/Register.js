import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Snackbar, Slide } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import Footer from "../components/Footer"; 
import { Link } from 'react-router-dom';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSnackbarMessage("");
    setSnackbarType("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setSnackbarType("error");
      setSnackbarMessage("Passwords do not match");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contact_number: formData.phone,
      });

      setSnackbarType("success");
      setSnackbarMessage(response.data.message || "You registered successfully.");

      setOpenSnackbar(true);

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        document.title = "Login - Your Website"; // Update the browser tab title
        navigate("/login"); // Navigate to login page
      }, 3000);
    } catch (error) {
      setSnackbarType("error");
      setSnackbarMessage(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
    setLoading(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSocialRegister = (provider) => {
    const url = `http://localhost:8000/api/users/auth/${provider}`;
    window.location.href = url;
  };

  const TransitionUp = (props) => {
    return <Slide {...props} direction="up" />;
  };

  return (
    <>
      <div style={{ display: "flex", height: "90vh", backgroundColor: "rgba(240,240,240,1)" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(240,240,240,1)" }}>
            <div>
              <img
                src="https://i.postimg.cc/2SvZHdSB/flowers-1854075-1280.jpg"
                alt="Slide 1"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
            <div style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
              <div style={{ fontSize: "30px", color: "black", marginBottom: "10px" }}>★</div>
              <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "5px" }}>Welcome to our website!</h2>
              <p style={{ color: "#6b6b6b", fontSize: "16px", marginBottom: "10px" }}>Please enter your details</p>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", margin: "5px 0", border: "1px solid #ddd", borderRadius: "5px", fontSize: "16px" }}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", margin: "5px 0", border: "1px solid #ddd", borderRadius: "5px", fontSize: "16px" }}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  style={{ width: "100%", padding: "10px", margin: "5px 0", border: "1px solid #ddd", borderRadius: "5px", fontSize: "16px" }} 
                  required 
                  />
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", margin: "5px 0", border: "1px solid #ddd", borderRadius: "5px", fontSize: "16px" }}
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#888" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px", margin: "5px 0", border: "1px solid #ddd", borderRadius: "5px", fontSize: "16px" }}
                    required
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#888" }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "14px",
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "15px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    transition: "transform 0.2s, background-color 0.3s",
                  }}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Sign Up"}
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialRegister("google")}
                  style={{
                    width: "100%",
                    padding: "14px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    border: "1px solid #4285F4", // Google blue
                    backgroundColor: "white",
                    color: "#4285F4", // Google blue
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    gap: "10px",
                  }}
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                    style={{ height: "20px", marginRight: "8px" }}
                  />
                  Sign Up with Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialRegister("facebook")}
                  style={{
                    width: "100%",
                    padding: "14px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    border: "1px solid #1877F2", // Facebook blue
                    backgroundColor: "#1877F2",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    gap: "10px",
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                    alt="Facebook"
                    style={{ height: "20px", marginRight: "8px" }}
                  />
                  Sign Up with Facebook
                </button>
              </form>
              <p style={{ color: "#6b6b6b", fontSize: "14px", textDecoration: "none", marginTop: "10px" }}>
                Already have an account? <Link to="/login" style={{ color: "#007bff" }}>Login</Link>
              </p>
            </div>
          </div>
        </div>
    </>
  );
};

export default Signup;

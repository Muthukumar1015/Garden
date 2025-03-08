import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice"; // Redux action
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Google OAuth component
import "../styles/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state for authentication
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send OTP function
  const handleSendOTP = async () => {
    if (!formData.email || !formData.password) {
      setMessage("Please enter your email and password first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/send-login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setOtpSent(true);
        setMessage("OTP sent to your email. Please enter it below.");
      } else {
        setMessage("Failed to send OTP. Try again.");
      }
    } catch (error) {
      setMessage("Error sending OTP. Please try again.");
    }
  };

  // Handle login function (calls Redux action)
  const handleLogin = (e) => {
    e.preventDefault();

    if (!otpSent) {
      setMessage("Please send OTP first.");
      return;
    }

    if (!formData.otp) {
      setMessage("Please enter the OTP sent to your email.");
      return;
    }

    // Check if the user is registered before attempting login
    fetch("http://localhost:5000/api/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isRegistered) {
          // Proceed with login if user is registered
          dispatch(loginUser(formData)); // Call Redux action
        } else {
          setMessage("You need to register first.");
        }
      })
      .catch((error) => {
        setMessage("Error checking registration status.");
      });
  };

 
  const handleGoogleLoginSuccess = (response) => {
    const token = response.credential; 

 
    fetch("http://localhost:5000/api/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(loginUser(data.user)); 
          navigate("/"); // Redirect to home
        } else {
          setMessage("Google login failed.");
        }
      })
      .catch((error) => {
        setMessage("Error during Google login.");
      });
  };


  if (user) {
    navigate("/");
  }

  return (
    <div className="login-container">
      <h2>Login</h2>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="button"
          className="otp-button"
          onClick={handleSendOTP}
          disabled={otpSent}
        >
          {otpSent ? "OTP Sent" : "Send OTP"}
        </button>

        {otpSent && (
          <>
            <p className="message">Please enter the OTP sent to your email.</p>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit" className="login-button" disabled={loading || !otpSent}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

     
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => setMessage("Google login failed. Please try again.")}
        useOneTap
      />

      <button className="back-home-button" onClick={() => navigate("/")}>
        Back to Home
      </button>

      <div>
        <p className="Contect">
          Don't have an account?{" "}
          <button onClick={() => navigate("/register")}>Register here</button>
        </p>
      </div>
    </div>
  );
};

export default Login;

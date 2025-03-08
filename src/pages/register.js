import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { loading, error } = useSelector((state) => state.auth);

   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      otp: "",
   });

   const [otpSent, setOtpSent] = useState(false);
   const [message, setMessage] = useState("");

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

  
   const handleSendOTP = async () => {
      if (!formData.phone || formData.phone.length < 10) {
         setMessage("Enter a valid phone number.");
         return;
      }

      try {
         const response = await fetch("http://localhost:5000/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: formData.phone }),
         });

         if (response.ok) {
            setOtpSent(true);
            setMessage("OTP sent successfully! Enter OTP below.");
         } else {
            setMessage("Failed to send OTP. Try again.");
         }
      } catch (error) {
         setMessage("Error sending OTP. Please try again.");
      }
   };

  
   const handleRegister = (e) => {
      e.preventDefault();

    
      if (formData.password !== formData.confirmPassword) {
         setMessage("Passwords do not match.");
         return;
      }

     
      dispatch(registerUser(formData));

      
      navigate("/login");
   };

   return (
      <div className="register-container">
         <h2>Register</h2>

         {error && <p className="error-message">{error}</p>}
         {message && <p className="message">{message}</p>}

         <form onSubmit={handleRegister}>
            <div className="form-group">
               <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
               />
               <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
               />
            </div>
            <input
               type="email"
               name="email"
               placeholder="Email"
               value={formData.email}
               onChange={handleChange}
               required
            />
            <div className="form-group">
               <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
               />
               <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
               />
            </div>
            <div className="form-group">
               <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
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
            </div>

            {otpSent && (
               <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  required
               />
            )}

            <button
               type="submit"
               className="register-button"
               disabled={loading}
            >
               {loading ? "Registering..." : "Register"}
            </button>
         </form>

         <button className="back-home-button" onClick={() => navigate("/")}>
            Back to Home
         </button>

         <div>
            <p className="Contect">
               Already have an account?{" "}
               <button onClick={() => navigate("/login")}>Login here</button>
            </p>
         </div>
      </div>
   );
};

export default Register;

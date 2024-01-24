import React, { useState } from "react";
import "animate.css";
import "./Loginform.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5555/users/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      console.log(user);
      console.log("Login successful:", response.data.message);

      dispatch(setUser(user));

      // Check if payment is verified
      if (user.isPaymentVerified) {
        // If payment is verified, navigate to the dashboard
        navigate("/dashboard");
      } else {
        // If payment is not verified, navigate to the subscription page
        navigate("/subscription");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <div className="animate__animated animate__fadeInLeft animate__slow">
        <h1 className="foodocityanimation">Foodocity</h1>
      </div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            Show Password
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;

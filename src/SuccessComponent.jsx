import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "./store/userSlice";

function SuccessComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const src1 = "/FoodocityLogo.jpg";
  const logoStyle = {
    marginBottom: "20px",
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserFromLocalStorage = async () => {
      // Retrieve user from local storage
      const storedUser = JSON.parse(localStorage.getItem("user"));

      console.log(storedUser);
      if (storedUser) {
        // Update Redux state with the stored user
        dispatch(setUser(storedUser));

        // Send verification request
        sendVerificationRequest(storedUser._id);
      } else {
        console.error("User not found in local storage");
        setLoading(false);
      }
    };

    const sendVerificationRequest = async (userId) => {
      console.log("request sent");

      try {
        const response = await fetch(
          "http://localhost:5555/users/verify-user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("User verification request sent successfully");

          // Update Redux state with the received user object
          dispatch(setUser(data.user));

          // Check if payment is verified in the received user object
          if (data.user.isPaymentVerified) {
            console.log("Payment is verified. Redirecting to Dashboard...");

            // Introduce a delay of 2 seconds before redirecting
            setTimeout(() => {
              navigate("/dashboard");
            }, 4000);
          } else {
            console.log("Payment is not verified.");
          }
        } else {
          console.error("Failed to send user verification request");
        }
      } catch (error) {
        console.error("Error sending user verification request:", error);
      } finally {
        setLoading(false);
      }
    };

    // Get user from local storage and send verification request
    getUserFromLocalStorage();
  }, [dispatch, navigate]);

  const containerStyle = {
    textAlign: "center",
  };

  const svgStyle = {
    width: "64px",
    height: "64px",
    fill: "#0074ff",
    marginTop: "200px",
  };

  const h1Style = {
    marginTop: "200px",
    fontFamily: "Monsterat, sans-serif",
    color: "grey",
  };

  const loadingStyle = {
    marginTop: "200px",
    fontFamily: "Monsterat, sans-serif",
    color: "grey",
  };

  const h3Style = {
    marginTop: "10px",
    fontFamily: "Monsterat, sans-serif",
  };

  return (
    <div style={containerStyle}>
      {loading ? (
        <div>
          <img
            src={src1}
            style={logoStyle}
            className="logo"
            alt="Foodocity Logo"
          />
          <h1 style={h1Style}>Payment Successful!</h1>
          <h3 style={h3Style}>You are being redirected to Dashboard</h3>{" "}
          <div style={{ padding: "20px 250px" }}>
            <LinearProgress />
          </div>
        </div>
      ) : (
        <div>
          <img
            src={src1}
            style={logoStyle}
            className="logo"
            alt="Foodocity Logo"
          />
          <h1 style={h1Style}>Payment Successful!</h1>
          <h3 style={h3Style}>You are being redirected to Dashboard</h3>{" "}
          <div style={{ padding: "20px 250px" }}>
            <LinearProgress />
          </div>
        </div>
      )}
    </div>
  );
}

export default SuccessComponent;

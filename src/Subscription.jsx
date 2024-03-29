import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";

const SubscriptionComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const src1 = "/FoodocityLogo.jpg";

  const itemStyle = {
    width: "300px",
    height: "310px",
    backgroundColor: "#fff",
    margin: "60px",
    borderRadius: "5px",
    textAlign: "center",
    border: "2px solid lightgrey",
  };

  // const HeadingStyle = {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   minHeight: "100vh",
  //   transition: "box-shadow 0.3s ease-in-out",
  //   fontFamily: "Monsterat, sans-serif",
  // };

  const containerStyle = {
    display: "flex",
    flexDirection: "column", // Change to column
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "Monsterat, sans-serif",
  };

  const rowContainerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };

  const handleHover = (e) => {
    e.target.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0)";
  };

  const handleLeave = (e) => {
    e.target.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0)";
  };
  const logoStyle = {
    marginBottom: "20px",
  };

  const makePayment = async (paymentAmount) => {
    const stripe = await loadStripe(
      "pk_test_51Obp44KAlnAzxnFUz8GK3HrpVPY0RkdVZQlKOn7tYAuf5t6LmioU2tdpYEy44MfglP2c4ih8yUiOmOdwJIgLfD7K00s65yhj9D"
    );

    const body = {
      paymentAmount: paymentAmount, // Include the payment amount in the request body
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      console.log("User from Redux store:", user);
      localStorage.setItem("user", JSON.stringify(user));

      const response = await fetch("http://localhost:5555/users/payment", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      console.log(response); // Add this line to inspect the response

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.session.id,
      });
    } catch (error) {
      console.error("Error making payment:", error);
      // Handle errors as needed
    }
  };

  const BuyerHandler = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser._id;

    try {
      const response = await fetch(
        "http://localhost:5555/users/make-user-buyer",
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
        console.log("User is now a buyer", data);

        // Assuming you want to update the local user object as well
        const updatedUser = { ...storedUser, userType: "buyer" };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        console.error("Failed to make the user a buyer");
      }
    } catch (error) {
      console.error("Error making user a buyer:", error);
    }
  };

  return (
    <div
      style={containerStyle}
      onMouseOver={handleHover}
      onMouseOut={handleLeave}
    >
      <img src={src1} style={logoStyle} className="logo" alt="Foodocity Logo" />

      <div>
        <h1
          style={{
            color: "black",
            margin: "50px 0",
            border: "2px solid lightgrey",
            padding: "5px 20px",
            borderRadius: "25px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.4)",
          }}
        >
          Choose a Subscription Plan
        </h1>
      </div>

      <div style={rowContainerStyle}>
        <div style={itemStyle}>
          <div
            style={{
              background: "#DE046E",
              borderRadius: "25px 25px 0 0",
              width: "150px", // Adjust the width as needed
              margin: "0 auto", // Center horizontally
              marginTop: "-76px",
              color: "white",
              padding: "10px",
            }}
          >
            <h1>Basic</h1>
          </div>

          <div style={{ padding: "0 30px", marginTop: "20px" }}>
            <h2>1500 Pkr</h2>
          </div>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f0f0f0",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#DE046E"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p style={{ padding: "10px", flex: 1 }}>
                Continuous Access for a Month
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                background: "#f0f0f0",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#DE046E"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p style={{ padding: "10px" }}>Flexibility and Convenience</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                background: "#f0f0f0",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#DE046E"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p style={{ padding: "10px" }}>Exclusive Benefits Included</p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                background: "#f0f0f0",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#DE046E"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p style={{ padding: "10px" }}>Mutual Value for All</p>
            </div>
          </div>
          <div>
            <button
              onClick={() => makePayment(1500)}
              style={{
                background: "#DE046E",
                color: "white",
                cursor: "pointer",
                borderRadius: "25px ",
                width: "150px", // Adjust the width as needed
                fontFamily: "Monsterat,sans-serif",
                fontWeight: "bold",
                marginTop: "0.5em",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
        <div style={itemStyle}>
          <div
            style={{
              background: "#262260",
              borderRadius: "25px 25px 0 0",
              width: "195px", // Adjust the width as needed
              margin: "0 auto", // Center horizontally
              marginTop: "-76px",
              color: "white",
              padding: "10px 20px",
              textAlign: "center", // Center the text horizontally
            }}
          >
            <h1>Premium</h1>
          </div>
          <div style={{ padding: "0 30px", marginTop: "20px" }}>
            <h2>6000 Pkr</h2>
          </div>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                background: "#f0f0f0",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#262260"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p style={{ padding: "10px" }}>6-Month Continuous Access</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                background: "#f0f0f0",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#262260"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p style={{ background: "#f0f0f0", padding: "10px" }}>
                Flexible and Convenient Plan
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                background: "#f0f0f0",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#262260"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p style={{ padding: "10px" }}>Exclusive Benefits Included</p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                background: "#f0f0f0",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#262260"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p style={{ padding: "10px" }}>Mutual Value for All</p>
            </div>
          </div>
          <div>
            <button
              onClick={() => makePayment(6000)} // Pass payment amount as parameter
              style={{
                background: "#262260",
                color: "white",
                cursor: "pointer",
                borderRadius: "25px ",
                width: "150px", // Adjust the width as needed
                fontFamily: "Monsterat,sans-serif",
                fontWeight: "bold",
                marginTop: "0.5em",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
        <div style={itemStyle}>
          <div
            style={{
              background: "#F8B135",
              borderRadius: "25px 25px 0 0",
              width: "210px", // Adjust the width as needed
              margin: "0 auto", // Center horizontally
              marginTop: "-76px",
              color: "white",
              padding: "10px 20px",
            }}
          >
            <h1>Enterprise</h1>
          </div>
          <div style={{ padding: "0 30px", marginTop: "20px" }}>
            <h2>11,800 Pkr</h2>
          </div>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                background: "#f0f0f0",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#F8B135"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p style={{ padding: "10px" }}>1-Year Continuous Access</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                background: "#f0f0f0",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#F8B135"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p style={{ padding: "10px" }}>Flexibility and Convenience</p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                background: "#f0f0f0",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#F8B135"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p style={{ padding: "10px" }}>Exclusive Benefits Included</p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                background: "#f0f0f0",
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                  stroke="#F8B135"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <p style={{ padding: "10px" }}>Mutual Value for All</p>
            </div>
          </div>
          <div>
            <button
              onClick={() => makePayment(11800)} // Pass payment amount as parameter
              style={{
                background: "#F8B135",
                color: "white",
                cursor: "pointer",
                borderRadius: "25px ",
                width: "150px", // Adjust the width as needed
                fontFamily: "Monsterat,sans-serif",
                fontWeight: "bold",
                marginTop: "0.5em",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <a
          style={{ color: "gray" }}
          href="/buyer-dashboard"
          onClick={BuyerHandler}
        >
          Are you a buyer ? <span>Click here to continue</span>
        </a>
      </div>
    </div>
  );
};

export default SubscriptionComponent;

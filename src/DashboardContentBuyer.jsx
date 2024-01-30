import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DashboardContentBuyer() {
  const [userDetails, setUserDetails] = useState({});
  const [userProducts, setUserProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  //   const user = useSelector((state) => state.user); // Update with your actual Redux state structure
  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        setUserDetails(user);

        const userId = user._id;

        try {
          // Simulate a 2-second delay using setTimeout
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const response = await axios.post(
            "http://localhost:5555/users/get-user",
            { userId }
          );

          const { user, products } = response.data;

          setUserDetails(user);
          setUserProducts(products);
        } catch (error) {
          console.error("Error fetching user details: ", error);
        } finally {
          setIsLoading(false); // Set loading state to false after request completes
        }
      } else {
        console.log("User not found in local storage");
        setIsLoading(false); // Set loading state to false if user is not found
      }
    };

    fetchData();
  }, []);
  // Get the current hour to determine the time of the day
  const currentHour = new Date().getHours();

  // Define a style object for inline CSS
  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "95vh",
      fontFamily: "Montserrat, sans-serif",
    },
    greeting: {
      fontSize: "40px",
      marginBottom: "50px",
    },
    divContainer: {
      display: "flex",
      flexDirection: "row", // Change this to "row" to have divs in a row
      alignItems: "center",
      justifyContent: "center",
    },
    div: {
      flex: 1, // Make the div take up all available space
      border: "0.5px solid black",
      padding: "10px 8px",
      margin: "10px 480px", // Adjust margin as needed
      borderRadius: "8px",
      width: "450px",
      height: "300px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "#F2F3F3",
    },
    flexRow: {
      display: "flex",
      alignItems: "center",
    },
    svg: {
      width: "35px",
      height: "35px",
      marginRight: "10px",
    },
    button: {
      padding: "10px",
      fontSize: "16px",
      margin: "10px",
    },
    username: {
      textTransform: "capitalize", // Capitalize the first letter
      display: "inline-block", // Ensure gradient applies only to the username, not the entire line
      color: "#0056B3",
    },
  };

  // Determine the appropriate greeting based on the current time
  let greeting;
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const navigate = useNavigate();
  const addProductNavigate = () => {
    navigate("/add-product");
  };
  return (
    <>
      <div style={style.container}>
        <h1 style={style.greeting}>Products Available</h1>

        <div style={style.divContainer}>
          <div style={style.div}>
            <div>
              <h1 style={{ fontWeight: "normal" }}>
                {userProducts.length === 0 ? "" : "My Products"}
              </h1>
            </div>
            <div style={{ ...style.flexRow, justifyContent: "center" }}>
              {isLoading ? (
                <div>
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <h1 style={{ margin: "10px 10px", fontSize: "50px" }}>
                    {userProducts.length === 0
                      ? "No products added"
                      : `${userProducts.length} `}
                  </h1>
                  <svg
                    width="50px"
                    height="50px"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--emojione"
                    preserveAspectRatio="xMidYMid meet"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M7.6 20.4c1.8 2.9 3.8 3.3 5.2 1.6c2.2-2.6-.2-5.9-2.8-6.8c-4.3-1.7-8 3.1-8 3.1s4.1-.4 5.6 2.1"
                        fill="#f29a2e"
                      ></path>
                      <path
                        d="M42.8 10.2c-7.7 4.5-1.3 15.3-15.2 18.2l14.8 7.3c3 5.2 11.3 5.6 11.3 5.6s2.1-6.2.4-10.8c4.6 0 7.8-2.8 7.8-2.8s-2.6-9.2-10.5-9.2c7.8-3.2 9.2-9.8 9.2-9.8s-6.9-4.8-17.8 1.5"
                        fill="#e1eaf2"
                      ></path>
                      <path
                        d="M35.7 62H21.4c0-1.2 8.4-1.4 8.8-9.4c1.3 8.9 5.5 8.2 5.5 9.4"
                        fill="#f4bc58"
                      ></path>
                      <g fill="#d1dce6">
                        <path d="M49.4 30.6c0 11.5-9.4 23.3-21 23.3s-21-11.8-21-23.3c0-7.7 16.6-2.3 21-2.3c11.6-.1 21-9.3 21 2.3"></path>
                        <path d="M36.4 49.2c0 2.3-3.3 7.3-6.2 7.3c-2.9 0-6.2-3.4-6.2-5.7c0-2.3 12.4-2.7 12.4-1.6"></path>
                      </g>
                      <path d="M6.5 26.3c0 3 .6 11.7.6 11.7l2.7-3.4l3.2 3.8l.7-5.3l4.9 3.5l-.9-5.2l5.9.6l-2.7-3.2l4.1-2.7s-5 1.1-4.9-2c.1-3.1 2.6-11.9-.5-13.2c-5.7-2.1-13.1 2.7-13.1 15.4"></path>
                      <g fill="#3e4347">
                        <ellipse cx="6.5" cy="16.1" rx=".7" ry=".3"></ellipse>
                        <circle cx="11.5" cy="16.7" r="1.5"></circle>
                      </g>
                      <g fill="#e24b4b">
                        <path d="M7.8 23.6c0 3.2-2.1.9-2.1.9c-.7 0-3.6 2.2-2.6-1.5c1.3-4.8 6.3-8 6.3-8s-1.6 2.8-1.6 8.6"></path>
                        <path d="M20.8 10.6V9.4c-.2-2.5 3.4-3.5 3-4.8c-.6-1.7-5.3-.6-7.6 3.1c-.3.4-.5.9-.6 1.5c-.1-.4-.2-.8-.4-1.2c-1.1-2.3 2.2-4.4 1.2-5.5c-1.3-1.5-5.2 1.1-6.1 5.4c-.2.9-.2 1.8.1 2.7c-.1-.1-.2-.2-.3-.2c-1.7-1.3 0-4-1.2-4.6c-1.8-.8-3.4 2.8-2.5 6.3c.6 2 2.8 4.1 4.6 2.4c.6-.5 2-1.3 2.8-1.6c.6-.2 2.2-.1 3.2.6c.9.6 1.6 1.8 2.9 1.8c5.7.2 8.8-5.3 6.7-6.5c-1.1-.8-2.8 1.2-5.8 1.8"></path>
                      </g>
                      <path d="M42.5 43.9c-.9-2.2-3.5-3.4-3.5-3.4c2.7-1.4 4.3-4.4 4.3-4.4c-1.4-.6-6.8-1-6.8-1c1.2-1.2 2.2-2.9 2.2-2.9s-6.2-1.5-11.4 1.3c-6.8 3.8-4.8 12.8 2.9 13.8c8.5 1.1 12.3-3.4 12.3-3.4"></path>
                    </g>
                  </svg>
                </>
              )}
            </div>
            <div>
              {/* <button style={style.button} onClick={addProductNavigate}>
              Add Products
            </button>
            <button style={style.button}>View Products</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardContentBuyer;

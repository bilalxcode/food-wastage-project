import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

function DashboardContentBuyer() {
  const [userDetails, setUserDetails] = useState({});
  const [products, setProducts] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [selectedExpiryStatus, setSelectedExpiryStatus] = useState(null); // Initialize to null
  const [cart, setCart] = useState([]); // State for cart items

  // ... (other code)
  useEffect(() => {
    // Check if cart items exist in localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Set the cart state with the retrieved items
    setCart(cartItems);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //   const user = useSelector((state) => state.user); // Update with your actual Redux state structure
  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const response = await axios.get(
            "http://localhost:5555/users/get-products"
          );

          const { products } = response.data;
          setUserDetails(user);

          // Filter products with non-null expiryStatus
          const filtered = products.filter((product) => product.expiryStatus);
          setProducts(filtered);
          setFilteredProducts(filtered); // Initialize filteredProducts with filtered products
        } catch (error) {
          console.error("Error fetching user details: ", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("User not found in local storage");
        setIsLoading(false);
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
      height: "80vh",
      fontFamily: "Montserrat, sans-serif",
      marginTop: "7em",
    },
    greeting: {
      fontSize: "40px",
      padding: "0 10em",
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
    tableContainer: {
      background: "#F2F3F3",
      marginTop: "1em",
      height: "470px", // Set a fixed height for the TableContainer
      overflowY: "auto",
      width: "1390px", // Add overflow-y property to enable vertical scrolling if needed
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

  const buyHandler = (product) => {
    // Retrieve cart items from localStorage or initialize as an empty array
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the product is already in the cart
    const productInCart = cartItems.find((item) => item._id === product._id);

    // If the product is not already in the cart, add it
    if (!productInCart) {
      // Add the product to the cartItems array
      cartItems.push(product);

      // Update the cart items in localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Update the state to trigger re-rendering and change button text
      setCart([...cartItems]);

      // Optionally, update UI or show a confirmation message
      console.log("Product added to cart:", product.name);
    }
  };

  const toggleButton = (expiryStatus) => {
    setSelectedExpiryStatus(expiryStatus);

    // Filter products based on selected expiryStatus
    let filtered;
    if (expiryStatus === "expired") {
      filtered = products.filter(
        (product) => product.expiryStatus === "expired"
      );
    } else if (expiryStatus === "soonToBeExpired") {
      filtered = products.filter(
        (product) => product.expiryStatus === "soonToBeExpired"
      );
    } else {
      // Default case, show products with non-null expiryStatus
      filtered = products.filter((product) => product.expiryStatus !== null);
    }
    setFilteredProducts(filtered);
  };
  return (
    <>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div style={style.container}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div style={{ padding: "10px 10px", maxWidth: "800px" }}>
                <Button
                  style={{
                    marginRight: "1em",
                    background:
                      selectedExpiryStatus === "expired" ? "blue" : "grey",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => toggleButton("expired")}
                >
                  Already Expired Products
                </Button>
                <Button
                  style={{
                    background:
                      selectedExpiryStatus === "soonToBeExpired"
                        ? "blue"
                        : "grey",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => toggleButton("soonToBeExpired")}
                >
                  Soon To be Expired Products
                </Button>
                {filteredProducts.length === 0 ? (
                  <div>
                    <p>No Products Listed</p>
                    <img
                      style={{ width: "50%" }}
                      src="https://img.freepik.com/free-vector/removing-goods-from-basket-refusing-purchase-changing-decision-item-deletion-emptying-trash-online-shopping-app-laptop-user-cartoon-character_335657-2566.jpg?w=740&t=st=1706637761~exp=1706638361~hmac=d748377a0127af01121d78df4d647222d246665b120905c25b027dd58ee6a9eb"
                      alt="No products"
                    />
                  </div>
                ) : (
                  <>
                    <TableContainer
                      style={style.tableContainer}
                      component={Paper}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Name
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Price
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Expiry Status
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Expiry Date
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Description
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Images
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold" }}>
                              Action
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredProducts
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((product) => (
                              <TableRow key={product._id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                  {product.expiryStatus
                                    .charAt(0)
                                    .toUpperCase() +
                                    product.expiryStatus.slice(1)}
                                </TableCell>
                                <TableCell>
                                  {new Date(
                                    product.expiryDate
                                  ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>
                                  {product.images.map((image, imageIndex) => (
                                    <div
                                      key={imageIndex}
                                      style={{
                                        flex: "0 0 calc(35% - 5px)",
                                        marginBottom: "10px",

                                        padding: "2px",
                                        borderRadius: "5px",
                                        margin: "3px",
                                      }}
                                    >
                                      <img
                                        src={`http://localhost:5555${image}`}
                                        alt={`Preview ${imageIndex + 1}`}
                                        style={{
                                          width: "150px",
                                          maxHeight: "100px",
                                          borderRadius: "1em",
                                        }}
                                      />
                                    </div>
                                  ))}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => buyHandler(product)}
                                    disabled={cart.some(
                                      (item) => item._id === product._id
                                    )}
                                    style={{
                                      width: "10px",
                                      fontSize: "8px",
                                      backgroundColor: cart.some(
                                        (item) => item._id === product._id
                                      )
                                        ? "green"
                                        : "default", // Change to your default background color
                                      color: cart.some(
                                        (item) => item._id === product._id
                                      )
                                        ? "white"
                                        : "white", // Change to your default text color
                                    }}
                                    startIcon={
                                      cart.some(
                                        (item) => item._id === product._id
                                      ) ? (
                                        <TaskAltIcon />
                                      ) : null
                                    }
                                  >
                                    {cart.some(
                                      (item) => item._id === product._id
                                    )
                                      ? null
                                      : "Add To Cart"}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[3, 6, 9]}
                      component="div"
                      count={filteredProducts.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default DashboardContentBuyer;

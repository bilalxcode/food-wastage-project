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

  // ... (other code)

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
      height: "95vh",
      fontFamily: "Montserrat, sans-serif",
      marginTop: "2em",
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
      height: "400px", // Set a fixed height for the TableContainer
      overflowY: "auto",
      width: "700px", // Add overflow-y property to enable vertical scrolling if needed
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

  const buyHandler = async (product) => {
    console.log(product);
    const stripe = await loadStripe(
      "pk_test_51Obp44KAlnAzxnFUz8GK3HrpVPY0RkdVZQlKOn7tYAuf5t6LmioU2tdpYEy44MfglP2c4ih8yUiOmOdwJIgLfD7K00s65yhj9D"
    );

    const body = {
      paymentAmount: product.price, // Include the payment amount in the request body
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch("http://localhost:5555/users/buy-product", {
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
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Expiry Status</TableCell>
                            <TableCell>Expiry Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Images</TableCell>
                            <TableCell>Action</TableCell>
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
                                        border: "2px solid lightgrey",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        padding: "2px",
                                        borderRadius: "5px",
                                        margin: "3px",
                                      }}
                                    >
                                      <img
                                        src={`http://localhost:5555${image}`}
                                        alt={`Preview ${imageIndex + 1}`}
                                        style={{
                                          width: "100%",
                                          maxHeight: "100px",
                                        }}
                                      />
                                    </div>
                                  ))}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      buyHandler(product);
                                    }}
                                  >
                                    Buy
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

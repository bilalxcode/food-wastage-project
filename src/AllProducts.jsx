//imports
import React, { useEffect, useState } from "react";

//material-ui
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Avatar,
  Button,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tab,
  Tabs,
  CircularProgress,
} from "@mui/material";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";
function AllProducts() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [editedProductName, setEditedProductName] = useState("");
  const [editedProductPrice, setEditedProductPrice] = useState("");
  const [editedProductQuantity, setEditedProductQuantity] = useState("");
  const [editedProductDescription, setEditedProductDescription] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const [userProducts, setUserProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        setUserDetails(user);

        const userId = user._id;

        // Simulate a 2-second delay before making the API request
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mocked user products data (replace this with actual API call)
        try {
          const response = await axios.post(
            "http://localhost:5555/users/get-user",
            { userId }
          );

          const { user, products } = response.data;

          setUserDetails(user);
          setUserProducts(products);
          console.log(userProducts);
        } catch (error) {
          console.error("Error fetching user details: ", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("User not found in local storage");
        setIsLoading(false); // Set loading state to false if user is not found
      }
    };

    fetchData();
  }, []);

  // ... (other methods)

  return (
    <Grid container spacing={1}>
      {/* ... (other components) */}
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <Grid item xs={12}>
          <div
            style={{
              padding: "100px 30px",
            }}
          >
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Your Products
            </Typography>{" "}
            {userProducts.length === 0 ? (
              <div>
                <p>You don't have any products.</p>
                <img
                  style={{ width: "50%" }}
                  src="https://img.freepik.com/free-vector/removing-goods-from-basket-refusing-purchase-changing-decision-item-deletion-emptying-trash-online-shopping-app-laptop-user-cartoon-character_335657-2566.jpg?w=740&t=st=1706637761~exp=1706638361~hmac=d748377a0127af01121d78df4d647222d246665b120905c25b027dd58ee6a9eb"
                ></img>
              </div>
            ) : (
              <TableContainer
                style={{ background: "#F2F3F3", marginTop: "1em" }}
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userProducts.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          {product.expiryStatus === "soonToBeExpired"
                            ? "Soon to be expired"
                            : "Already expired"}
                        </TableCell>
                        <TableCell>
                          {new Date(product.expiryDate).toLocaleDateString()}
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
                        {/* Add actions if needed */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </Grid>
      )}
      {/* Section to display user's products */}

      {/* ... (other components) */}
    </Grid>
  );
}

export default AllProducts;

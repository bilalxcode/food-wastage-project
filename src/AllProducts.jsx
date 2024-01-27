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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserDetails(user);

      // Assuming user._id is present in the user object
      const userId = user._id;

      // Mocked user products data (replace this with actual API call)
      axios
        .post("http://localhost:5555/users/get-user", { userId }) // Replace with your actual API endpoint
        .then((response) => {
          //   // Handle the updated user object from the backend
          //   const updatedUser = response.data;
          //   console.log("Updated User: ", updatedUser);
          //   // Update the state with the updated user details
          //   setUserDetails(updatedUser);
          const { user, products } = response.data;

          console.log("Updated User: ", user);
          console.log("User's Products: ", products);
          // Update the state with the updated user details
          setUserDetails(user);
          setUserProducts(products);
          console.log(userProducts);
        })
        .catch((error) => {
          console.error("Error fetching user details: ", error);
        });
    } else {
      console.log("User not found in local storage");
    }
  }, []);

  // ... (other methods)

  return (
    <Grid container spacing={1}>
      {/* ... (other components) */}

      {/* Section to display user's products */}
      <Grid item xs={12}>
        <div
          style={{
            padding: "100px 30px",
          }}
        >
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Your Products
          </Typography>{" "}
          <TableContainer
            style={{ background: "#F2F3F3", marginTop: "1em" }}
            component={Paper}
          >
            <Table>
              <ToastContainer />
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: "1em" }}>Name</TableCell>
                  <TableCell style={{ fontSize: "1em" }}>Price</TableCell>
                  <TableCell style={{ fontSize: "1em" }}>Expiry Date</TableCell>
                  <TableCell style={{ fontSize: "1em" }}>Description</TableCell>
                  <TableCell style={{ fontSize: "1em" }}>Images</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userProducts.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>

                    <TableCell>{product.price}</TableCell>
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
        </div>
      </Grid>

      {/* ... (other components) */}
    </Grid>
  );
}

export default AllProducts;

import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Label } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    expiryDate: null, // Updated to use Date object for expiryDate
    description: "",
    images: [],
    imagePreviews: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const imageFiles = event.target.files;
    const newImages = Array.from(imageFiles);
    const newPreviews = newImages.map((file) => URL.createObjectURL(file));

    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
      imagePreviews: [...prevState.imagePreviews, ...newPreviews],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData);

    if (!formData.name) {
      return toast.error("Name is required");
    }

    if (!formData.price) {
      return toast.error("Price is required");
    }

    if (!formData.expiryDate) {
      return toast.error("Expiry Date is required");
    }

    if (!formData.description) {
      return toast.error("Description is required");
    }
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      const userId = storedUser._id;

      const form = new FormData();
      form.append("name", formData.name);
      form.append("category", formData.category);
      form.append("price", formData.price);
      form.append("expiryDate", formData.expiryDate);
      form.append("description", formData.description);
      form.append("userId", userId); // Append userId to the FormData

      formData.images.forEach((image, index) => {
        form.append("images[]", image);
      });

      if (formData.images.length < 1) {
        return toast.error("Select minimum 1 image");
      }

      console.log(form);
      const response = await axios.post(
        "http://localhost:5555/users/addProduct",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setFormData({
          name: "",
          price: "",
          expiryDate: null, // Updated to use Date object for expiryDate
          description: "",
          images: [],
          imagePreviews: [],
        });

        toast.success("Product Added");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

  return (
    <>
      <Grid container spacing={3} style={{ padding: "6em 25em" }}>
        <Grid item xs={6}>
          <ToastContainer />
          <Paper
            elevation={3}
            style={{ padding: "20px", background: "#F2F3F3" }}
          >
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Add Product
            </Typography>
            <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
              <label>Name</label>

              <TextField
                style={{ margin: "0.5em 0em" }}
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <label>Price</label>

              <TextField
                style={{ margin: "0.5em 0em" }}
                fullWidth
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
              <label>Expiry Date</label>
              <input
                style={{ margin: "0.5em 0em", background: "#F2F3F3" }}
                type="date"
                name="expiryDate"
                placeholder="Expiry Date"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
              />
              <label>Description</label>

              <TextField
                fullWidth
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "10px" }}
                onClick={handleSubmit}
              >
                Add Product
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper
            elevation={3}
            style={{ padding: "20px", background: "#F2F3F3" }}
          >
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Image Preview
            </Typography>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {formData.imagePreviews &&
                formData.imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    style={{
                      width: "calc(50% - 5px)",
                      marginBottom: "10px",
                      border: "2px solid lightgrey",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "80%",
                        maxHeight: "300px",
                      }}
                    />
                  </div>
                ))}
            </div>
            <input
              multiple
              type="file"
              accept="image/*"
              name="images"
              onChange={handleImageChange}
              style={{ marginTop: "20px" }}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AddProductForm;

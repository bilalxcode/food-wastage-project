//imports
import React, { useState, useEffect } from "react";
// import DashboardContent from "./DashboardContent";
// import clsx from "clsx";
// import BikesView from "./BikesView";
// import OrdersView from "./OrdersView";
// import UsersView from "./UsersView";
// import VehicleView from "./VehicleView";
// import AddProductForm from "./AddProductForm";
// import ProductsView from "./ProductsView";
// import VideosView from "./VideosView";

//store

//material-ui
import {
  AppBar,
  CssBaseline,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Avatar,
  Card,
  CardContent,
  Grid,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import StoreIcon from "@mui/icons-material/Store";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

//hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import DashboardContent from "./DashboardContent";
import AddProductForm from "./AddProductForm";
import DashboardContentBuyer from "./DashboardContentBuyer";
import axios from "axios";
import { setUser } from "./store/userSlice";

const drawerWidth = 300;

const BuyerDashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    localStorage.getItem("selectedMenuItem") || "Dashboard"
  );
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  const [userDetails, setUserDetails] = useState({});
  const [products, setProducts] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        return navigate("/login");
      }

      if (user) {
        try {
          // Simulate a 2-second delay using setTimeout
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const response = await axios.get(
            "http://localhost:5555/users/get-products"
          );

          const { products } = response.data;
          setUserDetails(user);
          setProducts(products);
          console.log(products);
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
  const currentHour = new Date().getHours();

  let greeting;
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }
  // Get the current hour to determine the time of the day
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenuItemClick = (text) => {
    setSelectedMenuItem(text);
    localStorage.setItem("selectedMenuItem", text);

    switch (text) {
      case "Dashboard":
        navigate("/dashboard");
        break;

      //   case "Add Product":
      //     navigate("/add-product");
      //     break;
      case "View Products":
        navigate("/admin/view-products");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (open && e.target.closest(".appBar") === null) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  const logoStyle = {
    marginBottom: "20px",
  };

  const src1 = "/FoodocityLogo.jpg";

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <div
        className={clsx("appBar", {
          appBarShift: open,
        })}
      >
        <AppBar
          style={{ background: "#0056B3", fontFamily: "Monsterat, sans-serif" }}
          position="fixed"
        >
          {/* <div>
            <img
              style={{ height: "50px", width: "150px", margin: "6px 5px" }}
              src="/logo_transparent.png"
            />
          </div> */}
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx("menuButton", open && "hide")}
            ></IconButton>
            {/* <Typography
              style={{
                fontFamily: "Monsterat, sans-serif",
                fontWeight: "bold",
              }}
              variant="h6"
              noWrap
            >
              {userDetails.username}
            </Typography> */}
            {isLoading ? (
              <div>
                <CircularProgress color="success" />
              </div>
            ) : (
              <h1
                style={{ color: "black", fontFamily: "Montserrat, sans-serif" }}
              >
                {greeting}{" "}
                <span
                  style={{
                    color: "#32CD32		",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {userDetails.username}
                </span>
              </h1>
            )}
            <div style={{ marginLeft: "auto" }}>
              <svg
                width="36px"
                height="36px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  cursor: "pointer",
                  background: "#32CD32	",
                  borderRadius: "50%",
                  padding: "0.4em",
                }}
                onClick={() => {
                  handleLogout();
                }}
              >
                <path
                  d="M12 15L15 12M15 12L12 9M15 12H4M9 7.24859V7.2002C9 6.08009 9 5.51962 9.21799 5.0918C9.40973 4.71547 9.71547 4.40973 10.0918 4.21799C10.5196 4 11.0801 4 12.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H12.1969C11.079 20 10.5192 20 10.0918 19.7822C9.71547 19.5905 9.40973 19.2839 9.21799 18.9076C9 18.4798 9 17.9201 9 16.8V16.75"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {/* <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: "drawerPaper",
        }}
      >
        <div
          className="drawerHeader"
          style={{ marginTop: "20px", width: "200px" }}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            style={{
              marginLeft: "-130px",
            }}
            button
            selected={selectedMenuItem === "Dashboard"}
            onClick={() => handleMenuItemClick("Dashboard")}
          >
            <ListItemIcon>
              <DashboardIcon />
              <p>Dashboard</p>
            </ListItemIcon>
          </ListItem>
          <ListItem
            style={{
              marginLeft: "-130px",
            }}
            button
            selected={selectedMenuItem === "Add Product"}
            onClick={() => handleMenuItemClick("Add Product")}
          >
            <ListItemIcon>
              <PostAddIcon />
              <p>Add Product</p>
            </ListItemIcon>
          </ListItem>
        </List>

        <Divider />
        {/* <List style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <ListItem button key="Log Out" onClick={LogOutHandler}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>    
      </Drawer> */}
      <main
        className={clsx("content", {
          contentShift: open,
        })}
      >
        <div className="drawerHeader" />
        {selectedMenuItem === "Dashboard" && <DashboardContentBuyer />}

        {/* {selectedMenuItem === "Users" && <UsersView />}
        {selectedMenuItem === "Cars" && <VehicleView />}
        {selectedMenuItem === "Bikes" && <BikesView />}

        {selectedMenuItem === "View Products" && <ProductsView />}
        {selectedMenuItem === "Videos" && <VideosView />}
        {selectedMenuItem === "Orders" && <OrdersView />}

        {selectedMenuItem === "Log Out" && LogOutHandler} */}
      </main>
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#000000",
          textAlign: "center",
        }}
      >
        <Typography
          style={{ fontFamily: "Monsterat, sans-serif", color: "white" }}
          variant="caption"
        >
          &copy; 2024 FOODOCITY
        </Typography>
      </footer>
    </div>
  );
};

export default BuyerDashboard;

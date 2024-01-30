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

const drawerWidth = 300;

const BuyerDashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    localStorage.getItem("selectedMenuItem") || "Dashboard"
  );
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  const [userDetails, setUserDetails] = useState({});
  const [userProducts, setUserProducts] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const LogOutHandler = () => {
    console.log("logout");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("AdminLoggedIn");
    localStorage.removeItem("selectedMenuItem");
    document.cookie =
      "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // dispatch(AdminLoggedOut());

    navigate("/admin");
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
                    color: "#00FF7F	",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {userDetails.username}
                </span>
              </h1>
            )}
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

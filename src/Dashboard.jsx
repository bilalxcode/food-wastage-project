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
import LogoutIcon from "@mui/icons-material/Logout";
import LineWeightIcon from "@mui/icons-material/LineWeight";

//hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import DashboardContent from "./DashboardContent";
import AddProductForm from "./AddProductForm";
import { clearUser } from "./store/userSlice";
import AllProducts from "./AllProducts";

const drawerWidth = 300;

const Dashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    localStorage.getItem("selectedMenuItem") || "Dashboard"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  let storedUser;

  useEffect(() => {
    storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/Login");
    }
  }, []);

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
    localStorage.removeItem("user");

    document.cookie =
      "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    dispatch(clearUser());

    // dispatch(AdminLoggedOut());

    navigate("/Login");
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
            >
              <MenuIcon />
            </IconButton>
            <Typography
              style={{
                fontFamily: "Monsterat, sans-serif",
                fontWeight: "bold",
              }}
              variant="h6"
              noWrap
            >
              {selectedMenuItem === "Dashboard"
                ? "Dashboard"
                : selectedMenuItem}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
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
          <ListItem
            style={{
              marginLeft: "-130px",
            }}
            button
            selected={selectedMenuItem === "All Products"}
            onClick={() => handleMenuItemClick("All Products")}
          >
            <ListItemIcon>
              <PostAddIcon />
              <p>View Products</p>
            </ListItemIcon>
          </ListItem>
          <ListItem
            style={{
              marginLeft: "-130px",
              marginBottom: "20px",
            }}
            button
            // selected={selectedMenuItem === "Log Out"}
            onClick={() => LogOutHandler()}
          >
            <ListItemIcon>
              <LogoutIcon />
              <p>Log Out</p>
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
        </List>      */}
      </Drawer>
      <main
        className={clsx("content", {
          contentShift: open,
        })}
      >
        <div className="drawerHeader" />
        {selectedMenuItem === "Dashboard" && <DashboardContent />}
        {selectedMenuItem === "Add Product" && <AddProductForm />}
        {selectedMenuItem === "All Products" && <AllProducts />}

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
          background: "#000",
          textAlign: "center",
        }}
      >
        <Typography
          style={{ fontFamily: "Monsterat, sans-serif", color: "#fff" }}
          variant="caption"
          color="textSecondary"
        >
          &copy; 2024 FOODOCITY
        </Typography>
      </footer>
    </div>
  );
};

export default Dashboard;

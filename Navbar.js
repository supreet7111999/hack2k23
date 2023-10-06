import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import {
  removeToken,
  removeUser,
  getUser,
} from "../services/LocalStorageService";
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(getUser());

  // console.log(token, "nav me ", user);

  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken("token");
    removeUser("user");

    // setTimeout(()=>{
    navigate("/login");
    // window.location.reload();
    // },500)
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Covid-19 Statistics Management Application
            </Typography>

            <Button
              component={NavLink}
              to="/"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "#6d1b7b" : "" };
              }}
              sx={{ color: "white", textTransform: "none" }}
            >
              Home
            </Button>

            {user && user.role === "admin" && (
              <Button
                component={NavLink}
                to="/admin"
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? "#6d1b7b" : "" };
                }}
                sx={{ color: "white", textTransform: "none" }}
              >
                Admin Dashboard
              </Button>
            )}

            {user && user.role === "user" && (
              <Button
                component={NavLink}
                to="/user"
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? "#6d1b7b" : "" };
                }}
                sx={{ color: "white", textTransform: "none" }}
              >
                User Dashboard
              </Button>
            )}

            {!user || user.role === "" ? (
              <Button
                component={NavLink}
                to="/login"
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? "#6d1b7b" : "" };
                }}
                sx={{ color: "white", textTransform: "none" }}
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={() => handleLogout()}
                sx={{ color: "white", textTransform: "none" }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;

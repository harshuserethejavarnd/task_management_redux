import React, { useState, useContext } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../Sidebar";

const drawerWidth = 240;

const SideBarMenu = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);



  const listItems = [
    { title: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { title: "My Tasks", path: "/tasks", icon: <AssignmentIcon /> },
  ];

  const drawerContent = (
   <><Sidebar /></>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ display: isMobile ? "block" : "none", backgroundColor: "#fff" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2, color: "#000" }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ color: "#000", width: "80vw" }}>
              <TextField
                id="input-with-icon-textfield"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
                size="small"
                placeholder="Search"
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default SideBarMenu;

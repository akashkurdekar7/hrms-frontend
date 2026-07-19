import {
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {Dashboard, People, Apartment, Logout} from "@mui/icons-material";

import {NavLink} from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}>
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          HRMS
        </Typography>
      </Toolbar>

      <List>
        <ListItemButton component={NavLink} to="/dashboard">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>

          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/employees">
          <ListItemIcon>
            <People />
          </ListItemIcon>

          <ListItemText primary="Employees" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/departments">
          <ListItemIcon>
            <Apartment />
          </ListItemIcon>

          <ListItemText primary="Departments" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;

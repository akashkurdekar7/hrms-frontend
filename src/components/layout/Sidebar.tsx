import {
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";

import {
  Dashboard,
  People,
  Apartment,
  Logout,
} from "@mui/icons-material";

import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 260;

const navItems = [
  { label: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { label: "Employees", icon: <People />, path: "/employees" },
  { label: "Departments", icon: <Apartment />, path: "/departments" },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
        },
      }}>
      {/* Logo area */}
      <Toolbar sx={{ py: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: "1rem",
            }}>
            HR
          </Box>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              background: "linear-gradient(135deg, #818cf8, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}>
            HRMS Pro
          </Typography>
        </Box>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      {/* Nav items */}
      <List sx={{ px: 1.5, mt: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              sx={{
                borderRadius: "10px",
                mb: 0.5,
                py: 1.2,
                transition: "all 0.2s ease",
                backgroundColor: isActive
                  ? "rgba(99, 102, 241, 0.15)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive
                    ? "rgba(99, 102, 241, 0.2)"
                    : "rgba(255,255,255,0.06)",
                },
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActive ? "#818cf8" : "#94a3b8",
                }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#e2e8f0" : "#94a3b8",
                }}
              />
              {isActive && (
                <Box
                  sx={{
                    width: 4,
                    height: 20,
                    borderRadius: 2,
                    background:
                      "linear-gradient(180deg, #6366f1, #0ea5e9)",
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      {/* Logout — pushed to bottom */}
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
      <List sx={{ px: 1.5, pb: 2 }}>
        <ListItemButton
          onClick={logout}
          sx={{
            borderRadius: "10px",
            py: 1.2,
            "&:hover": {
              backgroundColor: "rgba(239, 68, 68, 0.12)",
            },
          }}>
          <ListItemIcon sx={{ minWidth: 40, color: "#f87171" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: "0.9rem",
              color: "#f87171",
              fontWeight: 500,
            }}
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;

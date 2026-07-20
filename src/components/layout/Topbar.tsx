import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Tooltip,
  Badge,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", cursor: "pointer" }}>
            Search employees, departments...
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Notifications">
            <IconButton size="small">
              <Badge badgeContent={3} color="error" variant="dot">
                <NotificationsNoneIcon sx={{ color: "text.secondary" }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <Avatar
              sx={{
                width: 34,
                height: 34,
                background:
                  "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                ml: 1,
              }}>
              A
            </Avatar>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

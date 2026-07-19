import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

const Topbar = () => {
  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{flexGrow: 1}}>
          Employee Management System
        </Typography>

        <IconButton>
          <NotificationsIcon />
        </IconButton>

        <Box sx={{ml: 2}}>
          <Avatar>A</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

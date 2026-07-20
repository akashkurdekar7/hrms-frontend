import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Box } from "@mui/material";

const DRAWER_WIDTH = 260;

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "background.default",
          minHeight: "100vh",
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
        }}>
        <Topbar />

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;

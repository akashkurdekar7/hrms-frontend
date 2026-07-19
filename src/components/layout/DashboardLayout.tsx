import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {Box} from "@mui/material";

const DashboardLayout = () => {
  return (
    <Box sx={{display: "flex"}}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f5f6fa",
          minHeight: "100vh",
        }}>
        <Topbar />

        <Box sx={{p: 3}}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;

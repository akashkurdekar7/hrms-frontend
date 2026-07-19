import {Typography} from "@mui/material";
import DashboardCards from "./components/DashboardCards";

const DashboardPage = () => {
  return (
    <>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      <DashboardCards />
    </>
  );
};

export default DashboardPage;

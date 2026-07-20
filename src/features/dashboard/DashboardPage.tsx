import { Typography, Box } from "@mui/material";
import DashboardCards from "./components/DashboardCards";

const DashboardPage = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Overview of your workforce metrics
      </Typography>

      <DashboardCards />
    </Box>
  );
};

export default DashboardPage;

import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import {
  People,
  Apartment,
  CurrencyRupee,
  TrendingUp,
} from "@mui/icons-material";
import { dashboardApi, type DashboardData } from "../../../services/dashboardApi";

const iconWrapperStyles = (gradient: string) => ({
  width: 48,
  height: 48,
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: gradient,
  color: "#fff",
  mb: 2,
});

const DashboardCards = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi
      .get()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      title: "Total Employees",
      value: data?.totalEmployees ?? 0,
      icon: <People />,
      gradient: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
    },
    {
      title: "Departments",
      value: data?.totalDepartments ?? 0,
      icon: <Apartment />,
      gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    },
    {
      title: "Avg. Salary",
      value: `₹${(data?.averageSalary ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      icon: <CurrencyRupee />,
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    },
    {
      title: "Highest Salary",
      value: `₹${(data?.highestSalary ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      icon: <TrendingUp />,
      gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.title}>
          <Card elevation={0}>
            <CardContent sx={{ p: 3 }}>
              {loading ? (
                <>
                  <Skeleton variant="rounded" width={48} height={48} sx={{ mb: 2 }} />
                  <Skeleton width="60%" height={16} sx={{ mb: 1 }} />
                  <Skeleton width="40%" height={32} />
                </>
              ) : (
                <>
                  <Box sx={iconWrapperStyles(card.gradient)}>
                    {card.icon}
                  </Box>

                  <Typography variant="subtitle2">
                    {card.title}
                  </Typography>

                  <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 700 }}>
                    {card.value}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;

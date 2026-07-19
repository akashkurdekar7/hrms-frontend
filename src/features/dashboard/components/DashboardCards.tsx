import {Grid, Card, CardContent, Typography} from "@mui/material";
import {
  People,
  Apartment,
  CurrencyRupee,
  TrendingUp,
} from "@mui/icons-material";

const cards = [
  {
    title: "Employees",
    value: 0,
    icon: <People fontSize="large" color="primary" />,
  },
  {
    title: "Departments",
    value: 0,
    icon: <Apartment fontSize="large" color="success" />,
  },
  {
    title: "Average Salary",
    value: "₹0",
    icon: <CurrencyRupee fontSize="large" color="warning" />,
  },
  {
    title: "Highest Salary",
    value: "₹0",
    icon: <TrendingUp fontSize="large" color="error" />,
  },
];

const DashboardCards = () => {
  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid size={{xs: 12, sm: 6, md: 3}} key={card.title}>
          <Card elevation={3}>
            <CardContent>
              {card.icon}

              <Typography variant="subtitle2" sx={{mt: 2}}>
                {card.title}
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;

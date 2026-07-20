import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const cards = [
  {
    title: "React 19",
    description:
      "Builds the UI with a modern frontend library that is fast, composable, and easy to maintain.",
  },
  {
    title: "Vite",
    description:
      "Provides super-fast development starts, instant HMR, and optimized production builds.",
  },
  {
    title: "MUI",
    description:
      "Offers a consistent design system with ready-made components like buttons, dialogs, and data grids.",
  },
  {
    title: "React Router",
    description:
      "Handles client-side page navigation and route protection for authenticated views.",
  },
  {
    title: "Axios",
    description:
      "Manages API requests, JWT authorization headers, and response handling cleanly.",
  },
  {
    title: "react-hot-toast",
    description:
      "Shows non-blocking success and error notifications for user actions.",
  },
];

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ p: { xs: 3, md: 6 }, minHeight: "100vh", bgcolor: "background.default" }}>
      <Box sx={{ maxWidth: 920, mx: "auto", textAlign: "center", mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
          HRMS Frontend Demo
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 720, mx: "auto", mb: 3 }}>
          A human resources admin dashboard built with React, MUI, React Router, and Axios. Use it to manage employees, departments, and authentication flows.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2 }}>
          <Button component={RouterLink} to="/login" variant="contained" size="large">
            Login
          </Button>
          <Button component={RouterLink} to="/register" variant="outlined" size="large">
            Register
          </Button>
          {isAuthenticated && (
            <Button component={RouterLink} to="/dashboard" variant="contained" size="large" color="secondary">
              Go to Dashboard
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map((card) => (
          <Grid size={{ xs: 12, md: 4 }} key={card.title}>
            <Card elevation={1} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ maxWidth: 920, mx: "auto" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          What this app uses
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="React"
              secondary="Used for building the UI and composing reusable components."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Vite"
              secondary="Provides the build toolchain and fast development reloads."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="MUI"
              secondary="Provides styled UI components like buttons, dialogs, cards, and data grids."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="React Router"
              secondary="Manages navigation and protects dashboard routes based on authentication."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Axios"
              secondary="Handles HTTP requests, token injection, and global API error handling."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="react-hot-toast"
              secondary="Displays success and error messages for actions like login, registration, and CRUD operations."
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Problems solved and how it is solved
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Authentication"
              secondary="Login and registration are implemented with API calls and protected routes are enforced using a context-backed auth provider."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="State management"
              secondary="Local state is used for forms and lists, while auth state is stored in context and localStorage."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="User experience"
              secondary="The design uses MUI for responsive layouts, dialogs, and data grids to make management simple and polished."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="API integration"
              secondary="Axios centralizes API calls, adds JWT authentication headers, and handles unauthorized responses."
            />
          </ListItem>
        </List>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Use this home page as the starting point for navigation and to understand the main technologies, app architecture, and features implemented in this HRMS frontend.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;

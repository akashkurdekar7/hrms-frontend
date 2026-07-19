import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#1565c0",
    },
    background: {
      default: "#f5f7fb",
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: "Roboto",
  },
});

export default theme;
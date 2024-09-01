import { createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#003632",
      secondary: "#00D779",
      light: "#D1DFBA",
      white: "#FFFFFF",
      black: "#000000",
      chatbox: "#F5F1EF",
    },
    text: {
      dark: "#4056A1",
      white: "#FFFFFF",
      light: "#F1F0EB",
      black: "#000000",
      green: "#00D779",
    },
  },

  custom: {
    background:
      "linear-gradient(359deg, rgba(0, 0, 0, 0.00) 37.02%, rgba(0, 0, 0, 0.65) 103.1%), #005852",
    thin_background: "rgba(26, 26, 26, 0.80)",
    hero_background_gradient:
      "linear-gradient(356deg, rgba(217, 217, 217, 0.00) -56.4%, #003632 49.74%)",
  },

  typography: {
    fontFamily: "Anton, Montserrat, Arial, sans-serif",
    h1: {
      fontFamily: "Anton",
    },
    h2: {
      fontFamily: "Anton",
    },
    h3: {
      fontFamily: "Anton",
    },
    h4: {
      fontFamily: "Anton",
    },
    h5: {
      fontFamily: "Anton",
    },
    h6: {
      fontFamily: "Anton",
    },
    body1: {
      fontFamily: "Montserrat",
      fontSize: "24px",
    },
  },
});

export default Theme;

import { Box, Typography, ThemeProvider } from "@mui/material";

import Theme from "./theme";
const Footer = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          padding: "20px 0",
          textAlign: "center",
          color: "text.light",
          backgroundColor: Theme.palette.primary.main
        }}
      >
        <Typography variant="body1" fontSize="16px">
          © 2024 Car Buddy. All rights reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;

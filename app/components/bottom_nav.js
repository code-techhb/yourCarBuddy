/// Bottom navigation
import React, { useState } from "react";
import theme from "./theme";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  ThemeProvider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NoteIcon from "@mui/icons-material/Note";

const BottomNav = () => {
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          backgroundColor: "#fff",
        }}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          showLabels
          sx={{ backgroundColor: "primary.secondary" }}
        >
          {/* will have to add corresponding routes to each icon */}
          <BottomNavigationAction
            label="Profile"
            icon={<PersonIcon />}
            sx={{ color: "primary.black" }}
          />
          <BottomNavigationAction
            label="Chat"
            icon={<ChatIcon />}
            sx={{ color: "primary.black" }}
          />
          <BottomNavigationAction
            label="Dashboard"
            icon={<NoteIcon />}
            sx={{ color: "primary.black" }}
          />
        </BottomNavigation>
      </Box>
    </ThemeProvider>
  );
};

export default BottomNav;

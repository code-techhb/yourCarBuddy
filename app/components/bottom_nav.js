"use client";
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
import { usePathname, useRouter } from "next/navigation";

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveValue = () => {
    if (pathname === "/profile") return 0;
    if (pathname === "/chatbot") return 1;
    if (pathname === "/dashboard") return 2;
    return 0; // default to profile if not matching
  };

  const [value, setValue] = useState(getActiveValue());

  const handleNavigation = (newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push("/profile");
        break;
      case 1:
        router.push("/chatbot");
        break;
      case 2:
        router.push("/dashboard");
        break;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <BottomNavigation
        position="relative"
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)}
        showLabels
        sx={{
          backgroundColor: "primary.secondary",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
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
    </ThemeProvider>
  );
};

export default BottomNav;

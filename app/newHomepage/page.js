"use client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box, Typography } from "@mui/material";
import React from "react";
import Theme from "../components/theme";
import { ClerkProvider } from "@clerk/nextjs";

// Import components individually to isolate the issue
import Navbar from "../components/navbar";
import BottomAppBar from "../components/bottomAppBar";

export default function NewHome() {
  return (
    <ClerkProvider>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          {/* Conditionally render Navbar */}
          {Navbar ? <Navbar /> : <Typography>Navbar failed to load</Typography>}

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4">Welcome to the New Home Page</Typography>
          </Box>

          {/* Conditionally render BottomAppBar */}
          {BottomAppBar ? (
            <BottomAppBar />
          ) : (
            <Typography>BottomAppBar failed to load</Typography>
          )}
        </Box>
      </ThemeProvider>
    </ClerkProvider>
  );
}

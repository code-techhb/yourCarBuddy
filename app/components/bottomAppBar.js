"use client";

import React from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";

function BottomAppBar() {
  //const router = useRouter();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: 3, // Optional: Adds shadow for better visual
      }}
    >
      <AppBar
        sx={{
          position: "relative",
          top: "auto",
          bottom: 0,
          bgcolor: "primary.main", // Customize as needed
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "100%",
            alignContent: "center",
            maxWidth: 600, // Optional: Limits the width of the Toolbar
          }}
        >
          <Stack
            direction="row"
            spacing={15}
            alignItems="center"
            sx={{ width: "100%", justifyContent: "center" }}
          >
            <IconButton edge="start" color="inherit" aria-label="home">
              <AccountCircleIcon />
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="search">
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton edge="end" color="inherit" aria-label="account">
              <EditNoteIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default BottomAppBar;

"use client";
import { useState } from "react";
import theme from "../components/theme";
import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// ---------------- component -----------------
export default function RegisterForm() {
  // ---------------- state management vars -----------------
  const [open, setOpen] = useState(false);

  // Custom styled TextField
  const WhiteTextField = styled(TextField)({
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "white !important",
    },
  });

  // ----------------event handler functions -----------------
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // ----------------------UI-----------------------------
  return (
    <ThemeProvider theme={theme}>
      {/* Navbar go here */}

      {/* Outer box */}
      <Box
        width="100vw"
        height="100vh"
        sx={{
          background: theme.custom.background,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography color="primary.white">Welcome</Typography>
        {/* button for testing purposes */}
        <Button
          variant="contained"
          background="primary.secondary"
          onClick={handleOpen}
        >
          Open Modal
        </Button>
        {/* modal */}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              background: theme.custom.thin_background,
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 800,
              border: "3 solid black",
              boxShadow: 24,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontSize: "40px",
                fontStyle: "normal",
                fontWeight: 700,
                color: "primary.secondary",
              }}
            >
              Please enter your car information
            </Typography>
            <WhiteTextField
              variant="standard"
              placeholder="Car Brand"
              sx={{
                textAlign: "center",
                fontSize: "40px",
                fontStyle: "normal",
                fontWeight: 700,
                color: "primary.white",
              }}
            />
            <WhiteTextField variant="standard" placeholder="Car Model" />
            <WhiteTextField
              variant="standard"
              type="number"
              placeholder="Year"
            />
            <WhiteTextField
              variant="standard"
              type="number"
              placeholder="Millage"
            />
            <WhiteTextField
              variant="standard"
              placeholder="What do you want to track?(oil, tires change, etc)"
            />

            {/* need to fix this placeholder issue */}
            <Typography variant="body1" color="primary.white">
              When was the last time you change it?
            </Typography>
            <WhiteTextField
              variant="standard"
              type="date"
              // label="When was the last time you change it?"
              fullWidth
            />
            {/* next */}
            <Typography variant="body1" color="primary.white">
              When is your car due for the next inspection?
            </Typography>
            <WhiteTextField
              variant="standard"
              type="date"
              placeholder="When is your car due for the next inspection?"
            />

            <Button
              variant="standard"
              sx={{
                borderRadius: "20px",
                alignSelf: "center",
                px: "15px",
                width: "120px",
                backgroundColor: "primary.secondary",
                color: "primary.black",
              }}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

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
  Stack
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUser } from "@clerk/nextjs"; // Import useUser
import { addUserCar } from "../utils/page";
import { useRouter } from "next/navigation";

import Navbar from "../components/navbar";
// ---------------- component -----------------
export default function RegisterForm() {
  // ---------------- state management vars -----------------
  const [open, setOpen] = useState(false);
  const { user } = useUser(); 
  const userId = user?.id; 
  const router = useRouter();

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

  // -----------------On submit -----------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const carData = {
      VIN: formData.get('VIN'),
      brand: formData.get('brand'),
      model: formData.get('model'),
      year: formData.get('year'),
      mileage: formData.get('mileage'),
  };

  console.log('Data to be passed to Firebase:', carData);

    if (userId) {
        console.log('User ID is:', userId);
        console.log('Calling addUserCar...');
        await addUserCar(carData, userId); // This is where addUserCar is called
        console.log('addUserCar has been called');
        handleClose()
        router.push("/profile");
      
    } else {
      console.error("User not authenticated");
    }
    
  };


  return (
    <ThemeProvider theme={theme}>
      {/* Navbar go here */}
      <Navbar></Navbar>
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
            
            <form onSubmit={handleSubmit}>
            <Stack spacing={6}>
            <WhiteTextField
              variant="standard"
              placeholder="VIN"
              name = 'VIN'
              sx={{
                textAlign: "center",
                fontSize: "40px",
                fontStyle: "normal",
                fontWeight: 700,
                color: "primary.white",
              }}
            />
            <WhiteTextField variant="standard" placeholder="Car Brand" name = 'brand'/>
            <WhiteTextField
              variant="standard"
              //type="number"
              placeholder="Model"
              name = 'model'
            />
            <WhiteTextField
              variant="standard"
              type="number"
              placeholder="Millage"
              name = 'mileage'
            />
            <WhiteTextField
              variant="standard"
              placeholder="Year"
              name = 'year'
            />

            <Button
              variant="standard"
              type="submit"
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
            </Stack>
            </form> 
            
          </Box>
          
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

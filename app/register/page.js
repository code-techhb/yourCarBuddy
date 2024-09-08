"use client";
import { useState, useEffect } from "react";
import theme from "../components/theme";
import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  Modal,
  TextField,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUser } from "@clerk/nextjs";
import { addUserCar } from "../utils/page";
import { useRouter } from "next/navigation";
// ---------------- component -----------------
export default function RegisterForm() {
  // ---------------- state management vars -----------------
  const [open, setOpen] = useState(true);
  const [formFilled, setFormFilled] = useState(false);
  const { user } = useUser();
  const userId = user?.id;
  const router = useRouter();



  useEffect(() => {
      if (!user) {
        router.push("/sign-in");
      }
    })

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
  const handleInputChange = () => {
    // Check if form fields have values to determine if the form is filled
    const vin = document.querySelector('input[name="VIN"]').value.trim();
    const mileage = document
      .querySelector('input[name="mileage"]')
      .value.trim();
    setFormFilled(vin.length > 0 || mileage.length > 0);
  };

  const handleClose = () => {
    if (formFilled) {
      setOpen(false);
    } else {
      alert("Please enter your Car information before you can proceed!");
    }
  };

  // -----------------On submit -----------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const vin = formData.get("VIN");

    let make = "";
    let model = "";
    let modelYear = "";
    let brand = "";

    // Fetch vehicle data
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`
      );
      const data = await response.json();
      const results = data.Results;

      // Extract relevant vehicle details from the response
      results.forEach((item) => {
        if (item.Variable === "Make") {
          make = item.Value;
        }
        if (item.Variable === "Model") {
          model = item.Value;
        }
        if (item.Variable === "Model Year") {
          modelYear = item.Value;
        }
        if (item.Variable === "Manufacturer Name") {
          brand = item.Value;
        }
      });

      // Data to be sent to Firebase
      const carData = {
        VIN: formData.get("VIN"),
        brand: brand,
        model: model,
        year: modelYear,
        mileage: formData.get("mileage"),
      };

      console.log("Data to be passed to Firebase:", carData);

      if (userId) {
        console.log("User ID is:", userId);
        console.log("Calling addUserCar...");
        await addUserCar(carData, userId);
        console.log("addUserCar has been called");
        handleClose();
        router.push("/profile");
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 36, 33, 1)",
          },
        }}
      >
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
                name="VIN"
                sx={{
                  textAlign: "center",
                  fontSize: "40px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  color: "primary.white",
                }}
                onChange={handleInputChange}
              />
              <WhiteTextField
                variant="standard"
                type="number"
                placeholder="Millage"
                name="mileage"
                onChange={handleInputChange}
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
    </ThemeProvider>
  );
}

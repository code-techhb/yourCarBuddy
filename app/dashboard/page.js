"use client";
import { useEffect, useState } from "react";
import theme from "../components/theme";
import * as React from "react";
import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Stack,
  Modal,
} from "@mui/material";
import Select from "@mui/material/Select";
import BuildIcon from "@mui/icons-material/Build";
import Checkbox from "@mui/material/Checkbox";
import BottomNav from "../components/bottom_nav";
import Navbar from "../components/navbar";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { carPartsCheckedFrequently } from "@/app/utils/elements";

export default function Dashboard() {
  // ---------------------- State vars ----------------------------

  const { user, isLoaded } = useUser();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [car, setCar] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [cars, setCars] = useState([]);
  const [carPart, setCarPart] = useState("");
  const [lastChangedDate, setLastChangedDate] = useState("");
  const [nextChangeDate, setNextChangeDate] = useState("");
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  // ---------------------- Use effect for fetching ---------------------

  useEffect(() => {
    const fetchCars = async () => {
      if (!isLoaded || !user) {
        console.log("User is not loaded yet.");
        return;
      }

      try {
        // Assuming you have a collection named 'cars' under 'users' (you may need to change this based on your Firestore structure)
        const userId = user.id; // Safely accessing the userId
        const carsCollectionRef = collection(db, "users", userId, "cars");
        const carDocs = await getDocs(carsCollectionRef);

        const carList = carDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCars(carList); // Update state with the fetched cars
        console.log("Cars fetched:", carList); // Log fetched cars to ensure they are being fetched
      } catch (error) {
        console.error("Error fetching cars: ", error);
      }
    };

    fetchCars();
  }, [user, isLoaded]);

  // ------------------------ Handle functions-------------------------

  const handleChange = (event) => {
    setCar(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleModalOpen = () => {
    setOpenAddModal(true);
  };

  const handleModalClose = () => {
    setOpenAddModal(false);
  };

  const handleCarPartChange = (event) => {
    setCarPart(event.target.value);
  };
  
  const handleLastChangedDateChange = (event) => {
    setLastChangedDate(event.target.value);
  };
  
  const handleNextChangeDateChange = (event) => {
    setNextChangeDate(event.target.value);
  };

  const handleSubmit = async () => {
    if (!user || !car || !carPart || !lastChangedDate || !nextChangeDate) {
      console.error("All fields are required");
      return;
    }
  
    const newRecord = {
      carPart,
      lastChanged: lastChangedDate,
      nextChange: nextChangeDate
    };
  
    try {
      const userId = user.id;
      const carsCollectionRef = collection(db, "users", userId, "cars");
      const selectedCar = cars.find(c => c.VIN === car);
  
      if (!selectedCar || !selectedCar.id) {
        console.error("Selected car not found or invalid");
        return;
      }
  
      const carDocRef = doc(carsCollectionRef, selectedCar.id);
  
      // Fetch the existing maintenance records
      const carDoc = await getDoc(carDocRef);
      const existingMaintenance = carDoc.exists() ? carDoc.data().maintenance : [];
  
      // Ensure existingMaintenance is an array
      const maintenanceArray = Array.isArray(existingMaintenance) ? existingMaintenance : [];
  
      // Combine existing records with new records
      const updatedMaintenance = [...maintenanceArray, newRecord];
  
      // Update the Firestore document with the combined records
      await updateDoc(carDocRef, {
        maintenance: updatedMaintenance
      });
  
      console.log("Maintenance records added successfully");
      handleModalClose(); // Close modal after submission
  
      // Clear the state after submission
      setMaintenanceRecords([]);
    } catch (error) {
      console.error("Error adding maintenance records: ", error);
    }
  };
  
  
  
  
  // ---------------------- UI ----------------------
  return (
    <ThemeProvider theme={theme}>
      {/* Navbar will go here */}
      <Navbar />
      {/* outer box  */}
      <Box
        height="100vh"
        sx={{
          background: theme.custom.background,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100vw",
          maxWidth: "100%",
        }}
      >
        {/* dropdown */}
        <FormControl
          sx={{
            m: 1,
            minWidth: 800,
            backgroundColor: "primary.secondary",
            marginBottom: 5,
            boxShadow:
              "13px 15px 24px 0px rgba(255, 255, 255, 0.25), 6px 6px 4px 0px rgba(253, 255, 243, 0.25)",
          }}
        >
          <InputLabel id="demo-simple-select-label">Select Your Car</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={car}
            label="Car"
            onChange={handleChange}
          >
            {cars.length === 0 && (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            )}
            {cars.map((car) => (
              <MenuItem key={car.id} value={car.VIN}>
                {`${car.brand} ${car.model} (${car.year})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        
        {/* Upcoming maintenance box */}
        <Box width="800px" mb="40px">
          <Card
            sx={{
              backgroundColor: "primary.white",
              color: "primary.black",
            }}
          >
            <CardContent>
              <Typography variant="h6">Upcoming Maintenance</Typography>
              {/* Will have a CRUD Operation here */}
              <List sx={{ color: "primary.black" }}>
                <ListItem>
                  <BuildIcon sx={{ color: "#primary.black" }} />
                  <ListItemText primary="Oil change in 5 days or 100 miles" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Maintenance Remainder list  */}
        <Box width="800px" mb="40px">
          <Card
            sx={{
              backgroundColor: "primary.white",
              color: "primary.black",
            }}
          >
            <CardContent>
              <Typography variant="h6">Maintenance Reminder List</Typography>
              {/* Will have a CRUD Operation here */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
                border="1px solid black"
                borderRadius="5px"
                mt="10px"
                p="20px"
              >
                <Checkbox id="maintenance-done" />
                <Box>
                  <Typography variant="h6">Oil change</Typography>
                  <Typography>Every 3 months or 3000 to 7000 miles</Typography>
                </Box>
                <Box>
                  <Typography variant="body1">Due in</Typography>
                  <Typography variant="h6">5 Days</Typography>
                </Box>
              </Box>
              {/* CRUD end here */}
              {/* more button */}
              <Box display="flex" justifyContent="center">
                <Button
                  sx={{
                    marginTop: 2,
                    textAlign: "center",
                    fontFamily: "Montserrat",
                    // fontSize: "24px",
                  }}
                >
                  More &gt;&gt;&gt;
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Maintenance log */}
        <Box width="800px" mb="40px">
          <Card
            sx={{
              backgroundColor: "primary.white",
              color: "primary.black",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 2,
                }}
              >
                <Typography variant="h6">Log</Typography>
                <Box overflow="auto">
                  <Button
                    variant="outlined"
                    sx={{
                      marginRight: 1,
                      borderRadius: "20px",
                      alignSelf: "center",
                      px: "15px",
                      width: "120px",
                      color: "primary.black",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Edit
                  </Button>
                  {/* // ---------------- add modal ---------------------- */}
                  <Modal open={openAddModal} onClose={handleModalClose}>
                    <Box
                      sx={{
                        bgcolor: "primary.white",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 800,
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
                        What do you want to track?
                      </Typography>

                      <Stack spacing={3}>
                        <FormControl>
                          <InputLabel id="car-part">Car Part</InputLabel>
                          <Select
                            labelId="car-part-select-label"
                            value={carPart}
                            variant="standard"
                            onChange={handleCarPartChange}
                          >
                            {carPartsCheckedFrequently.map((part, index) => (
                              <MenuItem key={index} value={part}>
                                {part}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <Typography>
                          When was the last time you changed it?
                        </Typography>
                        <TextField
                          variant="standard"
                          type="date"
                          placeholder="when was the last time you changed it?"
                          value={lastChangedDate}
                          onChange={handleLastChangedDateChange}
                        />

                        <Typography>
                          When is the next time you should change it by?
                        </Typography>
                        <TextField
                          variant="standard"
                          type="date"
                          placeholder="when is the next time you should change it by?"
                          value={nextChangeDate}
                          onChange={handleNextChangeDateChange}
                        />

                        <Button
                          variant="contained"
                          type="submit"
                          sx={{
                            borderRadius: "20px",
                            alignSelf: "center",
                            px: "15px",
                            width: "120px",
                            backgroundColor: "primary.secondary",
                            color: "primary.black",
                          }}
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </Stack>
                    </Box>
                  </Modal>

                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "20px",
                      alignSelf: "center",
                      px: "15px",
                      width: "120px",
                      backgroundColor: "primary.secondary",
                      color: "primary.black",
                      fontFamily: "Montserrat",
                    }}
                    onClick={handleModalOpen}
                    disabled={!car}
                  >
                    Add
                  </Button>
                </Box>
              </Box>

              {/* Open this only when click on add recent activities */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
                mt="20px"
              >
                <Typography>Oil changed</Typography>
                <TextField type="date" variant="standard" />
                <TextField type="date" variant="standard" />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* Bottom Navigation */}
      <BottomNav />
    </ThemeProvider>
  );
}

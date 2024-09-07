"use client";
import { useEffect, useState } from "react";
import theme from "../components/theme";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
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
        console.log('Car Fetch', carList)
      } catch (error) {
        console.error("Error fetching cars: ", error);
      }
    };

    fetchCars();
  }, [user, isLoaded]);


  const calculateDueInDays = (lastChangeDate, nextChangeDate) => {
    const currentDate = new Date();
   
    const nextDate = new Date(nextChangeDate);
    console.log("current day", currentDate)
    console.log("another", nextDate)
    // Calculate difference in time
    const timeDifference = (nextDate - currentDate);
    
    // Convert time difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference+2;
  };

  const handleDelete = async (index) => {
  if (!user || !user.id) {
    console.error("User not authenticated");
    return;
  }

  try {
    const userId = user.id;
    const carsCollectionRef = collection(db, "users", user.id, "cars");
    
    // Find the car document with the matching VIN
    const carDocRef = doc(carsCollectionRef, car);
    const carDoc = await getDoc(carDocRef);
    console.log(carDoc)
    if (!carDoc.exists()) {
      console.error("Car not found");
      return;
    }

    const carData = carDoc.data();
    const maintenanceRecords = carData.maintenance || [];

    if (index < 0 || index >= maintenanceRecords.length) {
      console.error("Invalid index");
      return;
    }

    // Remove the item at the specified index
    const updatedMaintenanceRecords = maintenanceRecords.filter((_, i) => i !== index);

    // Update the document with the modified array
    await updateDoc(carDocRef, {
      maintenance: updatedMaintenanceRecords,
    });

    console.log("Maintenance record deleted successfully");

    // Update the local state
    setMaintenanceRecords(updatedMaintenanceRecords);

  } catch (error) {
    console.error("Error deleting maintenance record: ", error);
  }
};


  // ------------------------ Handle functions-------------------------

  useEffect(() => {
    const fetchMaintenance = async () => {
      if (!car || !isLoaded || !user) {
        return;
      }
  
      try {
        const userId = user.id;
        const carsCollectionRef = collection(db, "users", userId, "cars");
        const carDocs = await getDocs(carsCollectionRef);
  
        const carList = carDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setCars(carList);

        const selectedCar = carList.find(carItem => carItem.VIN === car);

        if (selectedCar && selectedCar.maintenance.length > 0) {
          const maintenanceRecord = selectedCar.maintenance;
          console.log("Car Part:", maintenanceRecord.carPart);
          console.log("Last Changed:", maintenanceRecord.lastChanged);
          console.log("Next Change:", maintenanceRecord.nextChange);
          // Update state with maintenance records
          setMaintenanceRecords(selectedCar.maintenance);
          console.log("here", maintenanceRecord)
        } else {
          console.log("Car not found or no maintenance records available.");
          setMaintenanceRecords([]);
        }
      } catch (error) {
        console.error("Error fetching maintenance: ", error);
      }
    };

    fetchMaintenance();
  }, [car, isLoaded, user]);

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

  

  const handleCarPartChange = (event) => {
    setCarPart(event.target.value);
  };
  
  const handleLastChangedDateChange = (event) => {
    setLastChangedDate(event.target.value);
  };
  
  const handleNextChangeDateChange = (event) => {
    setNextChangeDate(event.target.value);
  };


  const handleModalClose = () => {
  setOpenAddModal(false);
  // Reset form fields
  setCarPart("");
  setLastChangedDate("");
  setNextChangeDate("");
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

      setCarPart("");
    setLastChangedDate("");
    setNextChangeDate("");

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
        //height="100%"
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
            marginTop: 5,
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


        
        {/* Maintenance Remainder list  */}
        <Box width="800px" mb="40px">
          <Card
            sx={{
              backgroundColor: "primary.white",
              color: "primary.black",
              marginTop: 4,
            }}
          >
            <CardContent>
              <Typography variant="h6">Maintenance Reminder List</Typography>
             {/* Will have a CRUD Operation here */}
        {maintenanceRecords.map((record, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row"
            border="1px solid black"
            borderRadius="5px"
            mt="10px"
            p="20px"
          >
            <DeleteIcon
                          sx={{ cursor: "pointer", color: "GREY" }}
                          onClick={() => handleDelete(index)}
                        />
            <Box>
              <Typography variant="h6">{record.carPart}</Typography>
              <Typography>{record.description}</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Due in</Typography>
              <Typography variant="h6">
                {calculateDueInDays(record.lastChanged, record.nextChange) > 0
                  ? `${calculateDueInDays(record.lastChanged, record.nextChange)} Days`
                  : "Past Due"}
              </Typography>
            </Box>
          </Box>
        ))}
        {/* CRUD end here */}
        {/* more button */}
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
                <Typography variant="h6">Maintenance Log</Typography>
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
                  <Modal open={openAddModal} onClose={handleClose}>
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

;

<Box width="800px" mb="40px">
  <Card
    sx={{
      backgroundColor: "primary.white",
      color: "primary.black",
    }}
  >
    <CardContent>
      
      {maintenanceRecords.length === 0 ? (
        <Typography>
          <em>No maintenance records available</em>
        </Typography>
      ) : (
        <Box>
          {/* Header Row */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1, // margin bottom for spacing
              borderBottom: '1px solid', // optional border for visual separation
              borderColor: 'divider'
            }}
          >
            <Box sx={{ flex: 2 }}>
              <Typography fontFamily='arial'marginLeft={2} variant="subtitle1" fontWeight="bold">
                CarPart
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'left' }}>
              <Typography fontFamily='arial' variant="subtitle1" fontWeight="bold">
                Last Date
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'right' }}>
              <Typography fontFamily='arial' variant="subtitle1" fontWeight="bold">
                Next Date
              </Typography>
            </Box>
          </Box>

          {/* Data Rows */}
          <List>
            {maintenanceRecords.map((record, index) => (
              <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flex: 2 }}>
                  <Typography variant="body1">
                    {record.carPart}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'left' }}>
                  <Typography variant="body1">
                    {record.lastChanged}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'right' }}>
                  <Typography variant="body1">
                    {record.nextChange}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </CardContent>
  </Card>
</Box>

                {/* <Typography>Oil changed</Typography>
                <TextField type="date" variant="standard" />
                <TextField type="date" variant="standard" /> */}
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

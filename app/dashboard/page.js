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
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
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

  // ------------------------ Effects-------------------------
  useEffect(() => {
    const fetchCars = async () => {
      if (!isLoaded || !user) {
        console.log("User is not loaded yet.");
        return;
      }

      try {
        // Assuming you have a collection named 'cars' under 'users' (you may need to change this based on your Firestore structure)
        const userId = user.id;
        const carsCollectionRef = collection(db, "users", userId, "cars");
        const carDocs = await getDocs(carsCollectionRef);

        const carList = carDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCars(carList); // Update state with the fetched cars
        // console.log("Car Fetch", carList);
      } catch (error) {
        console.error("Error fetching cars: ", error);
      }
    };

    fetchCars();
  }, [user, isLoaded]);

  // Due dates
  const calculateDueInDays = (lastChangeDate, nextChangeDate) => {
    const currentDate = new Date();
    const nextDate = new Date(nextChangeDate);
    const timeDifference = nextDate - currentDate;
    // Convert time difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference + 2;
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
      console.log(carDoc);

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
      const updatedMaintenanceRecords = maintenanceRecords.filter(
        (_, i) => i !== index
      );
      // Update the document with the modified array
      await updateDoc(carDocRef, {
        maintenance: updatedMaintenanceRecords,
      });
      // alert("Maintenance successfully check");
      // Update the local state
      setMaintenanceRecords(updatedMaintenanceRecords);
    } catch (error) {
      console.error("Error deleting maintenance record: ", error);
    }
  };

  // fetch maintenance data from db
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

        const selectedCar = carList.find((carItem) => carItem.VIN === car);

        if (selectedCar && selectedCar.maintenance.length > 0) {
          // Update state with maintenance records
          setMaintenanceRecords(selectedCar.maintenance);
          // console.log("here", maintenanceRecord)
        } else {
          alert("Car not found or no maintenance records available.");
          setMaintenanceRecords([]);
        }
      } catch (error) {
        console.error("Error fetching maintenance: ", error);
      }
    };

    fetchMaintenance();
  }, [car, isLoaded, user]);

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
      nextChange: nextChangeDate,
    };
    try {
      const userId = user.id;
      const carsCollectionRef = collection(db, "users", userId, "cars");
      const selectedCar = cars.find((c) => c.VIN === car);

      if (!selectedCar || !selectedCar.id) {
        alert("Selected car not found or invalid");
        return;
      }
      const carDocRef = doc(carsCollectionRef, selectedCar.id);
      // Fetch the existing maintenance records
      const carDoc = await getDoc(carDocRef);
      const existingMaintenance = carDoc.exists()
        ? carDoc.data().maintenance
        : [];
      // Ensure existingMaintenance is an array
      const maintenanceArray = Array.isArray(existingMaintenance)
        ? existingMaintenance
        : [];
      // Combine existing records with new records
      const updatedMaintenance = [...maintenanceArray, newRecord];
      // Update the Firestore document with the combined records
      await updateDoc(carDocRef, {
        maintenance: updatedMaintenance,
      });
      handleModalClose(); // Close modal after submission
      // Clear the state after submission
      setMaintenanceRecords([]);
      setCarPart("");
      setLastChangedDate("");
      setNextChangeDate("");

      handleModalClose();
    } catch (error) {
      console.error("Error adding maintenance records: ", error);
    }
  };

  // ---------------------- UI ----------------------
  return (
    <ThemeProvider theme={theme}>
      {/* outer box  */}
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          background: theme.custom.background,
        }}
      >
        <Navbar />
        {/* wrapper */}
        <Box>
          <Box
            sx={{
              background: theme.custom.background,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            {/* dropdown */}
            <FormControl
              sx={{
                mb: 2,
                width: 800,
                backgroundColor: "primary.secondary",
                marginTop: 5,
                boxShadow:
                  "13px 15px 24px 0px rgba(255, 255, 255, 0.2), 6px 6px 4px 0px rgba(253, 255, 243, 0.2)",
              }}
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{
                  color: "primary.black",
                  padding: "5px",
                }}
              >
                Select your car
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="standard"
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
                  maxHeight: 310,
                  overflow: "auto",
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <BuildIcon></BuildIcon>
                    <Typography variant="h6">
                      Maintenance Reminder List
                    </Typography>
                  </Box>

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
                      <Checkbox
                        sx={{ cursor: "pointer", color: "GREY" }}
                        onClick={() => handleDelete(index)}
                      />
                      <Box>
                        <Typography>{record.carPart}</Typography>
                        {/* <Typography>{record.description}</Typography> */}
                      </Box>
                      <Box>
                        <Typography variant="body1">Due in</Typography>
                        <Typography variant="h6">
                          {calculateDueInDays(
                            record.lastChanged,
                            record.nextChange
                          ) > 0 ? (
                            <em>
                              {calculateDueInDays(
                                record.lastChanged,
                                record.nextChange
                              )}{" "}
                              Days
                            </em>
                          ) : (
                            "Past Due"
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  {/* CRUD end here */}
                </CardContent>
              </Card>
            </Box>

            {/* Maintenance log */}
            <Box width="800px" mb="10px">
              <Card
                sx={{
                  backgroundColor: "primary.white",
                  color: "primary.black",
                  maxHeight: 350,
                  overflow: "auto",
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

                    {/* add modal */}
                    <Box>
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
                                {carPartsCheckedFrequently.map(
                                  (part, index) => (
                                    <MenuItem key={index} value={part}>
                                      {part}
                                    </MenuItem>
                                  )
                                )}
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
                      {/* add button */}
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
                          mb: 1,
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
                    <Box width="800px" mb="40px">
                      <Card
                        sx={{
                          backgroundColor: "primary.white",
                          color: "primary.black",
                        }}
                      >
                        <CardContent>
                          {maintenanceRecords.length === 0 ? (
                            <Typography color="red">
                              <em>
                                No maintenance records available yet.
                                <br />
                                Please select a car first!
                              </em>
                            </Typography>
                          ) : (
                            <Box overflow={"auto"}>
                              {/* Header Row */}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 1,
                                  borderBottom: "1px solid",
                                  borderColor: "divider",
                                }}
                              >
                                <Box sx={{ flex: 2 }}>
                                  <Typography
                                    fontFamily="arial"
                                    marginLeft={2}
                                    variant="subtitle1"
                                    fontWeight="bold"
                                  >
                                    CarPart
                                  </Typography>
                                </Box>
                                <Box sx={{ flex: 1, textAlign: "left" }}>
                                  <Typography
                                    fontFamily="arial"
                                    variant="subtitle1"
                                    fontWeight="bold"
                                  >
                                    Last Date
                                  </Typography>
                                </Box>
                                <Box sx={{ flex: 1, textAlign: "right" }}>
                                  <Typography
                                    fontFamily="arial"
                                    variant="subtitle1"
                                    fontWeight="bold"
                                  >
                                    Next Date
                                  </Typography>
                                </Box>
                              </Box>

                              {/* Data Rows */}
                              <List>
                                {maintenanceRecords.map((record, index) => (
                                  <ListItem
                                    key={index}
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Box sx={{ flex: 2 }}>
                                      <Typography variant="body1">
                                        {record.carPart}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, textAlign: "left" }}>
                                      <Typography variant="body1">
                                        {record.lastChanged}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, textAlign: "right" }}>
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
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
          {/* Bottom Navigation */}
          <BottomNav />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

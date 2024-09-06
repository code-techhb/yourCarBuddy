"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  CssBaseline,
  Box,
  Label,
  ThemeProvider,
  Typography,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Theme from "../components/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";

const Profile = () => {
  const [rows, setRows] = useState([]);
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Firebase
  useEffect(() => {
    if (!isLoaded) return; // Wait for user to be loaded

    if (!user) {
      console.error("User not authenticated");
      router.push('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchCars = async () => {
      try {
        if (!db) {
          console.error("Firebase db is not initialized");
          return;
        }

        const carsCollection = collection(db, "users", user.id, "cars");
        const carSnapshot = await getDocs(carsCollection);
        const carList = carSnapshot.docs.map((doc) => ({
          ...doc.data(),
          VIN: doc.id,
        }));
        setRows(carList);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [user, isLoaded, router]);

  // Handle Delete Function
  // const handleDelete = async (VIN) => {
  //   try {
  //     // const db = getFirestore();
  //     // const colRef = collection(doc(collection(db, 'users'), user.id), search);
  //     const carsCollectionRef = collection(
  //       doc(collection(db, "users"), user.id),
  //       "cars"
  //     ); // Reference to the 'users' collection
  //     // Query to find the document with the matching VIN
  //     const q = query(carsCollectionRef, where("VIN", "==", VIN));
  //     const querySnapshot = await getDocs(q);

  //     if (!querySnapshot.empty) {
  //       // Assuming VIN is unique, there should be exactly one document
  //       const docId = querySnapshot.docs[0].id; // Get the document ID
  //       const carDocRef = doc(db, "users", docId); // Create a reference to the document
  //       await deleteDoc(carDocRef); // Delete the document from Firestore
  //       setRows((prevRows) => prevRows.filter((row) => row.VIN !== VIN)); // Update the UI to remove the deleted car
  //     } else {
  //       console.error("No car found with the provided VIN.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting car: ", error);
  //   }
  // };

  const handleDelete = async (VIN) => {
    if (!user || !user.id) {
      console.error("User not authenticated");
      return;
    }

    try {
      // Create a reference to the specific car document
      const carDocRef = doc(db, "users", user.id, "cars", VIN);
      // Delete the document from Firestore
      await deleteDoc(carDocRef);
      // Update the local state to remove the deleted car
      setRows((prevRows) => prevRows.filter((row) => row.VIN !== VIN));
      alert(`Car with VIN ${VIN} deleted successfully`);
    } catch (error) {
      console.error("Error deleting car: ", error);
    }
  };

  const handleAddVehicleClick = () => {
    router.push("/register"); // Route to /register on click
  };

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Navbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "100%",
          flexDirection: "column",
          width: "10vw",
          height: "100vh",
          background: "#D1DFBA",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1220px",
            p: 4,
            borderRadius: 5,
            maxWidth: "1000px", // Adjust this to make the box bigger
            border: "2px solid #ccc", // Add border for visual emphasis
            bgcolor: "white",
            display: "flex",
            marginBottom: 2,
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", width: "800px" }}
            borderRadius={5}
          >
            <Typography marginLeft={2}>
              Welcome to Carbuddy {user?.fullName}
            </Typography>
            <Typography marginLeft={2}>....</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1000px",
            p: 4,
            borderRadius: 5,
            border: "2px solid #ccc",
            bgcolor: "white",
          }}
        >
          <Box sx={{ display: "flex", p: 1, borderRadius: 1, width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Typography align="left" sx={{ display: "flex", flexGrow: 1 }}>
                Your Garage
              </Typography>
            </Box>
            <Box sx={{ flexDirection: "row-reverse" }}>
              <Button variant="outlined" sx={{ borderRadius: "9" }}>
                Edit
              </Button>
            </Box>
          </Box>

          <Box marginTop={5} textAlign={"center"}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: "bold", fontSize: 22 }}
                    >
                      Vin #
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: 22 }}
                    >
                      Brand
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: 22 }}
                    >
                      Model
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: 22 }}
                    >
                      Year
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: 22 }}
                    >
                      Mileage
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: 22 }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.VIN}
                      </TableCell>
                      <TableCell align="center">{row.brand}</TableCell>
                      <TableCell align="center">{row.model}</TableCell>
                      <TableCell align="center">{row.year}</TableCell>
                      <TableCell align="center">{row.mileage}</TableCell>
                      <TableCell align="center">
                        <DeleteIcon
                          sx={{ cursor: "pointer", color: "GREY" }}
                          onClick={() => handleDelete(row.VIN)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Box margin={8}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              background: Theme.palette.primary.secondary,
              borderRadius: 6,
              padding: {
                xs: "4px 20px",
                sm: "4px 20px",
                md: "8px 40px",
                lg: "8px 40px",
                marginLeft: 15,
              },
              color: "black",
              textTransform: "none",
            }}
            onClick={handleAddVehicleClick}
          >
            ADD A NEW VEHICLE
          </Button>
        </Box>
      </Box>
      <Footer></Footer>
    </ThemeProvider>
  );
};

export default Profile;

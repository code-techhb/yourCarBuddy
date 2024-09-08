"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
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
import { useRouter } from "next/navigation";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import BottomNav from "../components/bottom_nav";
import RegisterForm from "@/app/components/car_modal";

// --------------------------- profile page -------------------------

const Profile = () => {
  const [rows, setRows] = useState([]);
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Fetch data from Firebase
  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/sign-in");
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

  // update garage
  const handleAddCar = (newCar) => {
    setRows((prevRows) => [...prevRows, newCar]);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Box width="100wh" height="100vh" backgroundColor="primary.light">
        <Navbar />
        {/* wrapper */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            p: 5,
          }}
        >
          {/* user box*/}
          <Box
            sx={{
              width: "100%",
              maxWidth: "1220px",
              borderRadius: 5,
              maxWidth: "1000px",
              border: "2px solid primary.main",
              bgcolor: "white",
              display: "flex",
              marginBottom: 2,
              p: 4,
            }}
          >
            <Typography marginLeft={2}>
              Welcome to Carbuddy, {user?.fullName}
            </Typography>
          </Box>

          {/* garage box */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "1000px",
              p: 4,
              borderRadius: 5,
              border: "2px solid #ccc",
              bgcolor: "white",
              overflow: "auto",
              maxHeight: 700,
            }}
          >
            <Box
              sx={{
                display: "flex",
                p: 1,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography align="left" sx={{ display: "flex", flexGrow: 1 }}>
                Your Garage
              </Typography>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: Theme.palette.primary.secondary,
                  borderRadius: 6,
                  padding: {
                    xs: "4px 20px",
                    sm: "4px 20px",
                    md: "8px 40px",
                    lg: "8px 40px",
                  },
                  color: "black",
                  fontFamily: "Montserrat",
                  textTransform: "none",
                }}
                onClick={handleOpenModal}
              >
                Add new Car
              </Button>
            </Box>

            {/* rows */}
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
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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

          <RegisterForm
            open={isModalOpen}
            handleClose={handleCloseModal}
            onAddCar={handleAddCar}
          />
        </Box>
      </Box>
      <BottomNav />
    </ThemeProvider>
  );
};

export default Profile;

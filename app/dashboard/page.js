"use client";
import { useState } from "react";
import theme from "../components/theme";
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
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import Checkbox from "@mui/material/Checkbox";
import BottomNav from "../components/bottom_nav";
import Navbar from "../components/navbar";

export default function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      {/* Navbar will go here */}
      <Navbar />
      {/* outer box  */}
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
        {/* Upcoming maintenance box */}
        <Box
          width="800px"
          mb="40px"
          sx={{
            boxShadow:
              "13px 15px 24px 0px rgba(255, 255, 255, 0.25), 6px 6px 4px 0px rgba(253, 255, 243, 0.25)",
          }}
        >
          <Card
            sx={{
              backgroundColor: "primary.secondary",
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
                <Typography variant="h6">Recent Maintenance Log</Typography>
                <Box>
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
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Bottom Navigation */}
        <BottomNav />
      </Box>
    </ThemeProvider>
  );
}

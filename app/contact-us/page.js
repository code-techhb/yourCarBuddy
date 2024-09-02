"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  ThemeProvider,
  Avatar,
  Link,
  Button,
  CssBaseline
} from "@mui/material";
import Theme from "../components/theme";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import Footer from "../components/footer";

export default function ContactUs() {
  //   // --------------------------------- UI ------------------------------------
  return (
    <ThemeProvider theme={Theme}>
      <Navbar></Navbar>
       <CssBaseline></CssBaseline>
       <Box
        width="100vw"
        minHeight="100vh"
        height= "100vh"
        //sx={{background: `${Theme.custom.hero_background_gradient}`}}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {/* Nav bar */}

        
        {/* Main Content */}
        <Box
        width="100vw"
        minHeight="100vh"
        sx={{background: `${Theme.custom.hero_background_gradient}`}}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
          {/* content */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            maxWidth="800px"
            width="100%"
            mb={4}
          >
            <Typography
              variant="h4"
              margin={4}
              align="center"
              sx={{
                fontFamily: "Paytone One",
                fontSize: "32px",
                fontSize: {
                  xs: "22px", 
                  sm: "28px", 
                  md: "40px", 
                  lg: "50px", 
                },
                fontStyle: "normal",
                fontWeight: 700,
                color: Theme.palette.text.white,
                mt: 2,
              }}
            >
              What would you like to see in this app to make it more accessible and helpful to you ?
            </Typography>

            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mt: 2, fontFamily: "Montserrat",
                color: Theme.palette.text.green, 
                fontSize: {
                  xs: "15px", 
                  sm: "18px", 
                  md: "25px", 
                  lg: "28px", 
                },}}
            >
              Reach out to the team on LinkedIn.
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            maxWidth="600px"
            width="100%"
          >
            {/* Avatar boxes */}
            <Box
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
              alignItems="center"
              margin={1}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mx={2}
                marginRight={5}
              >
                <Avatar
                  alt="Developer of CardCrafter 1"
                  src="/H.JPG"
                  sx={{ width: 100, height: 100, border: "2px solid #1D1632" }}
                />
                <Typography mt={1} align="center"
                sx={{
                  color: Theme.palette.text.white, 
                  fontSize: {
                    xs: "15px", 
                    sm: "18px", 
                    md: "25px", 
                    lg: "22px", 
                  },}}>
                  Houlaymatou B.
                </Typography>
                <Button
                  variant="contained"
                  href="https://www.linkedin.com/in/houlaymatoub/"
                  sx={{
                    mt: 1,
                    backgroundColor: Theme.palette.primary.secondary,
                    color: "text.light",
                    fontSize: "14px",
                    fontFamily: "Montserrat",
                    borderRadius: "16px",
                  }}
                >
                  LinkedIn
                </Button>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mx={2}
                marginRight={5}
              >
                <Avatar
                  alt="Developer of CardCrafter 2"
                  src="/g.png"
                  sx={{ width: 100, height: 100, border: "2px solid #1D1632" }}
                />
                <Typography mt={1} align="center" sx={{
                  color: Theme.palette.text.white, 
                  fontSize: {
                    xs: "15px", 
                    sm: "18px", 
                    md: "25px", 
                    lg: "22px", 
                  },}}>
                  Giovanni G.
                </Typography>

                <Button
                  variant="contained"
                  href="https://www.linkedin.com/in/giovanni-govert/"
                  sx={{
                    mt: 1,
                    backgroundColor: Theme.palette.primary.secondary,
                    color: "text.light",
                    fontSize: "14px",
                    fontFamily: "Montserrat",
                    borderRadius: "16px",
                  }}
                >
                  LinkedIn
                </Button>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mx={2}
              >
                <Avatar
                  alt="Developer of CardCrafter 2"
                  src="/K.jpg"
                  sx={{ width: 100, height: 100, border: "2px solid #1D1632" }}
                />
                <Typography mt={1} align="center" sx={{
                  color: Theme.palette.text.white, 
                  fontSize: {
                    xs: "15px", 
                    sm: "18px", 
                    md: "25px", 
                    lg: "22px", 
                  },}}>
                  Katherine L.
                </Typography>
                <Button
                  variant="contained"
                  href="https://www.linkedin.com/in/katherine-lazo-1a8349b2/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  sx={{
                    mt: 1,
                    backgroundColor: Theme.palette.primary.secondary,
                    color: "text.light",
                    fontSize: "14px",
                    fontFamily: "Montserrat",
                    borderRadius: "16px",
                  }}
                >
                  LinkedIn
                </Button>
              </Box>
            </Box>
          </Box>
          
        </Box>

    
        
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

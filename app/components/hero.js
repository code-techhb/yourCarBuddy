"use client";
import { Box, Typography, Button, ThemeProvider } from "@mui/material";
import { useRouter } from "next/navigation";
import Theme from "./theme";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const Hero = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  // ---------------------- handle function -----------------
  const RedirectToDashboard = async () => {
    if (!isSignedIn) {
      // Redirect to sign-in page if not signed in
      router.push("/sign-in");
    } else {
      // Redirect to the dashboard if signed in
      router.push("/dashboard");
    }
  };

  // useEffect(() => {
  //   if (!isSignedIn) {
  //     // Redirect to sign-in page if not signed in
  //     router.push("/sign-in");
  //   }
  // }, [isSignedIn, router]);

  return (
    <ThemeProvider theme={Theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        sx={{backgroundImage: `${Theme.custom.hero_background_gradient}, 
          url('car.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: '100vh',
        }}
      >
        <Box
          sx={{ maxWidth: "750px", textAlign: "center" }}
          display="flex"
          flexDirection={{ xs: "column", sm: "column" }}
          alignItems="center"
          gap={1}
          //mb={4}
        >
          <Typography
            variant="h6"
            sx={{
              margin: 2,
              marginBottom: 2,
              fontFamily: "Anton",
              fontSize: {
                xs: "36px",
                sm: "48px",
                md: "56px",
                lg: "68px",
              },
              fontWeight: "bold",
              color: Theme.palette.text.white,
              lineHeight: 1.3,
            }}
          >
            Is It not Time for a{" "}
            <span style={{ color: "#00D779" }}>Better Way</span> to{" "}
            <span style={{ color: "#00D779" }}>Care for Your Car?</span>
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "750px",
              textAlign: "center",
              margin: 2,
              marginBottom: 5,
              fontFamily: "Montserrat",
              fontSize: {
                xs: "16px",
                sm: "18px",
                md: "20px",
                lg: "24px",
              },
              color: "white",
              lineHeight: 1.3,
            }}
          >
            Discover how Car Buddy simplifies car maintenance with smart
            reminders and expert advice. Say goodbye to confusion and
            overpaying—experience effortless car care with just a few taps.{" "}
          </Typography>
        </Box>
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
            },
            color: "black",
            textTransform: "none",
          }}
          onClick={RedirectToDashboard}
        >
          Get Started
        </Button>
      </Box>
      <Box></Box>
    </ThemeProvider>
  );
};

export default Hero;

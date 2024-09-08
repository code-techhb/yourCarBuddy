"use client";
import {
  Box,
  Typography,
  Button,
  ThemeProvider,
  Grid,
  CssBaseline,
  Avatar,
} from "@mui/material";
import Theme from "./theme";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const MiddleHero = () => {
  // ---------------------- handle function -----------------

  const { isSignedIn } = useAuth();
  const router = useRouter();

  const RedirectToChatbot = async () => {
    if (!isSignedIn) {
      // Redirect to sign-in page if not signed in
      router.push("/sign-in");
    } else {
      // Redirect to the dashboard if signed in
      router.push("/chatbot");
    }
  };

  const RedirectToDashboard = async () => {
    if (!isSignedIn) {
      // Redirect to sign-in page if not signed in
      router.push("/sign-in");
    } else {
      // Redirect to the dashboard if signed in
      router.push("/dashboard");
    }
  };

  // ---------------------- UI -----------------

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${Theme.custom.hero_background_gradient}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: 'flex',
          minHeight:'100vh'
        }}

      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1220px",
            p: 4,
            borderRadius: 2,
            display: 'flex'
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={8} marginBottom={5}>
              <Box
                sx={{
                  p: 2,
                  // bgcolor: 'black',
                  textAlign: "left",
                  borderRadius: 1,
                  
                }}
                
              >
                <Box
                  sx={{ maxWidth: "750px", textAlign: "left" }}
                  display="flex"
                  flexDirection={{ xs: "column", sm: "column" }}
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
                        textAlign: "left",
                      },
                      fontWeight: "bold",
                      color: Theme.palette.text.white,
                      lineHeight: 1.3,
                    }}
                  >
                    Your Car’s Buddy
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      maxWidth: "750px",
                      textAlign: "left",
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
                    Got questions about dashboard lights, maintenance, or
                    service costs? Our AI chatbot is here to provide quick,
                    accurate answers. Simply ask and get the help you need
                    instantly!
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
                      marginLeft: 15,
                    },
                    color: "black",
                    textTransform: "none",
                  }}
                  onClick={RedirectToChatbot}
                >
                  JOIN NOW
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2,
                  //bgcolor: 'background.paper',
                  textAlign: "left",
                  borderRadius: 1,
                }}
              >
                 
                <Box  sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }} >
                  <Avatar
                    src="/buddy.png"
                    alt="FAQ Image"
                    sx={{
                      width: {xs:'250px', sm: '250px', lg: '310px'},
                      height: {xs:'250px', sm: '250px', lg: '310px'},
                      borderRadius: "50%",
                      background: "transparent",
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box
                  component="img"
                  src="/Rectangle_1.png"
                  alt="FAQ Image"
                  sx={{
                    width: {xs:'250px', sm: '250px', lg: '310px'},
                      height: {xs:'250px', sm: '250px', lg: '310px'},
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  p: 2,

                  textAlign: "left",
                }}
              >
                <Box
                  sx={{ maxWidth: "750px", textAlign: "left" }}
                  display="flex"
                  flexDirection={{ xs: "column", sm: "column" }}
                  gap={1}
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
                        textAlign: "left",
                      },
                      fontWeight: "bold",
                      color: Theme.palette.text.white,
                      lineHeight: 1.3,
                    }}
                  >
                    Stay on Top of Your Car's Maintenance
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      maxWidth: "750px",
                      textAlign: "left",
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
                    Receive timely reminders for a variety of essential services
                    like oil changes and more. Keep your vehicle in top shape
                    with our easy maintenance notifications.
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
                      marginLeft: 15,
                    },
                    color: "black",
                    textTransform: "none",
                  }}
                  onClick={RedirectToDashboard}
                >
                  GET REMINDERS
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MiddleHero;

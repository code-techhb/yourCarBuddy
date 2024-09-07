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

const MiddleHero = () => {
  const router = useRouter();
  // ---------------------- handle function -----------------
  const RedirectToChatbot = async () => {
    router.push("/chatbot");
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
          marginTop: 15,
          marginLeft: 5,
          marginRight: 5,
          marginRight: 5,
          marginBottom: 15,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1220px",
            p: 4,
            borderRadius: 2,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={8} marginBottom={15}>
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
                <Box>
                  <Avatar
                    src="/buddy.png"
                    alt="FAQ Image"
                    sx={{
                      width: 310,
                      height: 310,
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
                    width: 400,
                    height: 400,
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
                  href="/dashboard"
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

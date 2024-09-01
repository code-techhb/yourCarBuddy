'use client'
import { Box, Typography, Button, ThemeProvider } from "@mui/material";
//import StarIcon from "@mui/icons-material/Star";
import Theme from "./theme";


const Hero = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        
      >
        <Box
        sx={{ maxWidth: '750px', textAlign:'center' }}
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
            Isn't It Time for a{" "}
            <span style={{ color: "#00D779" }}>Better Way</span> to{" "}
            <span style={{ color: "#00D779" }}>Care for Your Car?</span>
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{maxWidth: '750px', textAlign:'center',
              margin: 2,
              marginBottom: 5,
              fontFamily: "Montserrat",
              fontSize: {
                xs: "16px", 
                sm: "18px", 
                md: "20px", 
                lg: "24px", 
              },
              color: 'white',
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
                        xs: '4px 20px', 
                        sm: '4px 20px', 
                        md: '8px 40px', 
                        lg: '8px 40px', 
                      },
                      color: 'black',
                      textTransform: 'none',
                    }}
                  >
                    CHAT NOW
                  </Button>
      </Box>
    <Box>
            
    </Box>
    </ThemeProvider>
  );
};

export default Hero;

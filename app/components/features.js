'use client';
import {
  Box,
  ThemeProvider,
  Grid,
  Typography,
  Button,
  Paper,
  Link,
} from '@mui/material';
import Theme from '../components/theme';

const FeaturesAI = () => {
  return (
    <ThemeProvider theme={Theme}>
      {/* Purple bg */}
      <Box
        padding="60px 20px"
        sx={{
          //backgroundColor: Theme.palette.primary.beige,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* Feature cards*/}
        <Box mb={6}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              textAlign: 'center',
              fontFamily: 'Paytone One',
              fontSize: '40px',
              fontStyle: Theme.typography.h2,
              fontWeight: 700,
              color: Theme.palette.primary.main,
              letterSpacing: 4
            }}
          >
            Features
          </Typography>
        </Box>

        {/* cards grid */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{
            maxWidth: 'md', // Limits the width on larger screens
            margin: '0 auto',
            mb: 6,
          }}
        >
          {/* AI Powered */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: Theme.palette.primary.beige,
                p: 4,
                borderRadius: 4,
                width: 'auto',
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                mx: 'auto', // Center the Paper item
                mb: 3, // Margin bottom to add spacing
              }}
            >
              <Box>
                <img
                  src="/maintenance.png"
                  width={100}
                  style={{ marginBottom: '0px' }}
                ></img>
              </Box>
              <Typography
                variant="h5"
                color="primary.light_purple"
                sx={{ fontWeight: 600, mb: 2, fontFamily: 'Poppins' }}
              >
                Smart Maintenance Reminders
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  color: 'primary.light_purple',
                  fontSize: '16px',
                }}
              >
                Get timely alerts for all your car’s maintenance needs.
              </Typography>
            </Paper>
          </Grid>

          {/* Effortless Experience */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: Theme.palette.primary.beige,
                p: 4,
                borderRadius: 4,
                width: 'auto',
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                mx: 'auto', // Center the Paper item
                mb: 3, // Margin bottom to add spacing
              }}
            >
              <Box>
                <img
                  src="/ai.png"
                  width={100}
                  style={{ marginBottom: '16px' }}
                ></img>
              </Box>
              <Typography
                variant="h5"
                color="primary.light_purple"
                sx={{ fontWeight: 600, mb: 2, fontFamily: 'Poppins' }}
              >
                AI Assistant
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  color: 'primary.light_purple',
                  fontSize: '16px',
                }}
              >
                Ask questions and get instant help from our intelligent assistant.
              </Typography>
            </Paper>
          </Grid>

          {/* Personalized Insights */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: Theme.palette.primary.beige,
                p: 4,
                borderRadius: 4,
                width: 'auto',
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                mx: 'auto', // Center the Paper item
                mb: 3, // Margin bottom to add spacing
              }}
            >
              <Box>
                <img
                  src="/log.png"
                  width={100}
                  style={{ marginBottom: '16px' }}
                ></img>
              </Box>
              <Typography
                variant="h5"
                color="primary.light_purple"
                sx={{ fontWeight: 600, mb: 2, fontFamily: 'Poppins' }}
              >
                Maintenance Log
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  color: 'primary.light_purple',
                  fontSize: '16px',
                }}
              >
                Track your car’s service history effortlessly.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default FeaturesAI;
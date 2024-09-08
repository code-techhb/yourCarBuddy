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
      {/* Purple background */}
      <Box
        padding={{ xs: '40px 10px', sm: '50px 15px', md: '60px 20px' }} // Responsive padding
        sx={{
          backgroundColor: "#D1DFBA",
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh', // Set minHeight to avoid overlaying and make it responsive
          boxSizing: 'border-box', // Ensure padding/margins are respected
          overflow: 'hidden',
          
        }}
      >
        {/* Feature cards */}
        <Box mb={6}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '30px', sm: '35px', md: '40px' }, // Responsive font size
              fontStyle: Theme.typography.h2,
              fontWeight: 700,
              color: Theme.palette.primary.main,
              letterSpacing: 4,
            }}
          >
            Features
          </Typography>
        </Box>

        {/* Cards grid */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{
            maxWidth: { xs: '100%', md: '80%' }, // Responsive maxWidth for grid
            margin: '10 auto',
            mb: 6,
          }}
        >
          {/* AI Powered */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: Theme.palette.primary.beige,
                p: { xs: 2, md: 4 }, // Responsive padding
                borderRadius: 4,
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                mx: 'auto',
                mb: 3,
              }}
            >
              <Box>
                <img
                  src="/maintenance.png"
                  width={100}
                  style={{ marginBottom: '0px' }}
                  alt="Maintenance"
                />
              </Box>
              <Typography
                variant="h5"
                color="primary.light_purple"
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Smart Maintenance Reminders
              </Typography>

              <Typography
                sx={{
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
                p: { xs: 2, md: 4 },
                borderRadius: 4,
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                mx: 'auto',
                mb: 3,
              }}
            >
              <Box>
                <img src="/ai.png" width={100} style={{ marginBottom: '16px' }} alt="AI" />
              </Box>
              <Typography
                variant="h5"
                color="primary.light_purple"
                sx={{ fontWeight: 600, mb: 2 }}
              >
                AI Assistant
              </Typography>

              <Typography
                sx={{
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
                p: { xs: 2, md: 4 },
                borderRadius: 4,
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                mx: 'auto',
                mb: 3,
              }}
            >
              <Box>
                <img
                  src="/log.png"
                  width={100}
                  style={{ marginBottom: '16px' }}
                  alt="Log"
                />
              </Box>
              <Typography
                variant="h5"
                color="primary.light_purple"
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Maintenance Log
              </Typography>

              <Typography
                sx={{
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

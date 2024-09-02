'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { FormControl, CssBaseline, Box, Label, ThemeProvider, Typography, Button, 
    TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Paper
 } from '@mui/material';
import Theme from "../components/theme"
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/navbar';
import Footer from '../components/footer';


function createData(VIN, make, model, year, mileage) {
    return { VIN, make, model, year, mileage };
  }
  
  const rows = [
    createData('12343534345', 'TOYOTA', 'COROLA', 2022, 1234),
    createData('223DF353434', 'NISSAN', 'CENTRA', 2009, 12434),
    createData('F3534MN3N32', 'TOYOTA', 'PRIUS', 2015, 12323),
    createData('3423N4KJN42', 'MAZDA', 'MAZDA3', 2024, 8463),
    createData('K2N34KJ3N2K', 'FORD', 'FOCUS', 2003, 189224),
  ];

const Profile = () => {
  return (
    <ThemeProvider theme={Theme}>
    <CssBaseline />
<Navbar />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '100%',
          flexDirection: 'column',
          width: '10vw',
          height: "100vh",
          background: "#D1DFBA",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        
        <Box
          sx={{
            width: '100%', 
            maxWidth: '1220px', 
            p: 4,
            borderRadius: 5,
            maxWidth: '1000px', // Adjust this to make the box bigger
            border: '2px solid #ccc', // Add border for visual emphasis
            bgcolor:'white',
            display: 'flex',
            marginBottom: 2,
          }}
        >
            <Box 
                sx={{display:'flex', flexDirection: 'column', width:'800px'}}
                borderRadius={5}
                >
                    <Typography
                    marginLeft={2}>Hello Carbuddy</Typography> 
                    <Typography
                    marginLeft={2}>Email</Typography> 
            </Box>
        
    </Box>
    <Box
          sx={{
            width: '100%', 
            maxWidth: '1000px', 
            p: 4,
            borderRadius: 5,
            border: '2px solid #ccc',
            bgcolor:'white',
          
          }}
        >
            <Box sx={{ display: 'flex', p: 1, borderRadius: 1, width:'100%' }}>
                <Box
                 sx={{width: '100%' }}
                >
                <Typography align='left' sx={{display: 'flex', flexGrow: 1}} >Your Garage</Typography>    
                </Box>
                <Box sx={{ flexDirection: 'row-reverse' }}>
                <Button variant="outlined" sx={{borderRadius:'9'}}>Edit</Button>
                </Box>
            </Box>

          <Box marginTop={5}>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{fontWeight: 'bold', fontSize: 22}} >Brand</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold', fontSize: 22}}>Vin#</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold', fontSize: 22}}>Make</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold', fontSize: 22}}>Model</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold', fontSize: 22}}>Mileage</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold', fontSize: 22}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.VIN}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.VIN}
              </TableCell>
              <TableCell align="right">{row.make}</TableCell>
              <TableCell align="right">{row.model}</TableCell>
              <TableCell align="right">{row.year}</TableCell>
              <TableCell align="right">{row.mileage}</TableCell>
              <TableCell align="right">
                        <DeleteIcon 
                          sx={{ cursor: 'pointer', color: 'GREY' }} 
                          onClick={() => console.log('Delete', row.VIN)} 
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
                        xs: '4px 20px', 
                        sm: '4px 20px', 
                        md: '8px 40px', 
                        lg: '8px 40px', 
                        marginLeft: 15,
                      },
                      color: 'black',
                      textTransform: 'none',
                    }}
                  >
                    ADD A NEW VEHICLE
                  </Button>
        </Box>
    </Box>
    <Footer></Footer>
    </ThemeProvider>
  );
}

export default Profile;
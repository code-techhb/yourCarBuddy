'use client'
import { AppBar, Toolbar, Button, Box, 
    ThemeProvider,InputAdornment
  ,DialogTitle, Dialog, DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material";
  import Theme from "./theme";
  import { useRouter } from "next/navigation";
  import React, { useEffect } from "react";
  
  const Navbar = () => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const handleRedirectContactUs = () => {
      router.push("/contact-us");
    };
    const handleRedirectFaq = () => {
      router.push("/faq");
    };
  
    
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    // _____________________________ Nav Bar UI _____________________________
  
    return (
      <ThemeProvider theme={Theme}>
        <AppBar
          position="static"
          //sx={{ backgroundColor: 'black' }}
          elevation={0}
        >
          <Toolbar>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box>
                <a href="/" >
                  <img
                    src="/logo.png"
                    href="/"
                    width={70}
                    height={31}
                    alt="logo car buddy"
                    
                  />
                </a>
              </Box>
              <Box >
                {/* <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "16px",
                    boxShadow: "none",
                    fontFamily: "Poppins",
                    backgroundColor: Theme.palette.primary.dark,
                    "&:hover": {
                      bgcolor: Theme.palette.text.darker,
                    },
                  }}
                  onClick={handleRedirectChatbot}
                >
                  Chat with AI
                </Button> */}
                <Button
                  variant="text"
                  sx={{
                    boxShadow: "none",
                    fontFamily: "Montserrat",
                    color: Theme.palette.text.green,
                    fontSize: {
                      xs: "10px", 
                      sm: "12px", 
                      md: "12px", 
                      lg: "18px", 
                    },
                    padding: {
                      xs: '4px 5px 4px 20px', 
                      sm: '4px 5px 4px 20px', 
                      md: '4px 30px 4px 30px', 
                      lg: '4px 30px 4px 30px', 
                    },
                    textDecoration: "none", 
                    "&:hover": {
                      textDecoration: "underline", 
                    },
                  }}
                  onClick={handleRedirectFaq}
                >
                  FAQ
                </Button>
                <Button
                  variant="text"
                  sx={{
                    boxShadow: "none",
                    fontFamily: "Montserrat",
                    fontSize: {
                      xs: "10px", 
                      sm: "12px", 
                      md: "12px", 
                      lg: "18px", 
                    },
                    padding: {
                      xs: '4px 20px 4px 0px', 
                      sm: '4px 20px, 4px 0px', 
                      md: '8px 30px 4px 0px', 
                      lg: '8px 30px 4px 0px', 
                    },
                    color: Theme.palette.text.green,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline", 
                    },
                  }}
                  onClick={handleRedirectContactUs}
                >
                  Contact US
                </Button>
  
  
                <React.Fragment>
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
                    onClick={handleClickOpen}
                  >
                    LOG IN
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        background: `linear-gradient(to bottom, black, #005852)`, 
                        borderRadius: 6, // Add borderRadius
                      },
                      component: 'form',
                      onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                      },
                    }}
                  >
                    <DialogTitle sx={{
              color: Theme.palette.primary.green, // Change title color to green
            }}
                  ></DialogTitle>
                    <DialogContent sx={{
                          color: 'white', // Change title color to green
                        }}>
                      <DialogContentText sx={{
              color: Theme.palette.primary.green, // Change title color to green
            }} >
                        Get in!
                      </DialogContentText >
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        InputLabelProps={{
                          sx: { color: 'white' }, // Change label color to white
                        }}
                        InputProps={{
                          sx: { color: 'white' }, // Change input text color to white
                        }}
                        
                        
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button variant="text" onClick={handleClose} sx={{
                      color: Theme.palette.text.green}}>Cancel</Button>
                      <Button variant="text" type="submit" sx={{
                      color: Theme.palette.text.green,}}>Subscribe</Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  };
  
  export default Navbar;
  
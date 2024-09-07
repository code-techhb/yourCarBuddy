"use client";
import { AppBar, Toolbar, Button, Box, ThemeProvider } from "@mui/material";
import Theme from "./theme";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";

const Navbar = () => {
  // --------------------- event handler function ------------------
  const router = useRouter();
  const { isSignedIn } = useAuth();

  // Effect to redirect after sign-in
  useEffect(() => {
    const hasRedirected = sessionStorage.getItem("hasRedirected");

    if (isSignedIn && !hasRedirected) {
      sessionStorage.setItem("hasRedirected", "true");
      router.push("/register"); // Redirect to the register page after signing in
    }
  }, [isSignedIn, router]);

  const handleRedirectLoginPage = () => {
    router.push("/sign-in");
  };

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

  const handleRedirectSUpport = () => {
    router.push("/support");
  };

  // _____________________________ Nav Bar UI _____________________________

  return (
    <ThemeProvider theme={Theme}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100vw" }}
          >
            <Box>
              <a href="/">
                <img
                  src="/logo.png"
                  href="/"
                  width={70}
                  height={31}
                  alt="logo car buddy"
                />
              </a>
            </Box>
            <Box>
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
              <SignedOut>
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
                      xs: "4px 5px 4px 20px",
                      sm: "4px 5px 4px 20px",
                      md: "4px 30px 4px 30px",
                      lg: "4px 30px 4px 30px",
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
                      xs: "4px 20px 4px 0px",
                      sm: "4px 20px, 4px 0px",
                      md: "8px 30px 4px 0px",
                      lg: "8px 30px 4px 0px",
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

                <SignInButton>
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
                      borderRadius: "16px",
                      padding: {
                        xs: "4px 20px 4px 0px",
                        sm: "4px 20px, 4px 0px",
                        md: "8px 30px 4px 0px",
                        lg: "8px 30px 4px 0px",
                      },
                      color: Theme.palette.text.green,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    LOG IN
                  </Button>
                </SignInButton>

                <SignUpButton>
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
                      borderRadius: "16px",
                      padding: {
                        xs: "4px 20px 4px 0px",
                        sm: "4px 20px, 4px 0px",
                        md: "8px 30px 4px 0px",
                        lg: "8px 30px 4px 0px",
                      },
                      color: Theme.palette.text.green,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    SIGN UP
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
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
                      xs: "4px 20px 4px 0px",
                      sm: "4px 20px, 4px 0px",
                      md: "8px 30px 4px 0px",
                      lg: "8px 30px 4px 0px",
                    },
                    color: Theme.palette.text.green,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={handleRedirectSUpport}
                >
                  Support
                </Button>

                <UserButton />
              </SignedIn>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;

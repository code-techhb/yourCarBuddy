"use client";
import theme from "@/app/components/theme";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { ThemeProvider, Box, Paper, Typography, Button } from "@mui/material";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Theme from "@/app/components/theme";
// ---------------------- const vars -----------------
const clerkTheme = {
  variables: {
    fontSize: "16px",
    fontFamily: "Montserrat",
  },
};

export default function SignInPage() {
  const router = useRouter();

  // ----------------- UI ------------------
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: Theme,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "primary.main",
        }}
      >
        {/* Nav bar */}
        <Navbar />
        {/* form bg */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            //elevation={24}
            sx={{
              p: 4,
              maxWidth: "sm",
              width: "100%",
              backgroundColor: "primary.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              mb="10px"
              sx={{
                textAlign: "center",
                fontFamily: "Anton",
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: 700,
                color: Theme.palette.text.green,
                marginBottom: "40px",
                lineHeight: "1.5 !important", // Force the line height to apply
                letterSpacing: "0.05em",
              }}
            >
              Happy to see you back 🎊
            </Typography>
            <SignIn
              appearance={{
                baseTheme: clerkTheme,
                variables: { colorPrimary: "#00D779" },
              }}
            />
          </Paper>
        </Box>

        {/* footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

"use client";
import theme from "@/app/components/theme";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { ThemeProvider, Box, Paper, Typography, Button } from "@mui/material";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// ---------------------- const vars -----------------
const clerkTheme = {
  variables: {
    fontSize: "16px",
    // fontFamily: 'Lato',
  },
};

export default function SignUpPage() {
  const router = useRouter();
  // ---------------------- handle function -----------------
  const goBack = async () => {
    router.push("/");
  };
  // ----------------- UI ------------------
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: Theme,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Nav bar */}
        <Navbar />

        {/* Go Back Button */}
        <Box position="absolute" top={130} left={20}>
          <Button variant="contained" onClick={goBack}>
            Go Back
          </Button>
        </Box>

        {/* form bg */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={24}
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
                fontFamily: "Mina",
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: 700,
                color: "text.light",
              }}
            >
              Happy to see you back 🎊
            </Typography>
            <SignIn appearance={{ baseTheme: clerkTheme }} />
          </Paper>
        </Box>

        {/* footer */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

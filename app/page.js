"use client";
import { ThemeProvider, Box, CssBaseline } from "@mui/material";
import Hero from "./components/hero";
import Head from "next/head";
import Navbar from "./components/navbar";
import Theme from "./components/theme";
import MiddleHero from "./components/hero2";
import FeaturesAI from "./components/features";
import Footer from "./components/footer";
import { useAuthRedirection } from "./utils/authRedirection";

export default function Home() {
  useAuthRedirection();
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Head>
        <title>Car Buddy</title>
        <meta name="description" content="Car Buddy"></meta>
      </Head>

      <Box 
      >
        <Navbar />
        <Box >
          <Hero></Hero>
          <MiddleHero />
          <FeaturesAI />
        </Box>
      </Box>

      <Footer></Footer>
    </ThemeProvider>
  );
}

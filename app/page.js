"use client";

import Image from "next/image";
//import styles from "./page.module.css";
import { ThemeProvider, Box, CssBaseline } from "@mui/material";
import Hero from "./components/hero";
import Head from "next/head";
import Navbar from "./components/navbar";
import Theme from "./components/theme";
import MiddleHero from "./components/hero2";
import FeaturesAI from "./components/features";
import Footer from "./components/footer";
import Profile from "./profile/page";
import { ClerkProvider } from "@clerk/nextjs";

export default function Home() {
  return (
    <ClerkProvider>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Head>
          <title>Car Buddy</title>
          <meta name="description" content="Car Buddy"></meta>
        </Head>

        <Box
          sx={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",

            height: "100vh",
            backgroundImage: `${Theme.custom.hero_background_gradient}, 
                              url('car.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Navbar />
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Hero></Hero>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: `${Theme.custom.hero_background_gradient}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MiddleHero />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "#D1DFBA",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <FeaturesAI />
        </Box>

        <Footer></Footer>
      </ThemeProvider>
    </ClerkProvider>
  );
}

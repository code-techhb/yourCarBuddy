"use client";
import Image from "next/image";
import { ThemeProvider, Box, CssBaseline } from "@mui/material";
import Hero from "./components/hero";
import Head from "next/head";
import Navbar from "./components/navbar";
import Theme from "./components/theme";
import MiddleHero from "./components/hero2";
import FeaturesAI from "./components/features";
import Footer from "./components/footer";
import Profile from "./profile/page";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthRedirection } from "./utils/authRedirection";

export default function Home() {
  useAuthRedirection();

  // const { isSignedIn, isLoaded } = useAuth();
  // const router = useRouter();
  // const [hasRedirected, setHasRedirected] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setHasRedirected(sessionStorage.getItem("hasRedirected") === "true");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isLoaded && isSignedIn && !hasRedirected) {
  //     sessionStorage.setItem("hasRedirected", "true");
  //     setHasRedirected(true);
  //     router.push("/dashboard");
  //   }
  // }, [isSignedIn, isLoaded, hasRedirected, router]);

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

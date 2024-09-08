import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import GoogleAnalytics from "./components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Car Buddy",
  description:
    "Car Buddy simplifies your car maintenance with smart reminders and insightful advice. Say goodbye to confusion and overpaying—experience effortless car care with just a few taps.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={inter.className}>
          {children}
          <GoogleAnalytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

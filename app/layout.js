import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "your Car Buddy",
  description:
    "Car Buddy simplifies your car maintenance with smart reminders and insightful advice. Say goodbye to confusion and overpaying—experience effortless car care with just a few taps.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
    </ClerkProvider>
    
  );
}

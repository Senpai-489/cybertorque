import type { Metadata } from "next";
import { Stint_Ultra_Expanded } from "next/font/google";
import "./globals.css";
import Navbar from "./components/homepage/Navbar";
import Footer from "./components/homepage/Footer";

const stint = Stint_Ultra_Expanded({
  variable: "--font-stint",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Cyber Torque",
  description: "Exotic Car Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={stint.variable}>
    
      <body>{children}</body>
     
    </html>
  );
}
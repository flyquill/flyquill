import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FlyQuill - Where Ideas Take Flight",
  description: "Discover thought-provoking articles, share your knowledge, and connect with a community of passionate writers.",
  keywords: "blog, writing, articles, creative writing, blogging platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
            {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

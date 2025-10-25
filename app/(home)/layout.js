import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "../_components/blog/Sidebar";
import Navbar from "../_components/blog/Navbar";
import Footer from "../_components/blog/Footer";
import NextTopLoader from "nextjs-toploader";

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
  description:
    "Discover thought-provoking articles, share your knowledge, and connect with a community of passionate writers.",
  keywords: "blog, writing, articles, creative writing, blogging platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white justify-center`}
        >
          <NextTopLoader showSpinner={false} />
          <Navbar />
          <div className="max-w-7xl mx-auto lg:flex gap-8 px-4">
            <main className="flex-1">{children}</main>
            <Sidebar />
          </div>
          <Footer />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

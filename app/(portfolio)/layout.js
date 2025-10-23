import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "portfolio",
  description: "Discover thought-provoking articles, share your knowledge, and connect with a community of passionate writers.",
  keywords: "blog, writing, articles, creative writing, blogging platform",
};

export default function Layout({ children }) {
  return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
        </body>
      </html>
  );
}

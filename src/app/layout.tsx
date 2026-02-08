import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const against = localFont({
  src: "./fonts/Against.ttf",
  variable: "--font-hero",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nivedh's Portfolio",
  description: "AI Engineer & CSE Student Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${against.variable} font-sans`}>{children}</body>
    </html>
  );
}
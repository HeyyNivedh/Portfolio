import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";  // <--- THIS IS THE MAGIC LINE YOU WERE MISSING

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
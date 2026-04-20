import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import ScrollCounter from "@/components/ScrollCounter/ScrollCounter";

export const metadata: Metadata = {
  title: "Gearsum",
  description: "Gearsum — your gear, your style.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ScrollCounter />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Goldyverse Trade Zone",
  description: "Track your prediction markets, picks, and crypto trades",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen pb-20 md:pb-0 md:pt-16">
          {children}
        </main>
        <NavBar />
      </body>
    </html>
  );
}

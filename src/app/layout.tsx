import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Provider/Provider";


export const metadata: Metadata = {
  title: "TrekTrax Travel Buddy",
  description: "Travel Buddy App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <div className="min-h-screen">{children}</div>
        </body>
      </html>
    </Providers>
  );
}


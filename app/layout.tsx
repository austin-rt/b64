import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { FileProvider } from "./context/FileContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "b64",
  description: "Convert files to DataURIs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={
            "bg-gradient-to-br from-pink-200 via-yellow-200 via-green-200 to-purple-200 min-h-screen " +
            inter.className
          }
        >
          <FileProvider>{children}</FileProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

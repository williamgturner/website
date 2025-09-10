import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // adjust path to where your Navbar is

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "will turner",
  description: "will turner's personal website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inconsolata.className} antialiased`}>
        <div className="flex flex-row w-screen, h-screen">
          <Navbar />
          <main className="flex flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}

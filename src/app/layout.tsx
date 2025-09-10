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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" }]
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inconsolata.className} antialiased`}>
        <div className="flex flex-row w-screen, h-screen">
          <Navbar />
          <main className="flex flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}

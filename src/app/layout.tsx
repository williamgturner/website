import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScribbleWrapper from "@/components/ScribbleWrapper"; // path to the wrapper

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "William Turner",
  description: "William Turner's personal website",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inconsolata.className} antialiased`}>
        <div className="flex flex-row w-screen h-screen">
          <Navbar />
          <ScribbleWrapper>
            <main className="h-screen flex flex-1 overflow-y-auto overflow-x-hidden">
              {children}
            </main>
          </ScribbleWrapper>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Quicksand, Delius_Swash_Caps, Poppins } from "next/font/google";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/site/footer";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const deliusSwashCaps = Delius_Swash_Caps({
  variable: "--font-delius-swash-caps",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Tomato",
  description:
    "Work should be hyggeligt. A cozy pomodoro timer for minimalists. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${poppins.variable} ${deliusSwashCaps.variable} antialiased`}
      >
        <header className="relative m-auto max-w-content z-50">
          <Navbar />
        </header>
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}

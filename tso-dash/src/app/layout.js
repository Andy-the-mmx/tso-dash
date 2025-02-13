import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Techsales Online",
  description: "Making life better for Naj and Emad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='text-stone-900 bg-stone-100'>
        {children}
      </body>
    </html>
  );
}

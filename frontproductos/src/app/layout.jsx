import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import "primeicons/primeicons.css";
import 'primereact/resources/primereact.css';
import "./globals.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Productos",
  description: "Crud Productos  ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <div className="h-[calc(100vh-5rem)] container mx-auto">
           {children}
        </div>
      </body>
    </html>
  );
}

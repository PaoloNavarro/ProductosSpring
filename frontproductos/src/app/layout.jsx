import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import "primeicons/primeicons.css";
import 'primereact/resources/primereact.css';
import "./globals.css";
//import 'bootstrap/dist/css/bootstrap.min.css';




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Productos",
  description: "Crud Productos  ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          body {
            font-family: ${inter};
            background-color: #f4f4f4;
          }
          .container-fluid {
            margin-top: 20px;
          }
        `}</style>
      </head>
      <body>
        <Navbar/>
        <div className="container-fluid">
          {children}
        </div>
      </body>
    </html>
  );
}

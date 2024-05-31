import React from "react";
import { Inter } from "next/font/google";
import { StoreProvider } from "../GlobalRedux/StoreProvider";
import { Providers } from "../providers";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sonova App",
  description: "Data Management Solutions",
};

function RootLayout(props: { children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={inter.className}
        style={{ backgroundColor: "#2f2f2f", height: "100vh" }}
      >
        <StoreProvider>
          <Providers>{props.children}</Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
export default RootLayout;

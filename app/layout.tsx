import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orit's Fashion | Elegance in Every Stitch",
  description:
    "Discover bespoke fashion by Orit's Fashion. From stunning women's wear to elegant men's garments, knitted wear, and children's clothing — designed to make you feel confident, beautiful, and uniquely you.",
  keywords: [
    "fashion",
    "designer",
    "bespoke",
    "women's wear",
    "men's wear",
    "children's clothing",
    "knitted wear",
    "Nigerian fashion",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1c1917",
              color: "#fafaf9",
              borderRadius: "2px",
            },
          }}
        />
      </body>
    </html>
  );
}

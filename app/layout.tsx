import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Orit's Fashion | Elegance in Every Stitch",
    template: "%s | Orit's Fashion",
  },
  description:
    "Discover bespoke fashion by Orit's Fashion, Lagos Nigeria. From stunning women's wear to elegant men's garments, children's clothing and ceremonial attire — designed to make you feel confident, beautiful, and uniquely you.",
  keywords: [
    "fashion",
    "designer",
    "bespoke",
    "women's wear",
    "men's wear",
    "children's clothing",
    "Nigerian fashion",
    "Lagos fashion designer",
    "custom clothing Nigeria",
    "Ankara fashion",
  ],
  authors: [{ name: "Orit's Fashion" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://oritsfashion.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Orit's Fashion",
    title: "Orit's Fashion | Elegance in Every Stitch",
    description:
      "Bespoke fashion by Orit's Fashion, Lagos Nigeria. Custom-crafted garments designed to make you feel confident, beautiful, and uniquely you.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Orit's Fashion — Elegance in Every Stitch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orit's Fashion | Elegance in Every Stitch",
    description: "Bespoke fashion by Orit's Fashion, Lagos Nigeria.",
    images: ["/og-image.jpg"],
  },
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

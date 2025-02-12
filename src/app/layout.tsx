import type { Metadata } from "next";
import "./globals.scss";


export const metadata: Metadata = {
  title: "Ipt and Gptc",
  description: "Computer Engineering Department",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

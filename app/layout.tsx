import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import Nav from "./component/Nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Career Pulse",
  description:
    "My vision is to create a fun interactive but informative real-time platform to provide users the current status of the tech job market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <Nav />
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  );
}

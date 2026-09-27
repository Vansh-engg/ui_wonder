import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Wanderworld Holidays | Invoice Generator System",
  description: "Official Wanderworld Holidays Invoice Generator & Operations System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} h-full antialiased font-sans`}>
      <body className={`${sora.className} min-h-full flex flex-col font-sans`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const clearface = localFont({
  src: [
    { path: "./fonts/ClearfaceStd-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ClearfaceStd-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-clearface",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'Alos Health | Your Nutrition Care Process Assistant',
  description: 'Streamline your Nutrition Care Process with our intuitive platform.',
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${clearface.variable} ${inter.variable} font-sans antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

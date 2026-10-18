import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CookieBanner from "@/components/cookies/CookieBanner";
import Analytics from "@/components/cookies/Analytics";

const clearface = localFont({
  src: [
    { path: "./fonts/ClearfaceStd-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ClearfaceStd-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-clearface",
});

export const metadata: Metadata = {
  title: 'Alos Health | O seu espaço de decisão nutricional',
  description: 'O primeiro software construído sobre o Processo de Cuidado Nutricional.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      className={`${clearface.variable} font-sans antialiased`}>
      <body className="min-h-full flex flex-col relative">
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
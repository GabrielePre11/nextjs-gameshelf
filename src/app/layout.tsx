import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Redux
import { Providers } from "./providers";

// Clerk
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontOutfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameShelf",
  description:
    "Explore and manage your favorite video games with GameShelf, a personal project powered by the RAWG API. Discover new titles, filter by genre, platform, and more!",
  keywords: [
    "GameShelf",
    "video games",
    "game library",
    "RAWG API",
    "game search",
    "gaming collection",
    "game discovery",
    "game management",
    "game genres",
    "game platforms",
    "PC",
    "Playstation",
    "Xbox",
    "Nintendo",
  ],
  authors: [
    {
      name: "Gabriele Prestano",
      url: "https://www.linkedin.com/in/prestano-gabriele/",
    },
  ],
  openGraph: {
    title: "GameShelf",
    description:
      "Explore and manage your favorite video games with GameShelf, a personal project powered by the RAWG API. Discover new titles, filter by genre, platform, and more!",
    siteName: "GameShelf",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fontOutfit.variable} antialiased`}
      >
        <ClerkProvider>
          <Providers>
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}

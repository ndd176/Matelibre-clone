// Tách phần client component ra riêng
'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bebas_Neue } from 'next/font/google'
import "./globals.css";
import { Providers } from './providers';
import LenisWrapper from '@/components/layout/LenisWrapper'
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/components/sections/FAQSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import PageTransition from '@/components/PageTransition';

// Font definitions
const studioProRegular = localFont({
  src: '../assets/fonts/studio-pro-regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-studio-pro-regular',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
})

const studioProBold = localFont({
  src: '../assets/fonts/studio-pro-bold.ttf',
  weight: '700',
  style: 'normal',
  variable: '--font-studio-pro-bold',
  display: 'swap',
});

const metadata: Metadata = {
  title: "Mate Libre",
  description: "Naturally Bold",
};


function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()

  useEffect(() => {
    // Sử dụng setTimeout để đảm bảo scroll hoạt động sau khi route đã thay đổi
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }, 0);
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={`${studioProRegular.variable} ${studioProBold.variable} ${bebasNeue.variable} antialiased font-studio-pro font-bebas overflow-x-hidden`}
      >
        <PageTransition />
        <LenisWrapper />
        <Header/>
        <Providers>{children}</Providers>
        <FAQSection />
        <Footer/>
        <ScrollToTopButton />
      </body>
    </html>
  );
}

// Export default component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
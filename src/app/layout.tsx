// Tách phần client component ra riêng
'use client'
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bebas_Neue } from 'next/font/google'
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
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
})

const metadata: Metadata = {
  title: "Mate Libre",
  description: "Tự nhiên và mạnh mẽ",
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
        className={`${plusJakartaSans.variable} ${bebasNeue.variable} antialiased font-plus-jakarta-sans font-bebas overflow-x-hidden`}
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
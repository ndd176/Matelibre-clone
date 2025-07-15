
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

export const metadata: Metadata = {
  title: "Mate Libre",
  description: "Naturally Bold",
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
 
{
  return (
    <html lang="en">
      <body
        className={`${studioProRegular.variable} ${studioProBold.variable} ${bebasNeue.variable} antialiased font-studio-pro font-bebas overflow-x-hidden`}
      >
        <LenisWrapper /> {/* ✅ Hook Lenis chạy tại đây */}
        <Header/>
        <Providers>{children}</Providers>
              <FAQSection />

                <Footer/>
        <ScrollToTopButton />

      </body>
    </html>
  );
}
'use client'
import { Providers } from './providers';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/components/sections/FAQSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import PageTransition from '@/components/PageTransition';
import CursorTooltip from "@/components/ui/CursorTooltip";

export default function RootLayoutClient({
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
    <>
      <PageTransition />
      <Header/>
      <Providers>{children}</Providers>
      <FAQSection />
      <Footer/>
      <ScrollToTopButton />
      <CursorTooltip/>
    </>
  );
}

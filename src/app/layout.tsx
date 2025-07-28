import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bebas_Neue } from 'next/font/google'
import "./globals.css";
import RootLayoutClient from './RootLayoutClient';

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

export const metadata: Metadata = {
  title: "Ethan Ecom",
  description: "Đồng lòng đồng sức bứt phá gặt thành công",
  icons: {
    icon: [
      {
        url: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico',
        sizes: '48x48',
      },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Ethan Ecom",
    description: "Đồng lòng đồng sức bứt phá gặt thành công, được khơi nguồn từ đam mê trong lĩnh vực thương mại sáng tạo, Ethan Ecom ra đời với sứ mệnh kết hợp giữa những thiết kế táo bạo.",
    url: "https://ethanecom.com", // <-- thay bằng URL thật của bạn
    siteName: "Ethan Ecom",
    images: [
      {
        url: "https://ethanecom.com/images/IMG_1011.jpg", // <-- ảnh đại diện link (1200x630)
        width: 1200,
        height: 630,
        alt: "Ethan Ecom Preview",
      },
    ],
    type: "website",
  },
};

// Export default component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${bebasNeue.variable} antialiased font-plus-jakarta-sans font-bebas overflow-x-hidden`}
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}

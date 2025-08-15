import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Over Limitation - Sự kiện Ethan',
  description: 'Khám phá hành trình vượt qua giới hạn của team Ethan trong sự kiện Over Limitation. Những khoảnh khắc đáng nhớ và tinh thần đoàn kết.',
  keywords: ['Ethan', 'Over Limitation', 'sự kiện', 'team building', 'công ty'],
  openGraph: {
    title: 'Over Limitation - Sự kiện Ethan',
    description: 'Khám phá hành trình vượt qua giới hạn của team Ethan trong sự kiện Over Limitation.',
    type: 'website',
  },
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

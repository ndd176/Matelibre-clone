'use client'

import { motion } from 'framer-motion'

interface MarqueeProps {
  text: string
  speed?: number
  fontSize?: string
  opacity?: number
  textColor?: string
  reverse?: boolean
  outlined?: boolean
}

export default function Marquee({
  text,
  speed = 0,
  fontSize = 'text-6xl',
  opacity = 1,
  textColor = 'text-black',
  reverse = false,
  outlined = false,
}: MarqueeProps) {
  return (
    <div className="overflow-hidden py-2 relative" style={{ opacity }}>
      <motion.div
        className={`flex whitespace-nowrap ${reverse ? 'flex-row-reverse' : ''}`}
        animate={{ x: reverse ? ['0%', '100%'] : ['0%', '-100%'] }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: 'linear',
        }}
      >
        <MarqueeContent text={text} fontSize={fontSize} textColor={textColor} outlined={outlined} />
        <MarqueeContent text={text} fontSize={fontSize} textColor={textColor} outlined={outlined} />
      </motion.div>
    </div>
  )
}

function MarqueeContent({
  text,
  fontSize,
  textColor,
  outlined,
}: {
  text: string
  fontSize: string
  textColor: string
  outlined: boolean
}) {
  const baseStyle = `${fontSize} tracking-wide px-12 space-x-24`
  const outlinedStyle = outlined
    ? 'text-transparent stroke-black [text-stroke-width:1px] [-webkit-text-stroke:1px_black]'
    : textColor

  return (
    <div 
      className={`flex font-bebas ${baseStyle} ${outlinedStyle}`}
    >
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <span key={i}>{text}</span>
        ))}
    </div>
  )
}

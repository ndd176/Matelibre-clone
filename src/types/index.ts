export interface NavItem {
  label: string
  href: string
}

export interface FooterLink {
  label: string
  href: string
}

export interface SlideData {
  word: string
  image: string
}

export interface ProductCard {
  id: string
  title: string
  description: string
  image: string
  price?: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar?: string
}

export interface AnimationProps {
  duration?: number
  delay?: number
  ease?: number[]
}

// Motion component props
export interface MotionProps extends AnimationProps {
  initial?: any
  animate?: any
  exit?: any
  whileHover?: any
  whileTap?: any
}

// Page meta data
export interface PageMeta {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
}

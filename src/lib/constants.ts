// Animation constants
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.4,
  SLOW: 0.8,
  VERY_SLOW: 1.2
} as const

export const EASE = {
  DEFAULT: [0.25, 0.46, 0.45, 0.94],
  BOUNCE: [0.68, -0.55, 0.265, 1.55],
  EASE_OUT: [0.25, 0.46, 0.45, 0.94],
  EASE_IN_OUT: [0.42, 0, 0.58, 1]
} as const

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const

// Z-index layers
export const Z_INDEX = {
  HEADER: 50,
  MENU: 5000,
  MODAL: 5001,
  TOOLTIP: 9999
} as const

// Navigation items
export const NAV_ITEMS = [
  { label: 'about', href: '/about' },
  { label: 'careers', href: '/careers' },
  { label: 'community', href: '/community' }
] as const

// Footer links
export const FOOTER_LINKS = {
  MAIN: [
    { label: 'wholesale', href: '#' },
    { label: 'faq', href: '#' },
    { label: 'contact', href: '#' }
  ],
  LEGAL: [
    { label: 'privacy policy', href: '#' },
    { label: 'terms & conditions', href: '#' },
    { label: 'cookie preferences', href: '#' }
  ]
} as const

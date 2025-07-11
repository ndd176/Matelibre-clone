# Component Usage Guide

## 📚 Import Guidelines

### Barrel Exports (Recommended)

Use the centralized import for cleaner code:

```tsx
// ✅ Good - Single import from barrel
import { Header, Footer, ParallaxHero, SlidingText } from '@/components'

// ❌ Avoid - Multiple specific imports
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ParallaxHero from '@/components/sections/ParallaxHero'
```

### Direct Imports

When you need specific components:

```tsx
// Layout Components
import { Header, Footer, LenisWrapper } from '@/components'

// Section Components
import { ParallaxHero, CommitmentSection, CommunitySection } from '@/components'

// UI Components
import { AnimatedEnvelope, PlantButton, FloatingImage } from '@/components'
```

## 🏗️ Component Categories

### Layout (`src/components/layout/`)

- **Header.tsx** - Main navigation with sticky behavior
- **Footer.tsx** - Site footer with animated elements
- **LenisWrapper.tsx** - Smooth scroll provider

### Sections (`src/components/sections/`)

- **ParallaxHero.tsx** - Hero section with parallax effect
- **SlidingText.tsx** - Animated text slider
- **CommitmentSection.tsx** - Company commitment display
- **CommunitySection.tsx** - Community showcase
- **MomentsList.tsx** - Floating moments gallery
- **PositionCarousel.tsx** - Position/product carousel
- **FAQSection.tsx** - FAQ accordion
- **ProductCard.tsx** - Individual product card

### UI (`src/components/ui/`)

- **AnimatedEnvelope.tsx** - Scroll-triggered envelope animation
- **PlantButton.tsx** - Animated plant-themed button
- **FloatingImage.tsx** - Floating image with transitions
- **Marquee components** - Various marquee animations
- **Testimonial.tsx** - Testimonial card component

## 🎨 Using Components

### Basic Usage

```tsx
'use client'

import { ParallaxHero, SlidingText, CommitmentSection } from '@/components'

export default function HomePage() {
  return (
    <div>
      <ParallaxHero />
      <SlidingText />
      <CommitmentSection />
    </div>
  )
}
```

### With Custom Props

```tsx
import { PlantButton, FloatingImage } from '@/components'

// PlantButton with custom styling
<PlantButton className="my-custom-class" />

// FloatingImage with transition props
<FloatingImage
  src="/path/to/image.jpg"
  alt="Description"
  transition={customTransition}
/>
```

## 🔧 Utilities & Hooks

### Utils

```tsx
import { cn, debounce, throttle } from '@/lib/utils'

// Combine classes
const className = cn('base-class', conditional && 'extra-class')

// Debounce function
const debouncedFn = debounce(myFunction, 300)
```

### Constants

```tsx
import { ANIMATION_DURATION, Z_INDEX, NAV_ITEMS } from '@/lib/constants'

// Use predefined values
const duration = ANIMATION_DURATION.NORMAL
const zIndex = Z_INDEX.MODAL
```

### Hooks

```tsx
import { useLenis } from '@/lib/hooks/useLenis'

// In component
function MyComponent() {
  useLenis() // Enables smooth scrolling
  return <div>Content</div>
}
```

## 📝 TypeScript Types

```tsx
import type { NavItem, ProductCard, AnimationProps } from '@/types'

interface MyComponentProps {
  items: NavItem[]
  products: ProductCard[]
  animation?: AnimationProps
}
```

## 🎯 Best Practices

1. **Always use barrel exports** for cleaner imports
2. **Group related imports** from the same source
3. **Use TypeScript types** for better development experience
4. **Leverage constants** instead of magic numbers
5. **Utilize utility functions** for common operations

## 🚀 Performance Tips

- Components use `'use client'` only when necessary
- Framer Motion components are optimized for performance
- Images use Next.js Image component for optimization
- Animations use `will-change` and `transform` for GPU acceleration

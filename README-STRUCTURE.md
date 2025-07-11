# Mate Libre Clone - Website Restructured

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with organized sections
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # App providers
│   ├── about/             # About page
│   ├── careers/           # Careers page
│   └── community/         # Community page
│
├── components/            # Organized component library
│   ├── index.ts          # Barrel exports for clean imports
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Main navigation header
│   │   ├── Footer.tsx    # Site footer
│   │   └── LenisWrapper.tsx # Smooth scroll wrapper
│   ├── sections/         # Page section components
│   │   ├── ParallaxHero.tsx
│   │   ├── SlidingText.tsx
│   │   ├── CommitmentSection.tsx
│   │   ├── CommunitySection.tsx
│   │   ├── MomentsList.tsx
│   │   ├── PositionCarousel.tsx
│   │   └── FAQSection.tsx
│   └── ui/               # Reusable UI components
│       ├── AnimatedEnvelope.tsx
│       ├── PlantButton.tsx
│       ├── FloatingImage.tsx
│       ├── marquee.tsx
│       ├── MarqueeBackground.tsx
│       ├── MarqueeTailwind.tsx
│       └── Testimonial.tsx
│
├── lib/                  # Utilities and configuration
│   ├── hooks/           # Custom React hooks
│   │   └── useLenis.ts
│   ├── utils/           # Helper functions
│   │   └── index.ts
│   └── constants.ts     # App constants
│
├── types/               # TypeScript type definitions
│   └── index.ts
│
├── assets/             # Static assets
│   └── fonts/          # Font files
│       ├── studio-pro-regular.ttf
│       └── studio-pro-bold.ttf
│
└── styles/             # Additional styles
    ├── CustomCursor.tsx
    └── plant-button.css
```

## 🎯 Key Improvements

### 1. **Organized Component Structure**

- **Layout**: Header, Footer, wrappers
- **Sections**: Large page sections
- **UI**: Reusable components
- **Barrel Exports**: Clean import statements

### 2. **Better Code Organization**

- **lib/**: Utilities, hooks, constants
- **types/**: TypeScript definitions
- **assets/**: Static files properly organized

### 3. **Clean Imports**

```tsx
// Before
import ParallaxHero from '@/components/ParallaxHero'
import SlidingText from '@/components/SlidingText'

// After
import { ParallaxHero, SlidingText } from '@/components'
```

### 4. **Improved CSS Structure**

- Organized with clear sections
- Better comments and grouping
- Consistent naming conventions

## 🚀 Usage

### Import Components

```tsx
// Import single component
import { Header } from '@/components'

// Import multiple components
import { ParallaxHero, SlidingText, CommitmentSection } from '@/components'
```

### Use Utilities

```tsx
import { cn, debounce } from '@/lib/utils'
import { ANIMATION_DURATION, Z_INDEX } from '@/lib/constants'
```

### Use Types

```tsx
import type { NavItem, ProductCard } from '@/types'
```

## 📝 Development Guidelines

1. **Components**: Place in appropriate subfolder (layout/sections/ui)
2. **Styles**: Add component-specific styles to globals.css with proper sections
3. **Types**: Add TypeScript interfaces to `/types`
4. **Utils**: Add helper functions to `/lib/utils`
5. **Constants**: Add app constants to `/lib/constants`

## 🛠 Next Steps

1. Update any remaining absolute imports
2. Add component documentation
3. Implement proper error boundaries
4. Add unit tests for utility functions
5. Consider adding Storybook for component documentation

## 📦 Dependencies

- Next.js 15.3.4
- React 19
- Framer Motion
- GSAP
- Tailwind CSS
- TypeScript

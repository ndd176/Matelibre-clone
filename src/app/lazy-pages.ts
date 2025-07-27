// Dynamic imports for better performance
import dynamic from 'next/dynamic'

// Lazy load heavy animation components
export const LazyAboutPage = dynamic(() => import('./about/page'), {
  loading: () => null,
  ssr: false // Disable SSR for heavy animation pages
})

export const LazyCommunityPage = dynamic(() => import('./community/page'), {
  loading: () => null,
  ssr: false
})

export const LazyContactPage = dynamic(() => import('./contact/page'), {
  loading: () => null,
  ssr: false
})

export const LazyCareersPage = dynamic(() => import('./careers/page'), {
  loading: () => null,
  ssr: false
})

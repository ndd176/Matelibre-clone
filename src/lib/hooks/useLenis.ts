// hooks/useLenis.ts
'use client'

import { useEffect, useCallback } from 'react'
import Lenis from '@studio-freight/lenis'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    lenis: Lenis;
  }
}

let lenisInstance: Lenis | null = null

export function useLenis() {
  const pathname = usePathname()

  const scrollToTop = useCallback((immediate = true) => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: immediate, duration: immediate ? 0 : 1000 })
    }
  }, [])

  // Reset scroll position khi route thay đổi
  useEffect(() => {
    scrollToTop(true)
  }, [pathname, scrollToTop])

  useEffect(() => {
    if (lenisInstance) {
      
      return () => {}
    }

    const lenis = new Lenis({
      duration: 4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -15 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1,
    })

    // Disable scroll restoration
    if (typeof window !== 'undefined') {
      history.scrollRestoration = 'manual'
    }

    lenisInstance = lenis
    window.lenis = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Reset scroll position khi mount
    scrollToTop(true)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
      window.lenis = undefined as any
    }
  }, [scrollToTop])

  return { scrollToTop }
}


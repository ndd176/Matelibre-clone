// hooks/useLenis.ts
'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
        duration: 4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -15 * t)), // dễ chịu, kiểu easeOutExpo
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
}

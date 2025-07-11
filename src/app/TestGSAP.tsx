'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TestGSAP() {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slidesRef.current) return;

    const slides = slidesRef.current.children;
    const slideWidth = (slides[0] as HTMLElement).offsetWidth;
    const totalWidth = slideWidth * (slides.length - 1);

    gsap.to(slides, {
      xPercent: -100 * (slides.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (slides.length - 1),
        start: 'top top',
        end: () => `+=${totalWidth}`,
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">GSAP Horizontal Scroll</h1>
      </div>

      {/* GSAP Horizontal Scroll */}
      <div ref={horizontalRef} className="h-screen overflow-hidden">
        <div ref={slidesRef} className="flex h-full w-[400%]">
          <div className="min-w-screen h-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-6xl font-bold mb-4">GSAP Slide 1</h2>
              <p className="text-xl">Smooth scroll with GSAP</p>
            </div>
          </div>
          
          <div className="min-w-screen h-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-6xl font-bold mb-4">GSAP Slide 2</h2>
              <p className="text-xl">ScrollTrigger plugin</p>
            </div>
          </div>
          
          <div className="min-w-screen h-full bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-6xl font-bold mb-4">GSAP Slide 3</h2>
              <p className="text-xl">Professional animations</p>
            </div>
          </div>
          
          <div className="min-w-screen h-full bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-6xl font-bold mb-4">GSAP Slide 4</h2>
              <p className="text-xl">High performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of content */}
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Normal Scroll Continues</h2>
          <p className="text-lg text-gray-600">GSAP horizontal scroll completed</p>
        </div>
      </div>
    </div>
  );
}
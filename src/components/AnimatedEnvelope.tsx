'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AnimatedEnvelope() {
  const [hasReached, setHasReached] = useState(false);
  const [openFlap, setOpenFlap] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const scale = useTransform(scrollYProgress, [0.35, 0.7], [1, 8]);
  const y = useTransform(scrollYProgress, [0.35, 0.7], [0, '-50vh']);
  const x = useTransform(scrollYProgress, [0.35, 0.7], [0, '-50%']);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v > 0.68 && !hasReached) {
        setHasReached(true);
        setTimeout(() => setOpenFlap(true), 800);
        setTimeout(() => router.push('/contact'), 2000);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, hasReached, router]);

  return (
    <motion.div
      ref={ref}
      className="fixed z-50 top-[70%] left-[80%] w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
      style={{ scale, y, x }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Flap mở ra */}
        <motion.path
          d="M12.6 3.2L19.7792 8.58443L12.6196 14.2367C12.2563 14.5236 11.7437 14.5236 11.3804 14.2367L4.22077 8.58443L11.4 3.2C11.7556 2.93333 12.2444 2.93333 12.6 3.2Z"
          fill="#fff"
          initial={{ rotateX: 0 }}
          animate={openFlap ? { rotateX: -180 } : {}}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{ transformOrigin: 'center top' }}
        />

        {/* Body thư (đầy nền trắng) */}
        <path
          fill="#fff"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.8178 7.68475C22.5632 8.25194 23 9.13431 23 10.071V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V10.071C1 9.13431 1.43675 8.25194 2.18224 7.68475C4.36739 6.02221 8.93135 2.55149 10.2 1.6C11.2667 0.8 12.7333 0.8 13.8 1.6C15.0686 2.55148 19.6326 6.02221 21.8178 7.68475ZM3 10.1688L10.1411 15.8065C11.231 16.667 12.769 16.667 13.8589 15.8065L21 10.1688V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.1688Z"
        />
      </motion.svg>
    </motion.div>
  );
}

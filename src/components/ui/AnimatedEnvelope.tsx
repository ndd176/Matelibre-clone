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

        {/* Body */}
        <motion.path
          d="M2 8.5V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V8.5L12 15L2 8.5Z"
          fill="#fff"
          stroke="#333"
          strokeWidth="1.5"
        />
      </motion.svg>
    </motion.div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FadeInText() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0.2, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-3xl font-studio-pro-bold text-white text-center p-8 bg-black"
    >
      Hello, I'm fading in and out based on scroll!
    </motion.div>
  );
}

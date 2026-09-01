"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
}

export function ScaleIn({
  children,
  delay = 0,
}: ScaleInProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.92,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
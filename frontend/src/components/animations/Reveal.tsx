"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
}

export function Reveal({
  children,
}: RevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
      }}
    >
      {children}
    </motion.div>
  );
}
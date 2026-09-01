"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Floating({
  children,
}: Props) {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 5,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

export function Stagger({ children }: Props) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}
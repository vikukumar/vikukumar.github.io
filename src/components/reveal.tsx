"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type RevealVariant = "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale";

export function Reveal({
  children,
  delay = 0,
  variant = "slide-up",
  duration = 0.6,
  once = true,
  staggerChildren = 0,
  className
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: RevealVariant;
  duration?: number;
  once?: boolean;
  staggerChildren?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "0% 0px -5% 0px" });

  const variants = {
    fade: {
      initial: { opacity: 0, filter: "blur(8px)" },
      animate: { opacity: 1, filter: "blur(0px)" }
    },
    "slide-up": {
      initial: { opacity: 0, y: 30, filter: "blur(8px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" }
    },
    "slide-down": {
      initial: { opacity: 0, y: -30, filter: "blur(8px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" }
    },
    "slide-left": {
      initial: { opacity: 0, x: 30, filter: "blur(8px)" },
      animate: { opacity: 1, x: 0, filter: "blur(0px)" }
    },
    "slide-right": {
      initial: { opacity: 0, x: -30, filter: "blur(8px)" },
      animate: { opacity: 1, x: 0, filter: "blur(0px)" }
    },
    scale: {
      initial: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
      animate: { opacity: 1, scale: 1, filter: "blur(0px)" }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={{
        initial: variants[variant].initial,
        animate: {
          ...variants[variant].animate,
          transition: {
            duration,
            ease: [0.22, 1, 0.36, 1],
            delay,
            staggerChildren,
            delayChildren: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        initial: { opacity: 0, y: 20, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" }
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

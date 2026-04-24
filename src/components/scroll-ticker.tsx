"use client";

import { motion } from "framer-motion";
import { PROFILE } from "@/data/profile";

export function ScrollTicker() {
  const items = [
    ...PROFILE.keywords,
    "Kong Gateway",
    "Akana",
    "Apigee",
    "FastAPI",
    "Kubernetes",
    "ArgoCD",
    "CI/CD",
    "LLM Systems",
    "RAG"
  ];

  // Double the items for seamless looping
  const loop = [...items, ...items];

  return (
    <div className="border-y border-border/70 bg-card/20 py-3 backdrop-blur-sm">
      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity
          }}
          className="flex whitespace-nowrap"
        >
          {loop.map((t, idx) => (
            <span key={`${t}-${idx}`} className="mr-12 inline-flex items-center gap-2 text-xs font-medium text-muted/80">
              <span className="h-1 w-1 rounded-full bg-brand" />
              <span className="tracking-widest uppercase">{t}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

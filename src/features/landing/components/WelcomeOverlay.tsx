"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoAnimation } from "./LogoAnimation";


interface WelcomeOverlayProps {
  visible: boolean;
  onEnter: () => void;
  onSkip: () => void;
}

const FEATURE_PILLS = [
  "Live Fleet Tracking",
  "AI Route Planning",
  "Real-Time Alerts",
  "3D City View",
];

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({
  visible,
  onEnter,
  onSkip,
}) => {
  const handleEnter = () => {

    onEnter();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[8000] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Glassmorphism backdrop vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 60%, rgba(2,2,5,0.7) 40%, rgba(2,2,5,0.92) 100%)",
            }}
          />

          {/* Main glass card */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8 px-8 py-12 rounded-3xl max-w-md w-full mx-4"
            style={{
              background: "rgba(10, 10, 15, 0.6)",
              backdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo */}
            <LogoAnimation visible={visible} />

            {/* Feature pills */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {FEATURE_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wide border"
                  style={{
                    background: "rgba(0, 113, 227, 0.1)",
                    borderColor: "rgba(0, 113, 227, 0.25)",
                    color: "#7eb8f7",
                  }}
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div
              className="w-full h-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            />

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col gap-3 w-full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              {/* Primary CTA */}
              <motion.button
                onClick={handleEnter}
                className="relative w-full py-3.5 rounded-2xl font-semibold text-sm text-white overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0071e3 0%, #0055b3 100%)",
                  boxShadow: "0 0 30px rgba(0,113,227,0.35)",
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 50px rgba(0,113,227,0.55)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer overlay */}
                <motion.div
                  className="absolute inset-0 -translate-x-full skew-x-12"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
                  animate={{ translateX: ["−100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                />
                <span className="relative z-10">Enter Experience →</span>
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                onClick={onSkip}
                className="w-full py-2.5 rounded-2xl text-sm font-medium text-[#71717a] border border-white/5 hover:text-[#a1a1aa] hover:border-white/10 transition-all duration-200"
              >
                Skip Intro
              </motion.button>
            </motion.div>

            {/* Version badge */}
            <motion.span
              className="text-[9px] text-[#3f3f46] font-mono tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              Navigo v1.0 · Series A Preview
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

WelcomeOverlay.displayName = "WelcomeOverlay";
export default WelcomeOverlay;

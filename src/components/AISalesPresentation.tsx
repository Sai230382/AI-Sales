"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SalesSlide1 from "@/components/sales-slides/SalesSlide1";
import SalesSlide2 from "@/components/sales-slides/SalesSlide2";
import SalesSlide3 from "@/components/sales-slides/SalesSlide3";
import SalesSlide4 from "@/components/sales-slides/SalesSlide4";
import SalesSlide5 from "@/components/sales-slides/SalesSlide5";
import SalesSlide6 from "@/components/sales-slides/SalesSlide6";
import SalesSlide7 from "@/components/sales-slides/SalesSlide7";
import SalesSlide8 from "@/components/sales-slides/SalesSlide8";
import SalesSlide9 from "@/components/sales-slides/SalesSlide9";
import SalesSlide10 from "@/components/sales-slides/SalesSlide10";
import SalesSlide11 from "@/components/sales-slides/SalesSlide11";
import SalesSlide12 from "@/components/sales-slides/SalesSlide12";

const SLIDES = [
  { id: 0, component: SalesSlide1, title: "AI Sales Training Academy", module: "" },
  { id: 1, component: SalesSlide2, title: "What is AI?", module: "Module 1" },
  { id: 2, component: SalesSlide3, title: "How AI Models Work", module: "Module 2" },
  { id: 3, component: SalesSlide4, title: "The AI Spectrum", module: "Module 3" },
  { id: 4, component: SalesSlide5, title: "AI Tools Landscape 2026", module: "Module 4" },
  { id: 5, component: SalesSlide6, title: "Prompting Frameworks", module: "Module 5" },
  { id: 6, component: SalesSlide7, title: "Prompt Lab", module: "Interactive" },
  { id: 7, component: SalesSlide8, title: "Industry Playbooks", module: "Modules 7–10" },
  { id: 8, component: SalesSlide9, title: "AI Pricing & Business Models", module: "Module 8" },
  { id: 9, component: SalesSlide10, title: "Ethics & Responsible Use", module: "Module 9" },
  { id: 10, component: SalesSlide11, title: "Future of AI: 2026–2031", module: "Module 10" },
  { id: 11, component: SalesSlide12, title: "Knowledge Quizzes", module: "Assessment" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.96,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.96,
  }),
};

function KeyboardHint() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="absolute top-5 right-6 z-30 flex items-center gap-2 text-xs"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <kbd className="px-1.5 py-0.5 rounded text-xs"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>←</kbd>
          <kbd className="px-1.5 py-0.5 rounded text-xs"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>→</kbd>
          <span>to navigate</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AISalesPresentation() {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);

  const go = useCallback((delta: number) => {
    setSlide(([prev]) => {
      const next = Math.max(0, Math.min(SLIDES.length - 1, prev + delta));
      if (next === prev) return [prev, delta];
      return [next, delta];
    });
  }, []);

  const goTo = (idx: number) => {
    setSlide(([prev]) => [idx, idx > prev ? 1 : -1]);
  };

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault(); go(1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault(); go(-1);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [go]);

  const SlideComp = SLIDES[currentSlide].component;
  const progress = ((currentSlide) / (SLIDES.length - 1)) * 100;

  return (
    <div className="w-screen h-screen overflow-hidden relative select-none"
      style={{ background: "linear-gradient(145deg, #020817 0%, #0a0f1e 50%, #050d1a 100%)", fontFamily: "'Geist', 'Inter', sans-serif" }}>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 z-30" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
          style={{ background: "linear-gradient(90deg, #6366f1, #0ea5e9)" }}
        />
      </div>

      {/* Slide area */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 280, damping: 30 },
            opacity: { duration: 0.35 },
            scale: { duration: 0.35 },
          }}
          className="absolute inset-0"
        >
          <SlideComp isActive={true} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-between px-4">
        <motion.button
          onClick={() => go(-1)}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{
            background: currentSlide === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: currentSlide === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)",
            cursor: currentSlide === 0 ? "default" : "pointer",
            backdropFilter: "blur(8px)",
          }}
          disabled={currentSlide === 0}
        >
          <ChevronLeft size={18} />
        </motion.button>

        <motion.button
          onClick={() => go(1)}
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{
            background: currentSlide === SLIDES.length - 1 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: currentSlide === SLIDES.length - 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)",
            cursor: currentSlide === SLIDES.length - 1 ? "default" : "pointer",
            backdropFilter: "blur(8px)",
          }}
          disabled={currentSlide === SLIDES.length - 1}
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>

      {/* Bottom HUD */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-4">
        {/* Slide info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            {SLIDES[currentSlide].module && (
              <span className="text-xs px-2 py-0.5 rounded font-bold"
                style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8" }}>
                {SLIDES[currentSlide].module}
              </span>
            )}
            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
              {SLIDES[currentSlide].title}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Dot nav */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center max-w-lg">
          {SLIDES.map((slide, i) => (
            <button key={slide.id} onClick={() => goTo(i)} className="relative flex items-center justify-center" style={{ cursor: "pointer" }}>
              <motion.div
                animate={{
                  width: i === currentSlide ? 20 : 7,
                  opacity: i === currentSlide ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className="h-1.5 rounded-full"
                style={{
                  background: i === currentSlide
                    ? "linear-gradient(90deg, #6366F1, #0ea5e9)"
                    : "rgba(255,255,255,0.4)",
                  boxShadow: i === currentSlide ? "0 0 8px rgba(99,102,241,0.6)" : "none",
                }}
              />
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
          {currentSlide + 1} / {SLIDES.length}
        </div>
      </div>

      <KeyboardHint />
    </div>
  );
}

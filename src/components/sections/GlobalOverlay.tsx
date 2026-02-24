"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";

/**
 * GlobalOverlay Component
 * Includes: 
 * - Top Progress Bar
 * - Side Navigation Dots
 * - Data Rain Canvas Effect (Left/Right)
 * - Bottom Next Module Floating Prompt
 */
export default function GlobalOverlay() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const canvasLeftRef = useRef<HTMLCanvasElement>(null);
  const canvasRightRef = useRef<HTMLCanvasElement>(null);

  // Constants for navigation
  const totalSlides = 12;
  const modules = [
    "Introduction",
    "Core Concepts",
    "AI Models",
    "AI Spectrum",
    "Tools Landscape",
    "Prompting",
    "Prompt Lab",
    "Industries",
    "Pricing",
    "Ethics",
    "Future",
    "Quizzes",
  ];

  // Matrix-style "Data Rain" Effect
  useEffect(() => {
    const canvases = [canvasLeftRef.current, canvasRightRef.current];
    const dropSpeed = [1, 1];
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]";
    const charArr = chars.split("");

    const renderRain = (ctx: CanvasRenderingContext2D, width: number, height: number, drops: number[]) => {
      ctx.fillStyle = "rgba(10, 14, 26, 0.1)"; // Deep Navy Background with Fade
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = "rgba(0, 153, 255, 0.25)"; // Cyan/Blue low opacity
      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const setupCanvas = (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return { ctx: null, drops: [] };
      const ctx = canvas.getContext("2d");
      canvas.width = 150;
      canvas.height = window.innerHeight;
      const columns = canvas.width / 20;
      const drops: number[] = Array(Math.floor(columns)).fill(1);
      return { ctx, drops };
    };

    const canvas1 = setupCanvas(canvases[0]);
    const canvas2 = setupCanvas(canvases[1]);

    const animate = () => {
      if (canvas1.ctx) renderRain(canvas1.ctx, 150, window.innerHeight, canvas1.drops);
      if (canvas2.ctx) renderRain(canvas2.ctx, 150, window.innerHeight, canvas2.drops);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (canvases[0]) canvases[0].height = window.innerHeight;
      if (canvases[1]) canvases[1].height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll Progress and Slide Tracking
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      
      // Determine active slide based on scroll position (approximation)
      const currentSlide = Math.min(
        Math.floor((winScroll / (height || 1)) * totalSlides),
        totalSlides - 1
      );
      setActiveSlide(currentSlide);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalSlides]);

  return (
    <>
      {/* 1. Top Progress Bar */}
      <div 
        id="progress-bar"
        className="fixed top-0 left-0 h-[3px] bg-[#0099ff] transition-all duration-100 ease-out z-[1001]"
        style={{ width: `${scrollProgress}%`, boxShadow: "0 0 10px rgba(0, 153, 255, 0.7)" }}
      />

      {/* 2. Data Rain Canvas Borders */}
      <canvas 
        ref={canvasLeftRef}
        className="data-rain-canvas left fixed left-0 top-0 w-[150px] h-full pointer-events-none z-[1000] opacity-40 data-rain-mask"
        style={{ maskImage: "linear-gradient(to right, black 0%, transparent 100%)" }}
      />
      <canvas 
        ref={canvasRightRef}
        className="data-rain-canvas right fixed right-0 top-0 w-[150px] h-full pointer-events-none z-[1000] opacity-40 data-rain-mask"
        style={{ maskImage: "linear-gradient(to left, black 0%, transparent 100%)" }}
      />

      {/* 3. Vertical Side Navigation Dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[1005] hidden lg:flex">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`w-[10px] h-[10px] rounded-full border transition-all duration-300 cursor-pointer ${
              activeSlide === i 
                ? "bg-white border-white scale-125" 
                : "border-white/30 hover:border-white/60"
            }`}
            onClick={() => {
              const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              window.scrollTo({
                top: (i / totalSlides) * height,
                behavior: "smooth"
              });
            }}
          />
        ))}
      </div>

      {/* 4. Bottom "Next Module" Floating Prompt */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1001] pointer-events-none">
        <div className="next-module-prompt flex items-center gap-2 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-sm font-medium animate-bounce pointer-events-auto cursor-pointer shadow-2xl hover:bg-black/60 transition-colors">
          <span className="opacity-70">Next:</span>
          <span>{modules[(activeSlide + 1) % modules.length]}</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>

      {/* 5. Active Slide Indicator Bar (Bottom Right) */}
      <div className="fixed bottom-6 right-8 z-[1001] bg-black/40 backdrop-blur-md border border-white/10 rounded-full h-10 flex items-center px-4 gap-4 hidden sm:flex">
        <div className="flex items-center gap-1.5 border-r border-white/10 pr-4">
          <span className="text-[14px] text-white/80 font-semibold">{activeSlide + 1}</span>
          <span className="text-[12px] text-white/40">/</span>
          <span className="text-[12px] text-white/40">{totalSlides}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-white/60 truncate max-w-[120px]">
            {modules[activeSlide]}
          </span>
          <ChevronRight className="w-4 h-4 text-white/30" />
        </div>
      </div>
    </>
  );
}
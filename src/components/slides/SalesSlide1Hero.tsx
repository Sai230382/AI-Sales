"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Bolt, Clock, Layers, CheckCircle2, MousePointer2,
  Globe, HeartPulse, ShoppingCart, LibraryBig, Headset,
  Play, Trophy, Cpu, Briefcase, Terminal, ShieldCheck, ChevronRight
} from "lucide-react";

const industries = [
  { name: "General", icon: Globe },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Retail", icon: ShoppingCart },
  { name: "Financial", icon: LibraryBig },
  { name: "Contact Center", icon: Headset },
];

const pillars = [
  { title: "How AI Works", icon: Cpu },
  { title: "Workplace Apps", icon: Briefcase },
  { title: "Prompting", icon: Terminal },
  { title: "Evaluating Outputs", icon: CheckCircle2 },
  { title: "Responsible Use", icon: ShieldCheck },
];

const metrics = [
  { label: "45–60 min", icon: Clock },
  { label: "11 Modules", icon: Layers },
  { label: "4 Quizzes", icon: CheckCircle2 },
  { label: "Interactive Demos", icon: MousePointer2 },
];

export default function SalesSlide1Hero({ isActive }: { isActive: boolean }) {
  const [selectedIndustry, setSelectedIndustry] = useState("General");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "010101";
    const fs = 13;
    const cols = Math.floor(canvas.width / fs);
    const drops: number[] = Array.from({ length: cols }, () => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = "rgba(5, 10, 20, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0099ff22";
      ctx.font = `${fs}px monospace`;
      drops.forEach((d, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, d * fs);
        if (d * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.4;
      });
    };

    const id = setInterval(draw, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{ background: "radial-gradient(ellipse at center, #0d1629 0%, #060a14 100%)" }}>

      {/* Matrix rain */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[140px] bg-blue-600/10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px] bg-cyan-500/5 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl px-6 py-8 overflow-y-auto max-h-full">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Bolt className="w-4 h-4 text-[#0099ff]" />
          <span className="text-xs font-medium text-white/80">Updated February 2026</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-extrabold leading-tight mb-4 tracking-tight"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
            background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #0099ff 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Master AI for Sales Excellence
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-slate-400 mb-6 max-w-2xl leading-relaxed"
          style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
        >
          A comprehensive curriculum covering AI foundations, prompting mastery, 40+ AI tools,
          and industry-specific playbooks — built for sales professionals who want to lead, not follow.
        </motion.p>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          {metrics.map((m, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <m.icon className="w-3.5 h-3.5 text-[#0099ff]" />
              {m.label}
            </div>
          ))}
        </motion.div>

        {/* Industry selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-6 w-full"
        >
          <p className="text-[11px] uppercase tracking-widest font-semibold text-white/30 mb-3">
            Select Your Industry
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {industries.map((ind) => (
              <button
                key={ind.name}
                onClick={() => setSelectedIndustry(ind.name)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300"
                style={selectedIndustry === ind.name
                  ? { background: "#0099ff", borderColor: "#0099ff", color: "#fff", boxShadow: "0 0 16px rgba(0,153,255,0.35)" }
                  : { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }
                }
              >
                <ind.icon className="w-3.5 h-3.5" />
                {ind.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          <button className="flex items-center gap-2 px-6 py-3 bg-[#0099ff] hover:bg-[#38bdf8] rounded-xl text-white font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-[#0099ff]/20">
            <Play className="w-4 h-4 fill-white" />
            Start Training
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm transition-all hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <Trophy className="w-4 h-4 text-white/70" />
            Jump to Quiz
          </button>
        </motion.div>

        {/* Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="grid grid-cols-5 gap-3 w-full"
        >
          {pillars.map((p, i) => (
            <div key={i} className="group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 cursor-default hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="p-2 rounded-lg transition-all group-hover:scale-110"
                style={{ background: "rgba(0,153,255,0.1)", border: "1px solid rgba(0,153,255,0.2)" }}>
                <p.icon className="w-5 h-5 text-[#0099ff]" />
              </div>
              <span className="text-[11px] font-semibold text-white/60 group-hover:text-white text-center leading-tight transition-colors">
                {p.title}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex items-center gap-1.5 text-white/30 text-xs mt-5 cursor-pointer hover:text-white/60 transition-colors group"
        >
          <span>Next: Core Concepts</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>

      </div>
    </div>
  );
}

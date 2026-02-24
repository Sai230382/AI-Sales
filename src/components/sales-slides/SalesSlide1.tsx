"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 60; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    let animId: number;
    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,102,241,0.5)";
        ctx.fill();
      });
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.6 }} />;
}

const pillars = [
  { label: "AI Foundations", color: "#6366f1" },
  { label: "Prompting Mastery", color: "#0ea5e9" },
  { label: "40+ Tools", color: "#10b981" },
  { label: "Industry Playbooks", color: "#f59e0b" },
  { label: "Ethics & Privacy", color: "#ef4444" },
];

const stats = [
  { value: "~55 min", label: "Curriculum" },
  { value: "11", label: "Modules" },
  { value: "4", label: "Quizzes" },
  { value: "40+", label: "AI Tools" },
];

export default function SalesSlide1({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(145deg, #020817 0%, #0a0f1e 50%, #050d1a 100%)" }}>
      <NeuralBackground />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)"
      }} />
      <div className="relative z-10 flex flex-col items-center w-full px-8 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-3"
        >
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#818cf8" }}>
            Updated February 2026
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-black leading-tight mb-3"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 35%, #818cf8 65%, #0ea5e9 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            filter: "drop-shadow(0 0 40px rgba(99,102,241,0.35))",
          }}
        >
          Master AI for<br />Sales Excellence
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-slate-400 mb-5 max-w-2xl"
          style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", lineHeight: 1.6 }}
        >
          A comprehensive curriculum covering AI foundations, prompting mastery, 40+ AI tools,
          and industry-specific playbooks — built for sales professionals who want to{" "}
          <span style={{ color: "#818cf8" }}>lead, not follow.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center gap-4 mb-5"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center px-4 py-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xl font-black" style={{
                background: "linear-gradient(135deg, #818cf8, #0ea5e9)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
              }}>{s.value}</div>
              <div className="text-xs text-slate-500 font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-2 justify-center mb-6"
        >
          {pillars.map((p, i) => (
            <motion.span
              key={p.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{ background: `${p.color}18`, border: `1px solid ${p.color}40`, color: p.color }}
            >
              {p.label}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex items-center gap-3"
        >
          <div className="px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2"
            style={{ background: "linear-gradient(135deg, #6366f1, #0ea5e9)", color: "#fff", boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}>
            <span>Start Training</span>
            <span>→</span>
          </div>
          <div className="text-xs text-slate-500">Press → to begin</div>
        </motion.div>
      </div>
    </div>
  );
}

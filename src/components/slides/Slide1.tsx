"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Brain, Zap } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const colors = ["#3B82F6", "#6366F1", "#F59E0B", "#8B5CF6", "#06B6D4"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.floor(p.opacity * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

const cards = [
  {
    icon: Eye,
    title: "Perceive",
    subtitle: "Computer Vision & Image Recognition",
    description:
      "Machines detect objects, read text, recognize faces, and understand the visual world in real-time.",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.35)",
    border: "rgba(59,130,246,0.4)",
    examples: ["Object Detection", "OCR", "Facial ID"],
  },
  {
    icon: Brain,
    title: "Reason",
    subtitle: "Logic, Planning & Decision Making",
    description:
      "AI models weigh evidence, form strategies, predict outcomes, and solve complex multi-step problems.",
    color: "#A855F7",
    glow: "rgba(168,85,247,0.35)",
    border: "rgba(168,85,247,0.4)",
    examples: ["Game Strategy", "Medical Diagnosis", "Route Planning"],
  },
  {
    icon: Zap,
    title: "Act",
    subtitle: "Robotics, Automation & Autonomous Systems",
    description:
      "From warehouse robots to self-driving cars, AI translates decisions into real-world physical action.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.35)",
    border: "rgba(245,158,11,0.4)",
    examples: ["Self-Driving Cars", "Robot Arms", "Drone Delivery"],
  },
];

export default function Slide1({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Radial gradient center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-3"
        >
          <span
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "#6366F1" }}
          >
            Introduction to
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-center font-black mb-2 leading-none"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            background:
              "linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #6366F1 70%, #F59E0B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(99,102,241,0.4))",
          }}
        >
          What is Artificial Intelligence?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center text-slate-400 mb-10 text-lg max-w-2xl"
        >
          The science of building machines that can{" "}
          <span style={{ color: "#6366F1" }}>perceive</span>,{" "}
          <span style={{ color: "#A855F7" }}>reason</span>, and{" "}
          <span style={{ color: "#F59E0B" }}>act</span> intelligently in the
          world.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 w-full">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={
                  isActive
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 50, scale: 0.9 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.4 + i * 0.4,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="relative rounded-2xl p-6 flex flex-col gap-4 cursor-default"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.7) 100%)",
                  border: `1px solid ${card.border}`,
                  boxShadow: `0 0 30px ${card.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Top glow line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                  }}
                />

                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${card.color}22`,
                      border: `1px solid ${card.color}44`,
                    }}
                  >
                    <Icon size={24} style={{ color: card.color }} />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ color: card.color }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400">{card.subtitle}</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {card.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {card.examples.map((ex) => (
                    <span
                      key={ex}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: `${card.color}15`,
                        border: `1px solid ${card.color}30`,
                        color: card.color,
                      }}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

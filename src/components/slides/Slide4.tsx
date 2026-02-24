"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Bot, Network } from "lucide-react";

const cards = [
  {
    id: "genai",
    title: "Generative AI",
    icon: Sparkles,
    color: "#A855F7",
    glow: "rgba(168,85,247,0.3)",
    border: "rgba(168,85,247,0.4)",
    tagline: "Responds to prompts",
    subtitle: "One-shot content creation",
    examples: ["ChatGPT writing an email", "DALL·E making an image"],
    autonomy: "LOW",
    autonomyLevel: 1,
    autonomyColor: "#A855F7",
    bullets: ["Requires human prompt for every output", "No memory between sessions", "No access to tools or web"],
  },
  {
    id: "agent",
    title: "AI Agent",
    icon: Bot,
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.3)",
    border: "rgba(59,130,246,0.4)",
    tagline: "Uses tools to complete tasks",
    subtitle: "Multi-step execution",
    examples: ["Perplexity searching the web", "Code interpreter running Python"],
    autonomy: "MEDIUM",
    autonomyLevel: 2,
    autonomyColor: "#3B82F6",
    bullets: ["Accesses external tools & APIs", "Executes multi-step plans", "Limited self-correction"],
  },
  {
    id: "agentic",
    title: "Agentic AI",
    icon: Network,
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    border: "rgba(245,158,11,0.5)",
    tagline: "Plans, reasons, self-corrects",
    subtitle: "Pursues goals autonomously",
    examples: ["AutoGPT", "Claude Computer Use", "AI doing your job"],
    autonomy: "HIGH",
    autonomyLevel: 3,
    autonomyColor: "#F59E0B",
    bullets: ["Sets and decomposes its own goals", "Monitors and self-corrects", "Runs indefinitely without prompts"],
  },
];

const tableRows = [
  { label: "Needs human prompt each step", genai: true, agent: false, agentic: false },
  { label: "Can use external tools", genai: false, agent: true, agentic: true },
  { label: "Multi-step planning", genai: false, agent: true, agentic: true },
  { label: "Self-correction", genai: false, agent: false, agentic: true },
  { label: "Runs autonomously", genai: false, agent: false, agentic: true },
  { label: "Sets its own goals", genai: false, agent: false, agentic: true },
];

function AutonomyMeter({ level, color }: { level: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-slate-500 mr-1">Autonomy:</span>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-2 w-6 rounded-full"
          style={{
            background: i <= level ? color : "rgba(255,255,255,0.08)",
            boxShadow: i <= level ? `0 0 6px ${color}` : "none",
            transition: "all 0.3s",
          }}
        />
      ))}
      <span
        className="text-xs font-bold ml-1"
        style={{ color }}
      >
        {level === 1 ? "LOW" : level === 2 ? "MEDIUM" : "HIGH"}
      </span>
    </div>
  );
}

function CheckOrX({ val, color }: { val: boolean; color: string }) {
  return (
    <span
      className="text-sm font-bold"
      style={{ color: val ? color : "#374151" }}
    >
      {val ? "✓" : "✕"}
    </span>
  );
}

export default function Slide4({ isActive }: { isActive: boolean }) {
  const [revealedRows, setRevealedRows] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setRevealedRows(0);
      return;
    }

    let timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i <= tableRows.length; i++) {
      timeouts.push(
        setTimeout(() => setRevealedRows(i), 800 + i * 250)
      );
    }
    return () => timeouts.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-8">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-5">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "#F59E0B" }}
          >
            The AI Spectrum
          </span>
          <h2
            className="font-black mt-1 leading-tight"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              background:
                "linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #818CF8 70%, #F59E0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Gen AI vs AI Agent vs Agentic AI
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: -40 }}
                animate={
                  isActive
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -40 }
                }
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="relative rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  background: `linear-gradient(145deg, rgba(15,23,42,0.95) 0%, ${card.color}08 100%)`,
                  border: `1px solid ${card.border}`,
                  boxShadow: `0 0 25px ${card.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
                }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-4 right-4 h-0.5 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                  }}
                />

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${card.color}18`,
                      border: `1px solid ${card.color}35`,
                      boxShadow: `0 0 12px ${card.glow}`,
                    }}
                  >
                    <Icon size={20} style={{ color: card.color }} />
                  </div>
                  <div>
                    <h3
                      className="text-base font-black"
                      style={{ color: card.color }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500">{card.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-200">
                  {card.tagline}
                </p>

                <ul className="flex flex-col gap-1">
                  {card.bullets.map((b) => (
                    <li key={b} className="text-xs text-slate-400 flex items-start gap-1.5">
                      <span style={{ color: card.color }} className="mt-0.5 flex-shrink-0">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/5 pt-2 flex flex-col gap-2">
                  <AutonomyMeter level={card.autonomyLevel} color={card.color} />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-600">Examples:</span>
                    {card.examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{
                          background: `${card.color}10`,
                          border: `1px solid ${card.color}20`,
                          color: card.color,
                        }}
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison table + timeline */}
        <div className="grid grid-cols-2 gap-4">
          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="rounded-xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(15,23,42,0.8)",
            }}
          >
            <table className="w-full text-xs">
              <thead>
                <tr
                  style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <th className="text-left p-2.5 text-slate-400 font-semibold">Capability</th>
                  <th className="p-2.5 text-center" style={{ color: "#A855F7" }}>Gen AI</th>
                  <th className="p-2.5 text-center" style={{ color: "#3B82F6" }}>Agent</th>
                  <th className="p-2.5 text-center" style={{ color: "#F59E0B" }}>Agentic</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <motion.tr
                    key={row.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      i < revealedRows
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -10 }
                    }
                    transition={{ duration: 0.3 }}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                    }}
                  >
                    <td className="p-2.5 text-slate-400">{row.label}</td>
                    <td className="p-2.5 text-center">
                      <CheckOrX val={row.genai} color="#A855F7" />
                    </td>
                    <td className="p-2.5 text-center">
                      <CheckOrX val={row.agent} color="#3B82F6" />
                    </td>
                    <td className="p-2.5 text-center">
                      <CheckOrX val={row.agentic} color="#F59E0B" />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="rounded-xl p-5 flex flex-col justify-center"
            style={{
              background: "rgba(15,23,42,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="text-xs text-slate-500 mb-4 text-center">
              Autonomy Spectrum
            </div>
            <div className="relative flex items-center">
              {/* Track */}
              <div
                className="absolute left-0 right-0 h-1 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(168,85,247,0.3), rgba(59,130,246,0.3), rgba(245,158,11,0.3))",
                }}
              />
              {/* Active gradient overlay */}
              <motion.div
                className="absolute left-0 h-1 rounded-full"
                initial={{ width: "0%" }}
                animate={isActive ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                style={{
                  background:
                    "linear-gradient(90deg, #A855F7, #3B82F6, #F59E0B)",
                  boxShadow: "0 0 8px rgba(245,158,11,0.5)",
                }}
              />

              {/* Nodes */}
              {cards.map((card, i) => (
                <div
                  key={card.id}
                  className="relative z-10 flex flex-col items-center"
                  style={{ flex: 1, alignItems: i === 0 ? "flex-start" : i === 2 ? "flex-end" : "center" }}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center mb-3"
                    initial={{ scale: 0 }}
                    animate={isActive ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.2 }}
                    style={{
                      background: card.color,
                      borderColor: card.color,
                      boxShadow: `0 0 12px ${card.glow}`,
                    }}
                  />
                  <div
                    className="text-xs font-bold text-center"
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </div>
                  <div className="text-xs text-slate-600 text-center">
                    {card.autonomy}
                  </div>
                </div>
              ))}
            </div>

            {/* "We are here" pointer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 2.2 }}
              className="mt-6 flex items-center justify-end gap-2"
            >
              <span className="text-xs text-slate-400 italic">
                The industry is rapidly moving here
              </span>
              <span className="text-base" style={{ color: "#F59E0B" }}>→</span>
              <div
                className="text-xs font-bold px-2 py-1 rounded-lg"
                style={{
                  background: "rgba(245,158,11,0.15)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  color: "#F59E0B",
                }}
              >
                We are here
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

const predictions = [
  {
    icon: "🚫", color: "#6366f1",
    title: "The Prompt Window Disappears",
    source: "a16z (2026)",
    desc: "The text input box as the primary AI interface will vanish. Next-gen AI apps will have zero visible prompting — they observe behaviour, proactively intervene, and present actions for review.",
    impact: "Shifts addressable market from $300–400B in software spending to the $13 trillion in US labor spending — a 30x expansion of opportunity.",
  },
  {
    icon: "📱", color: "#0ea5e9",
    title: "Small Language Models Dominate",
    source: "NVIDIA, Multiple (2026–2027)",
    desc: "SLMs (1–7B parameters) are 10–30x cheaper than LLMs, cutting GPU costs by up to 75%. Hybrid: SLMs on-device handle 90–95% of queries, cloud LLMs for the rest.",
    impact: "Edge AI devices will reach 2.5 billion units by 2027. AI runs on your phone, your car, your appliances.",
  },
  {
    icon: "🎬", color: "#10b981",
    title: "Real-Time 4K Video Generation",
    source: "Google, OpenAI, Runway (2026–2027)",
    desc: "AI video jumped from 720p/5-sec clips to native 4K and 20+ second videos with believable physics. 2027 goal: a generative model maintaining a coherent two-hour narrative.",
    impact: "AI video tools market projected at $12.8B by 2027. Sora Spatial and Veo 3D for VR/AR headsets incoming.",
  },
  {
    icon: "🔀", color: "#f59e0b",
    title: "The Great AI Convergence",
    source: "Microsoft, Clarifai (2026–2028)",
    desc: "Standalone image, video, and audio AI tools will lose independence. Vision-Language-Action (VLA) models merge all modalities. The tool category collapses into the model.",
    impact: "What currently requires 5 separate tools (text, image, video, voice, code) will require one unified model with specialised fine-tuning.",
  },
  {
    icon: "🏗️", color: "#ec4899",
    title: "Agentic AI Goes Mainstream",
    source: "Gartner, McKinsey (2026–2028)",
    desc: "Autonomous AI workers will hold job titles, run 24/7, and manage entire functions. The shift from 'AI as copilot' to 'AI as worker' reshapes hiring, pricing, and ROI conversations.",
    impact: "Companies that master AI worker deployment will achieve 5–10x labor efficiency gains over those that don't. This is the competitive battleground of 2026–2030.",
  },
  {
    icon: "💰", color: "#8b5cf6",
    title: "The Scale of What's Coming",
    source: "Gartner, McKinsey, Sequoia (2026)",
    desc: "Worldwide AI spending will hit $2.5 trillion in 2026 — a 67% increase from 2025. McKinsey projects $7 trillion in data center investment by 2030.",
    impact: "Sequoia predicts a new '$0 to $1B' club of AI companies earning $1M+ revenue per employee. Every deal you work on will have AI implications.",
  },
];

export default function SalesSlide11({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(145deg, #020817 0%, #0a0f1e 60%, #050d1a 100%)" }}>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)"
      }} />

        <div className="relative z-10 flex flex-col h-full px-8 py-4 max-w-7xl mx-auto w-full">

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
          <span className="px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>
            Module 10
          </span>
          <h2 className="text-3xl font-black text-white mt-1">The Future of AI: 2026–2031</h2>
          <p className="text-slate-400 text-sm">Most credible predictions from a16z, Sequoia, Gartner, OpenAI, Anthropic, NVIDIA, and top researchers</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
          {predictions.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              whileHover={{ y: -4, boxShadow: `0 16px 40px ${p.color}25` }}
              className="rounded-xl p-4 flex flex-col gap-2 cursor-default"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${p.color}25` }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <div className="font-bold text-white text-sm leading-tight">{p.title}</div>
                  <div className="text-xs" style={{ color: p.color }}>{p.source}</div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed flex-1">{p.desc}</p>

              <div className="rounded-lg p-2 mt-auto" style={{ background: `${p.color}12`, border: `1px solid ${p.color}25` }}>
                <div className="text-xs font-bold mb-0.5" style={{ color: p.color }}>💼 SALES IMPACT</div>
                <div className="text-xs text-slate-300 leading-relaxed">{p.impact}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const pricingModels = [
  { icon: "💼", label: "Per-Seat", desc: "Fixed fee per user/month. Traditional SaaS model, increasingly misaligned with AI value.", tag: "Legacy — being phased out", color: "#6366f1" },
  { icon: "🤖", label: "Per-Agent", desc: "Each AI agent is a 'digital employee'. Example: Nullify $800/yr per agent.", tag: "Growing fast", color: "#0ea5e9" },
  { icon: "📊", label: "Usage-Based", desc: "Per token, API call, or workflow run. Low entry barrier for pilots.", tag: "~25% of AI companies", color: "#10b981" },
  { icon: "⚡", label: "Per-Action", desc: "Charges per completed workflow step. Salesforce Agentforce: $0.10/action.", tag: "Easy to understand", color: "#f59e0b" },
  { icon: "📝", label: "Per-Output", desc: "Tied to deliverables produced. Replit: $0.25/code checkpoint.", tag: "Outcome-aligned", color: "#ec4899" },
  { icon: "🎯", label: "Outcome-Based", desc: "Pay only for results. Intercom Fin: $0.99/resolution. Highest customer trust.", tag: "Gold standard", color: "#8b5cf6" },
  { icon: "📅", label: "Subscription", desc: "Fixed monthly/annual fee. Simple and predictable. Best for steady usage.", tag: "Standard SaaS", color: "#0ea5e9" },
  { icon: "🔀", label: "Hybrid", desc: "Base subscription + variable usage/outcome layers. ~22% adoption, growing fastest.", tag: "~22% adoption ↑", color: "#6366f1" },
];

const benchmarks = [
  { vendor: "Salesforce Agentforce", model: "$2 / conversation", color: "#0ea5e9" },
  { vendor: "Zendesk AI", model: "$1.50–2.00 / resolution", color: "#6366f1" },
  { vendor: "Intercom Fin", model: "$0.99 / resolution", color: "#10b981" },
  { vendor: "Ada", model: "$30K–300K+ / yr", color: "#f59e0b" },
  { vendor: "Vapi (voice)", model: "$0.05–0.30 / min", color: "#ec4899" },
  { vendor: "Retell AI (voice)", model: "$0.07 / min", color: "#8b5cf6" },
];

const compassQ = [
  { q: "What's the AI's job?", opts: ["Worker", "Service", "Utility", "Partner"], desc: "Determines where the value sits — output volume, resolution, or transformation" },
  { q: "How measurable is impact?", opts: ["Not measurable", "Partially measurable", "Highly measurable"], desc: "Low confidence → Usage pricing. High confidence → Outcome pricing." },
];

export default function SalesSlide9({ isActive }: { isActive: boolean }) {
  const [compassAnswers, setCompassAnswers] = useState<Record<number, string>>({});

  const getRecommendation = () => {
    if (!compassAnswers[0] || !compassAnswers[1]) return null;
    if (compassAnswers[1] === "Highly measurable") return { model: "Outcome-Based", color: "#8b5cf6", desc: "Pay only for results. Highest trust with clients." };
    if (compassAnswers[1] === "Partially measurable") return { model: "Hybrid", color: "#6366f1", desc: "Base subscription + outcome layers. Best of both worlds." };
    return { model: "Usage-Based", color: "#10b981", desc: "Per API call or token. Great for pilots and unpredictable usage." };
  };

  const rec = getRecommendation();

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(145deg, #020817 0%, #0a0f1e 60%, #050d1a 100%)" }}>

        <div className="relative z-10 flex flex-col h-full px-8 py-4 max-w-7xl mx-auto w-full">

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
          <span className="px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>
            Module 8
          </span>
          <h2 className="text-3xl font-black text-white mt-1">AI Pricing & Business Models</h2>
          <p className="text-slate-400 text-sm">8 pricing models, real vendor benchmarks, and an interactive COMPASS framework tool</p>
        </motion.div>

        <div className="flex gap-5 flex-1 min-h-0">

          {/* Left: 8 pricing models grid */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              💡 Market shifting: per-seat → outcome-based. Top 500 SaaS companies made 1,800+ pricing changes in 2025.
            </div>
            <div className="grid grid-cols-2 gap-2 overflow-y-auto">
              {pricingModels.map((pm, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.05 * i }}
                  className="rounded-xl p-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{pm.icon}</span>
                    <span className="font-bold text-white text-sm">{pm.label}</span>
                    <span className="ml-auto px-1.5 py-0.5 rounded text-xs font-medium"
                      style={{ background: `${pm.color}18`, color: pm.color }}>{pm.tag}</span>
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">{pm.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: benchmarks + COMPASS */}
          <div className="w-64 flex-shrink-0 flex flex-col gap-4">
            {/* Benchmarks */}
            <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Enterprise Benchmarks</div>
              <div className="flex flex-col gap-2">
                {benchmarks.map((b, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{b.vendor}</span>
                    <span className="font-bold" style={{ color: b.color }}>{b.model}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COMPASS */}
            <div className="rounded-xl p-4 flex-1" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">COMPASS Framework</div>
              <div className="text-xs text-slate-400 mb-3">Answer 2 questions to find the right pricing model for your client:</div>
              {compassQ.map((cq, qi) => (
                <div key={qi} className="mb-3">
                  <div className="text-xs font-semibold text-slate-300 mb-1">{cq.q}</div>
                  <div className="flex flex-col gap-1">
                    {cq.opts.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setCompassAnswers(a => ({ ...a, [qi]: opt }))}
                        className="text-left text-xs px-2 py-1.5 rounded-lg transition-all"
                        style={{
                          background: compassAnswers[qi] === opt ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.05)",
                          border: `1px solid ${compassAnswers[qi] === opt ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                          color: compassAnswers[qi] === opt ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {rec && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-lg p-3 text-center"
                  style={{ background: `${rec.color}18`, border: `1px solid ${rec.color}40` }}
                >
                  <div className="text-xs text-slate-400 mb-1">Recommended Model</div>
                  <div className="font-black text-base" style={{ color: rec.color }}>{rec.model}</div>
                  <div className="text-xs text-slate-400 mt-1">{rec.desc}</div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

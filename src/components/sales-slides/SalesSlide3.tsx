"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const models = [
  { name: "GPT-5.2", tokens: "400K", novels: "300", color: "#10b981", width: "40%" },
  { name: "Gemini 3", tokens: "1M", novels: "750", color: "#6366f1", width: "60%" },
  { name: "Grok 4.1", tokens: "2M", novels: "1,500", color: "#f59e0b", width: "80%" },
  { name: "Llama 4 Scout", tokens: "10M", novels: "7,500", color: "#ec4899", width: "100%" },
];

const tempExamples: Record<number, string> = {
  0: "The quarterly report shows a 15% revenue increase in Q3.",
  1: "Revenue climbed 15% last quarter, a solid and consistent performance.",
  2: "Strong momentum this quarter — revenue up 15% and the team is firing on all cylinders.",
  3: "Q3 revenue surged 15%! The growth engine is officially roaring. 🚀",
  4: "Revenue skyrocketed like a rocket fueled by pure innovation and unstoppable ambition! ✨🔥",
};

const hallucinationExamples = [
  { type: "Fake stat", bad: '"67% of sales reps use AI daily" — AI invented this', fix: "Ask for source. Verify before using in a pitch." },
  { type: "Fake quote", bad: '"Gartner says AI will replace 80% of sales jobs" — never said', fix: "Never use AI-generated quotes in client materials." },
  { type: "Fake company detail", bad: "AI describes a prospect's revenue/headcount incorrectly", fix: "Always verify company data from LinkedIn, Crunchbase, or their site." },
];

export default function SalesSlide3({ isActive }: { isActive: boolean }) {
  const [temp, setTemp] = useState(0);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(145deg, #020817 0%, #0a0f1e 60%, #050d1a 100%)" }}>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(14,165,233,0.06) 0%, transparent 60%)"
      }} />

        <div className="relative z-10 flex flex-col h-full px-8 py-4 max-w-7xl mx-auto w-full">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
          <span className="px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(14,165,233,0.15)", color: "#38bdf8", border: "1px solid rgba(14,165,233,0.25)" }}>
            Module 2
          </span>
          <h2 className="text-3xl font-black text-white mt-1">How AI Models Work</h2>
          <p className="text-slate-400 text-sm">From text prediction to image generation — the two engines behind modern AI</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 flex-1 min-h-0">

          {/* Left column */}
          <div className="flex flex-col gap-4">

            {/* Core concept */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl p-4"
              style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <div className="text-xs font-bold text-indigo-400 mb-2">🎯 THE CORE CONCEPT</div>
              <p className="text-slate-300 text-xs leading-relaxed">
                An LLM is like someone who has read <strong className="text-white">every sales book, email, and deal transcript ever written.</strong> It
                predicts the next word — one at a time — until a full response emerges. The same as your phone's autocomplete, but trained on billions of pages.
              </p>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                {["un", "com", "fort", "able"].map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-xs font-mono font-bold"
                    style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.3)" }}>
                    {t}
                  </span>
                ))}
                <span className="text-slate-500 text-xs">= 4 tokens (not 1 word)</span>
              </div>
            </motion.div>

            {/* Context Window */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="rounded-xl p-4 flex-1"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Context Window — AI's short-term memory</div>
              <div className="flex flex-col gap-2">
                {models.map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="text-xs font-bold text-slate-400 w-24 flex-shrink-0">{m.name}</div>
                    <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={isActive ? { width: m.width } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                        style={{ background: m.color, boxShadow: `0 0 8px ${m.color}60` }}
                      />
                    </div>
                    <div className="text-xs text-slate-400 w-20 text-right flex-shrink-0">{m.tokens} ≈ {m.novels} novels</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">

            {/* Temperature */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                🌡️ Temperature — The Creativity Dial
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-slate-500">Precise</span>
                <input
                  type="range" min={0} max={4} value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="flex-1 accent-indigo-500 cursor-pointer"
                />
                <span className="text-xs text-slate-500">Creative</span>
              </div>
              <div className="flex justify-between mb-2">
                {[0,1,2,3,4].map(v => (
                  <span key={v} className="text-xs font-mono" style={{ color: v === temp ? "#818cf8" : "rgba(255,255,255,0.2)" }}>{v/4 === 0 ? "0.0" : (v*0.25).toFixed(2)}</span>
                ))}
              </div>
              <motion.div
                key={temp}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg p-3 text-sm text-slate-200 leading-relaxed"
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", minHeight: 60 }}
              >
                &quot;{tempExamples[temp]}&quot;
              </motion.div>
            </motion.div>

            {/* Hallucinations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="rounded-xl p-4 flex-1"
              style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              <div className="text-xs font-bold mb-3" style={{ color: "#f87171" }}>
                ⚠️ Hallucinations — Why AI can be confidently wrong
              </div>
              <p className="text-slate-400 text-xs mb-3">LLMs always generate plausible-sounding text — even when facts are made up. They pattern-match, not fact-check.</p>
              <div className="flex flex-col gap-2">
                {hallucinationExamples.map((h, i) => (
                  <div key={i} className="rounded-lg p-2" style={{ background: "rgba(0,0,0,0.2)" }}>
                    <div className="text-xs font-bold text-red-400 mb-0.5">{h.type}</div>
                    <div className="text-xs text-slate-400 mb-1">{h.bad}</div>
                    <div className="text-xs text-green-400">✓ {h.fix}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

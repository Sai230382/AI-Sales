"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const frameworks = [
  {
    id: "APE", color: "#6366f1", label: "APE — The Starter",
    subtitle: "Action, Purpose, Expectation",
    letters: [
      { l: "A", word: "Action", desc: "What do you want the AI to do?" },
      { l: "P", word: "Purpose", desc: "Why are you doing this?" },
      { l: "E", word: "Expectation", desc: "What does a great output look like?" },
    ],
    when: "The simplest framework — covers 80% of everyday tasks. Perfect for beginners and quick prompts.",
    example: 'Draft [Action] a follow-up email to re-engage a prospect who went silent after our demo [Purpose] in 3 short paragraphs with a clear CTA to schedule a call [Expectation]',
  },
  {
    id: "ROLE", color: "#0ea5e9", label: "R.O.L.E. — The Reliable Workhorse",
    subtitle: "Role, Outcome, Length, Examples",
    letters: [
      { l: "R", word: "Role", desc: "Who should the AI be?" },
      { l: "O", word: "Outcome", desc: "What do you want produced?" },
      { l: "L", word: "Length", desc: "How long should it be?" },
      { l: "E", word: "Examples", desc: "Show the AI what good looks like" },
    ],
    when: "The original framework — reliable for most business tasks. Define role, outcome, length, and show examples.",
    example: 'Role: Senior enterprise sales strategist. Outcome: Write a value proposition for our AI analytics platform targeting CFOs. Length: 150 words, 3 bullet points. Examples: "Like Gong does for conversation intelligence, we do for financial forecasting."',
  },
  {
    id: "RACE", color: "#10b981", label: "RACE — The Sales Favourite",
    subtitle: "Role, Action, Context, Expectation",
    letters: [
      { l: "R", word: "Role", desc: "Who should the AI be?" },
      { l: "A", word: "Action", desc: "What task to complete?" },
      { l: "C", word: "Context", desc: "Relevant background information" },
      { l: "E", word: "Expectation", desc: "Specific output requirements" },
    ],
    when: "Best for high-volume, fast tasks — B2B outreach, quick analysis. The go-to for daily sales work.",
    example: 'Role: B2B SaaS sales rep specialising in HR tech. Action: Write a cold outreach email. Context: Target is VP of HR at a 500-person company, manual onboarding, posted about hiring challenges on LinkedIn. Expectation: Under 120 words, one clear CTA, casual-professional tone.',
  },
  {
    id: "CO-STAR", color: "#f59e0b", label: "CO-STAR — The Content Creator",
    subtitle: "Context, Objective, Style, Tone, Audience, Response",
    letters: [
      { l: "C", word: "Context", desc: "Background situation" },
      { l: "O", word: "Objective", desc: "What you want to achieve" },
      { l: "S", word: "Style", desc: "Writing style (formal, casual, etc)" },
      { l: "T", word: "Tone", desc: "Emotional register" },
      { l: "A", word: "Audience", desc: "Who will read this?" },
      { l: "R", word: "Response", desc: "Exact output format" },
    ],
    when: "Best when voice and audience matter — customer emails, exec summaries, social posts.",
    example: 'Context: We just closed a Fortune 500 healthcare deal. Objective: Announce the win internally. Style: Celebratory but professional. Tone: Excited and grateful. Audience: Global sales team. Response: Slack message, 100 words, with emoji.',
  },
  {
    id: "RISEN", color: "#ec4899", label: "RISEN — The Deep Diver",
    subtitle: "Role, Instructions, Steps, End Goal, Narrowing",
    letters: [
      { l: "R", word: "Role", desc: "Expert identity for the AI" },
      { l: "I", word: "Instructions", desc: "Specific task details" },
      { l: "S", word: "Steps", desc: "Process to follow" },
      { l: "E", word: "End Goal", desc: "Final deliverable" },
      { l: "N", word: "Narrowing", desc: "Constraints and boundaries" },
    ],
    when: "Best for complex analysis and multi-step tasks that need structure. Slower but extremely thorough.",
    example: 'Role: Senior deal strategist. Instructions: Evaluate our enterprise deal with Acme Corp. Steps: 1) Budget alignment 2) Stakeholder map 3) Competitive threats 4) Next actions. End Goal: Go/no-go recommendation. Narrowing: Under 500 words, bullet points only.',
  },
  {
    id: "COT", color: "#8b5cf6", label: "Chain of Thought",
    subtitle: "Step-by-step reasoning technique",
    letters: [
      { l: "1", word: "State the problem", desc: "Clearly define what you're solving" },
      { l: "2", word: "Think step by step", desc: "Explicitly tell AI to reason aloud" },
      { l: "3", word: "Show your work", desc: "Ask AI to explain each step" },
      { l: "4", word: "Conclusion", desc: "Derive the final answer from reasoning" },
    ],
    when: "Use when accuracy matters most. Forces AI to reason through logic instead of pattern-matching to an answer.",
    example: '"Analyse the Acme Corp opportunity. Think step by step: 1) Budget fit ($50K budget vs $45K price) 2) Decision maker access 3) Competition 4) Timeline (fiscal year ends March 31) 5) Recommendation: pursue, maintain, or deprioritise?"',
  },
];

export default function SalesSlide6({ isActive }: { isActive: boolean }) {
  const [selected, setSelected] = useState(0);
  const fw = frameworks[selected];

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(145deg, #020817 0%, #0a0f1e 60%, #050d1a 100%)" }}>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(16,185,129,0.05) 0%, transparent 60%)"
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
            style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.25)" }}>
            Module 5
          </span>
          <h2 className="text-3xl font-black text-white mt-1">Prompting Frameworks</h2>
          <p className="text-slate-400 text-sm">From beginner to expert — 6 frameworks to get dramatically better AI outputs</p>
        </motion.div>

        <div className="flex gap-4 flex-1 min-h-0">

          {/* Left: framework selector */}
          <div className="flex flex-col gap-2 w-52 flex-shrink-0">
            {frameworks.map((fw, i) => (
              <motion.button
                key={fw.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                onClick={() => setSelected(i)}
                className="text-left rounded-xl px-3 py-2 transition-all"
                style={{
                  background: selected === i ? `${fw.color}18` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selected === i ? fw.color + "50" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: selected === i ? `0 0 14px ${fw.color}20` : "none",
                }}
              >
                <div className="font-bold text-white text-xs" style={{ color: selected === i ? fw.color : "white" }}>{fw.id}</div>
                <div className="text-xs text-slate-500">{fw.subtitle.split(",")[0]}</div>
              </motion.button>
            ))}
          </div>

          {/* Right: detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex-1 rounded-xl p-5 flex flex-col gap-4 overflow-y-auto"
              style={{ background: `${fw.color}08`, border: `1px solid ${fw.color}25` }}
            >
              <div>
                <div className="text-2xl font-black text-white">{fw.label}</div>
                <div className="text-sm font-semibold mt-0.5" style={{ color: fw.color }}>{fw.subtitle}</div>
              </div>

              {/* Letter breakdown */}
              <div className="flex gap-2 flex-wrap">
                {fw.letters.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex flex-col items-center gap-1 rounded-xl px-3 py-2 min-w-[70px] text-center"
                    style={{ background: `${fw.color}15`, border: `1px solid ${fw.color}30` }}
                  >
                    <span className="text-xl font-black" style={{ color: fw.color }}>{l.l}</span>
                    <span className="text-xs font-bold text-white">{l.word}</span>
                    <span className="text-xs text-slate-500 leading-tight">{l.desc}</span>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-xs font-bold text-slate-400 mb-1">WHEN TO USE</div>
                <div className="text-sm text-slate-300">{fw.when}</div>
              </div>

              <div className="rounded-lg p-3" style={{ background: `${fw.color}10`, border: `1px solid ${fw.color}25` }}>
                <div className="text-xs font-bold mb-1" style={{ color: fw.color }}>💼 SALES EXAMPLE</div>
                <div className="text-xs text-slate-300 leading-relaxed font-mono">{fw.example}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

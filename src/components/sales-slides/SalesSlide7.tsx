"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RotateCcw } from "lucide-react";

const frameworks: Record<string, { label: string; fields: { key: string; placeholder: string }[] }> = {
  APE: {
    label: "APE — Action, Purpose, Expectation",
    fields: [
      { key: "action", placeholder: "What do you want the AI to do? e.g. Write a follow-up email" },
      { key: "purpose", placeholder: "Why? e.g. Re-engage a prospect who went silent after our demo" },
      { key: "expectation", placeholder: "What does good look like? e.g. 3 paragraphs, clear CTA to book a call" },
    ],
  },
  RACE: {
    label: "RACE — Role, Action, Context, Expectation",
    fields: [
      { key: "role", placeholder: "Role: e.g. Senior B2B SaaS sales rep specialising in HR tech" },
      { key: "action", placeholder: "Action: e.g. Write a cold outreach email" },
      { key: "context", placeholder: "Context: e.g. Target is VP HR at 500-person company, posted about hiring challenges" },
      { key: "expectation", placeholder: "Expectation: e.g. Under 120 words, casual-professional tone, one CTA" },
    ],
  },
  ROLE: {
    label: "R.O.L.E. — Role, Outcome, Length, Examples",
    fields: [
      { key: "role", placeholder: "Role: e.g. You are a senior enterprise sales strategist" },
      { key: "outcome", placeholder: "Outcome: e.g. Write a compelling value proposition for CFOs" },
      { key: "length", placeholder: "Length: e.g. 150 words maximum, 3 bullet points" },
      { key: "examples", placeholder: 'Examples: e.g. "Like Gong does for conversation intelligence, we do for X"' },
    ],
  },
  COSTAR: {
    label: "CO-STAR — Context, Objective, Style, Tone, Audience, Response",
    fields: [
      { key: "context", placeholder: "Context: e.g. We just closed a Fortune 500 healthcare deal" },
      { key: "objective", placeholder: "Objective: e.g. Announce the win to the sales team" },
      { key: "style", placeholder: "Style: e.g. Celebratory but professional" },
      { key: "tone", placeholder: "Tone: e.g. Excited and grateful" },
      { key: "audience", placeholder: "Audience: e.g. Global sales team on Slack" },
      { key: "response", placeholder: "Response format: e.g. Slack message, ~100 words" },
    ],
  },
  RISEN: {
    label: "RISEN — Role, Instructions, Steps, End Goal, Narrowing",
    fields: [
      { key: "role", placeholder: "Role: e.g. Senior deal strategist" },
      { key: "instructions", placeholder: "Instructions: e.g. Evaluate our enterprise deal with Acme Corp" },
      { key: "steps", placeholder: "Steps: e.g. 1) Budget alignment 2) Stakeholder map 3) Competitive threats" },
      { key: "endgoal", placeholder: "End Goal: e.g. Go/no-go recommendation" },
      { key: "narrowing", placeholder: "Narrowing: e.g. Under 500 words, bullet points only" },
    ],
  },
};

const beforeAfter = [
  {
    bad: "Write me an email for a prospect",
    good: "Role: Senior SaaS sales rep. Action: Write a personalised cold email. Context: Prospect is CIO at 200-bed hospital, posted about EHR frustrations. Expectation: Under 100 words, reference their pain point, one CTA to book a 15-min call.",
    fw: "RACE",
  },
  {
    bad: "Help me analyse this deal",
    good: "Analyse the Acme Corp opportunity. Think step by step: 1) Budget fit ($50K budget vs $45K price) 2) Decision maker access 3) Competitive situation 4) Timeline (fiscal year ends March) 5) Recommendation: pursue aggressively, maintain, or deprioritise?",
    fw: "Chain of Thought",
  },
];

export default function SalesSlide7({ isActive }: { isActive: boolean }) {
  const [selectedFw, setSelectedFw] = useState("RACE");
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const fw = frameworks[selectedFw];

  const generatedPrompt = fw.fields
    .filter((f) => values[`${selectedFw}_${f.key}`]?.trim())
    .map((f) => `${f.key.charAt(0).toUpperCase() + f.key.slice(1)}: ${values[`${selectedFw}_${f.key}`]}`)
    .join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    const newVals = { ...values };
    fw.fields.forEach((f) => { delete newVals[`${selectedFw}_${f.key}`]; });
    setValues(newVals);
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(145deg, #020817 0%, #0a0f1e 60%, #050d1a 100%)" }}>

        <div className="relative z-10 flex flex-col h-full px-8 py-4 max-w-7xl mx-auto w-full">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
          <span className="px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>
            Prompt Lab
          </span>
          <h2 className="text-3xl font-black text-white mt-1">Interactive Prompt Builder</h2>
          <p className="text-slate-400 text-sm">Build, test, and copy prompts using any framework</p>
        </motion.div>

        <div className="flex gap-5 flex-1 min-h-0">

          {/* Left: builder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 flex flex-col gap-3"
          >
            {/* Framework selector */}
            <div className="flex gap-2 flex-wrap">
              {Object.keys(frameworks).map((k) => (
                <button
                  key={k}
                  onClick={() => setSelectedFw(k)}
                  className="px-3 py-1 rounded-lg text-xs font-bold transition-all"
                  style={{
                    background: selectedFw === k ? "#6366f1" : "rgba(255,255,255,0.05)",
                    color: selectedFw === k ? "#fff" : "rgba(255,255,255,0.5)",
                    border: `1px solid ${selectedFw === k ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                  }}
                >
                  {k}
                </button>
              ))}
            </div>

            <div className="text-xs font-semibold text-indigo-400">{fw.label}</div>

            {/* Fields */}
            <div className="flex flex-col gap-2 overflow-y-auto flex-1">
              {fw.fields.map((f) => (
                <textarea
                  key={`${selectedFw}_${f.key}`}
                  rows={2}
                  placeholder={f.placeholder}
                  value={values[`${selectedFw}_${f.key}`] || ""}
                  onChange={(e) => setValues((v) => ({ ...v, [`${selectedFw}_${f.key}`]: e.target.value }))}
                  className="w-full rounded-lg px-3 py-2 text-xs resize-none outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                  }}
                />
              ))}
            </div>

            {/* Generated prompt */}
            <div className="rounded-xl p-3 flex-shrink-0"
              style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", minHeight: 80 }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-indigo-400">Generated Prompt</span>
                <div className="flex gap-2">
                  <button onClick={handleClear} className="text-slate-500 hover:text-white transition-colors"><RotateCcw size={12} /></button>
                  <button onClick={handleCopy} className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1 text-xs">
                    <Copy size={12} />{copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                {generatedPrompt || "Fill in the fields above to generate your structured prompt..."}
              </pre>
            </div>
          </motion.div>

          {/* Right: before/after */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-72 flex-shrink-0 flex flex-col gap-3"
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Before & After</div>
            {beforeAfter.map((ba, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="p-3" style={{ background: "rgba(239,68,68,0.08)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-xs font-bold text-red-400 mb-1">❌ Weak Prompt</div>
                  <div className="text-xs text-slate-400 italic">&quot;{ba.bad}&quot;</div>
                </div>
                <div className="p-3" style={{ background: "rgba(16,185,129,0.06)" }}>
                  <div className="text-xs font-bold text-green-400 mb-1">✅ {ba.fw}-Enhanced</div>
                  <div className="text-xs text-slate-300 leading-relaxed">{ba.good}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

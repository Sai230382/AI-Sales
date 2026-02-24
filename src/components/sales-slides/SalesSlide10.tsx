"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const industries = [
  {
    id: "healthcare", label: "🏥 Healthcare", color: "#10b981",
    dos: [
      "Always use BAAs (Business Associate Agreements) with AI vendors",
      "Ensure AI tools are HIPAA-compliant — ask for documentation",
      "Understand FDA regulation: clinical decision AI may require clearance",
      "Disclose to patients when AI is involved in their care pathway",
    ],
    donts: [
      "Never enter patient names, DOBs, or PHI into consumer AI tools (ChatGPT, etc.)",
      "Never make clinical claims based on AI output without physician review",
      "Never use AI-generated statistics in compliance conversations without verification",
    ],
    keyQ: ["Where is patient data stored?", "Is the AI model trained on PHI?", "Do you have a BAA template?"],
  },
  {
    id: "retail", label: "🛒 Retail", color: "#f59e0b",
    dos: [
      "Disclose AI-generated personalisation in marketing (CCPA/GDPR requirements)",
      "Audit AI pricing models for discriminatory patterns by protected class",
      "Maintain clear data retention policies — know what you collect and for how long",
      "Give customers opt-out rights for AI-driven profiling",
    ],
    donts: [
      "Don't use dynamic pricing that varies by demographic or protected characteristic",
      "Don't use AI-generated urgency or scarcity claims without basis in fact (dark patterns)",
      "Don't sell AI-generated look-alike audiences without explicit consent",
    ],
    keyQ: ["How does your AI handle CCPA/GDPR data requests?", "What bias testing do you run on your recommendation models?"],
  },
  {
    id: "financial", label: "🏦 Financial", color: "#6366f1",
    dos: [
      "Ensure all AI lending/credit decisions are explainable (ECOA/Fair Lending)",
      "Maintain full audit trails for all AI-driven decisions",
      "Test AI models for disparate impact before deployment",
      "Keep humans in the loop for any decision above a risk threshold",
    ],
    donts: [
      "Don't deploy 'black box' AI for credit decisions — regulators require explainability",
      "Don't use AI to circumvent BSA/AML monitoring requirements",
      "Don't use unvalidated AI models for loan pricing or underwriting",
    ],
    keyQ: ["Can you explain why any AI decision was made?", "How do you test for model bias?", "Do you have SOX audit controls for AI?"],
  },
  {
    id: "contact", label: "📞 Contact Center", color: "#ec4899",
    dos: [
      "Follow call recording laws — two-party consent states require disclosure",
      "Comply with TCPA for AI-initiated outbound calls",
      "Disclose when a caller is speaking with an AI (many jurisdictions require this)",
      "Maintain human escalation paths — never trap customers in AI loops",
    ],
    donts: [
      "Don't record calls without proper disclosure in two-party consent states",
      "Don't use AI for outbound calling without TCPA compliance review",
      "Don't store voiceprints or biometric data without explicit consent",
    ],
    keyQ: ["How do you handle consent for AI call recording?", "What's your escalation protocol when AI fails to resolve?"],
  },
];

const universalDos = [
  "Always verify AI-generated statistics before using in client conversations",
  "Tell clients when outputs are AI-assisted",
  "Keep humans in the loop for high-stakes decisions",
  "Use enterprise AI tools with proper data processing agreements",
];

const universalDonts = [
  "Never enter client confidential data into public AI tools",
  "Never share AI-generated quotes as real without verifying",
  "Never use AI for final compliance or legal advice",
  "Never bypass your company's approved AI tool policy",
];

export default function SalesSlide10({ isActive }: { isActive: boolean }) {
  const [activeInd, setActiveInd] = useState(0);
  const ind = industries[activeInd];

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
            style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)" }}>
            Module 9
          </span>
          <h2 className="text-3xl font-black text-white mt-1">AI Ethics, Privacy & Responsible Use</h2>
          <p className="text-slate-400 text-sm">94% of enterprises cite data privacy as their #1 AI concern (McKinsey 2026). Know this to build trust and win deals.</p>
        </motion.div>

        <div className="flex gap-5 flex-1 min-h-0">

          {/* Left: universal rules */}
          <div className="w-56 flex-shrink-0 flex flex-col gap-3">
            <div className="rounded-xl p-3" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div className="text-xs font-bold text-green-400 mb-2">✅ UNIVERSAL DO'S</div>
              {universalDos.map((d, i) => (
                <div key={i} className="text-xs text-slate-300 mb-1.5 flex items-start gap-1.5 leading-relaxed">
                  <span className="text-green-400 flex-shrink-0 mt-0.5">▸</span>{d}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <div className="text-xs font-bold text-red-400 mb-2">❌ UNIVERSAL DON'TS</div>
              {universalDonts.map((d, i) => (
                <div key={i} className="text-xs text-slate-300 mb-1.5 flex items-start gap-1.5 leading-relaxed">
                  <span className="text-red-400 flex-shrink-0 mt-0.5">✕</span>{d}
                </div>
              ))}
            </div>
          </div>

          {/* Right: industry-specific */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex gap-2">
              {industries.map((ind, i) => (
                <button
                  key={ind.id}
                  onClick={() => setActiveInd(i)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                  style={{
                    background: activeInd === i ? ind.color : "rgba(255,255,255,0.05)",
                    color: activeInd === i ? "#fff" : "rgba(255,255,255,0.5)",
                    border: `1px solid ${activeInd === i ? ind.color : "rgba(255,255,255,0.08)"}`,
                    boxShadow: activeInd === i ? `0 0 12px ${ind.color}50` : "none",
                  }}
                >
                  {ind.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeInd}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 grid grid-cols-2 gap-3"
              >
                <div className="rounded-xl p-4" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <div className="text-xs font-bold text-green-400 mb-2">✅ DO'S</div>
                  {ind.dos.map((d, i) => (
                    <div key={i} className="text-xs text-slate-300 mb-2 flex items-start gap-1.5 leading-relaxed">
                      <span className="text-green-400 flex-shrink-0 mt-0.5">▸</span>{d}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="rounded-xl p-4 flex-1" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <div className="text-xs font-bold text-red-400 mb-2">❌ DON'TS</div>
                    {ind.donts.map((d, i) => (
                      <div key={i} className="text-xs text-slate-300 mb-2 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-red-400 flex-shrink-0 mt-0.5">✕</span>{d}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl p-4" style={{ background: `${ind.color}10`, border: `1px solid ${ind.color}25` }}>
                    <div className="text-xs font-bold mb-2" style={{ color: ind.color }}>❓ KEY CLIENT QUESTIONS</div>
                    {ind.keyQ.map((q, i) => (
                      <div key={i} className="text-xs text-slate-300 mb-1.5 flex items-start gap-1.5 leading-relaxed">
                        <span style={{ color: ind.color }} className="flex-shrink-0 mt-0.5">▸</span>&quot;{q}&quot;
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

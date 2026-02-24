"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const industries = [
  {
    id: "healthcare", label: "🏥 Healthcare", color: "#10b981",
    apps: [
      { title: "AI Scribes", desc: "Ambient clinical documentation — listens to patient-doctor conversations and generates structured notes. Reduces documentation time by 70%." },
      { title: "Medical Imaging AI", desc: "AI-assisted radiology detecting anomalies in X-rays, MRIs, and CT scans with diagnostic accuracy matching human radiologists." },
      { title: "Patient Engagement", desc: "AI chatbots for appointment scheduling, medication reminders, symptom triage — improving adherence and reducing no-shows by 35%." },
      { title: "Revenue Cycle Management", desc: "AI automates coding, claim submission, denial management, and prior authorisation — reducing denial rates and accelerating reimbursement." },
    ],
    stats: ["70% documentation time reduction", "95% diagnostic accuracy", "35% no-show reduction", "40% denial rate reduction"],
    pitches: [
      "Your physicians spend 2+ hours/day on documentation. AI scribes cut that by 70%, giving doctors more time with patients and reducing burnout.",
      "AI imaging catches anomalies earlier and more consistently than manual review — improving outcomes and reducing liability.",
    ],
    starters: [
      "How much time do your clinicians spend on documentation vs. patient care?",
      "What's your current denial rate, and how are you managing prior authorisations?",
      "Are you seeing burnout-driven turnover in your clinical staff?",
    ],
  },
  {
    id: "retail", label: "🛒 Retail", color: "#f59e0b",
    apps: [
      { title: "Hyper-Personalisation", desc: "AI engines tailoring product recommendations, content, and offers in real-time based on browsing behaviour, purchase history, and context." },
      { title: "Dynamic Pricing", desc: "AI adjusts prices in real-time based on demand, competition, and inventory — maximising margins while staying competitive." },
      { title: "AI Customer Service", desc: "Chatbots and agent assist handling order tracking, returns, product questions. 24/7 with seamless escalation to humans." },
      { title: "Visual Search", desc: "Customers snap a photo → AI finds matching products in your catalog. Driving discovery and conversion for fashion and home decor." },
    ],
    stats: ["25% lift in conversion from personalisation", "15% margin improvement from dynamic pricing", "60% of queries deflected by AI", "3x faster inventory turns"],
    pitches: [
      "Personalisation at scale used to require a data science team. AI makes it accessible to any retailer — and it pays back in 30-60 days.",
      "Your competitors are already doing dynamic pricing. Static pricing in a dynamic market means you're leaving money on the table.",
    ],
    starters: [
      "What percentage of your customer service volume could be handled by AI without impacting satisfaction?",
      "How are you currently handling personalisation at scale?",
      "What's your average cart abandonment rate, and what are you doing about it?",
    ],
  },
  {
    id: "financial", label: "🏦 Financial Services", color: "#6366f1",
    apps: [
      { title: "Fraud Detection", desc: "Real-time AI analysing thousands of signals per transaction — catching fraud patterns humans can't spot, with fewer false positives." },
      { title: "AI Underwriting", desc: "Machine learning models assessing risk in seconds using traditional + alternative data — expanding credit access while managing risk." },
      { title: "Robo-Advisory", desc: "AI-driven portfolio management and financial planning at scale — delivering institutional-quality advice at consumer price points." },
      { title: "Regulatory Compliance", desc: "AI automating compliance monitoring, suspicious activity reporting, and audit trail generation — reducing manual compliance costs by 40%." },
    ],
    stats: ["85% fraud detection improvement", "70% faster underwriting decisions", "40% compliance cost reduction", "3x advisor capacity with AI assist"],
    pitches: [
      "Black box AI is a non-starter in regulated finance. Our AI provides full audit trails and model explainability for every decision.",
      "AI underwriting can expand your addressable market to thin-file customers — profitably — by using alternative data signals.",
    ],
    starters: [
      "How are you currently managing model explainability for regulatory requirements?",
      "What's your false positive rate on fraud alerts, and what does each false positive cost in manual review?",
      "Are you using AI to assess thin-file or alternative credit data?",
    ],
  },
  {
    id: "contact", label: "📞 Contact Center", color: "#ec4899",
    apps: [
      { title: "Agent Assist AI", desc: "Real-time AI surfacing answers, suggesting responses, and coaching agents during live calls — reducing handle time by 30%." },
      { title: "Intelligent Routing", desc: "AI matching customers to the right agent based on intent, sentiment, and agent skills — improving first-contact resolution." },
      { title: "Quality Monitoring", desc: "AI analysing 100% of interactions for compliance, sentiment, and coaching opportunities — vs. 2-5% manual sampling." },
      { title: "Conversational AI", desc: "AI handling entire customer journeys — from intent detection to resolution — with seamless handoff to human agents when needed." },
    ],
    stats: ["30% AHT reduction", "25% improvement in FCR", "100% interaction quality monitoring", "$0.99-2.00 AI cost vs $2.00+ human cost"],
    pitches: [
      "You're currently monitoring 2-5% of calls. AI monitors 100% — meaning compliance gaps and coaching opportunities you're missing today get caught tomorrow.",
      "AI agent assist doesn't replace your agents. It makes your average agent perform like your best agent.",
    ],
    starters: [
      "What percentage of your contact volume is currently handled by self-service vs. agents?",
      "What's your current cost per interaction, and what would a 30% reduction mean annually?",
      "How are you currently doing QA monitoring — and how much of your volume do you actually sample?",
    ],
  },
];

export default function SalesSlide8({ isActive }: { isActive: boolean }) {
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
            style={{ background: "rgba(236,72,153,0.15)", color: "#f472b6", border: "1px solid rgba(236,72,153,0.25)" }}>
            Modules 7–10
          </span>
          <h2 className="text-3xl font-black text-white mt-1">Industry AI Playbooks</h2>
          <p className="text-slate-400 text-sm">KPIs, pitch angles, and conversation starters for 4 key industries</p>
        </motion.div>

        {/* Industry tabs */}
        <div className="flex gap-2 mb-4">
          {industries.map((ind, i) => (
            <button
              key={ind.id}
              onClick={() => setActiveInd(i)}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={{
                background: activeInd === i ? ind.color : "rgba(255,255,255,0.05)",
                color: activeInd === i ? "#fff" : "rgba(255,255,255,0.5)",
                border: `1px solid ${activeInd === i ? ind.color : "rgba(255,255,255,0.08)"}`,
                boxShadow: activeInd === i ? `0 0 16px ${ind.color}50` : "none",
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
            transition={{ duration: 0.25 }}
            className="flex-1 grid grid-cols-3 gap-4 min-h-0"
          >
            {/* Applications */}
            <div className="col-span-2 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                {ind.apps.map((app, i) => (
                  <div key={i} className="rounded-xl p-3"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="font-bold text-white text-sm mb-1">{app.title}</div>
                    <div className="text-xs text-slate-400 leading-relaxed">{app.desc}</div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-2">
                {ind.stats.map((s, i) => (
                  <div key={i} className="rounded-lg p-2 text-center"
                    style={{ background: `${ind.color}12`, border: `1px solid ${ind.color}25` }}>
                    <div className="text-xs font-bold" style={{ color: ind.color }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pitches + Starters */}
            <div className="flex flex-col gap-3 overflow-y-auto">
              <div className="rounded-xl p-3" style={{ background: `${ind.color}10`, border: `1px solid ${ind.color}25` }}>
                <div className="text-xs font-bold mb-2" style={{ color: ind.color }}>💡 PITCH ANGLES</div>
                {ind.pitches.map((p, i) => (
                  <div key={i} className="text-xs text-slate-300 mb-2 leading-relaxed">
                    <span className="text-slate-500 mr-1">"</span>{p}<span className="text-slate-500">"</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-xs font-bold text-slate-400 mb-2">🗣️ CONVERSATION STARTERS</div>
                {ind.starters.map((s, i) => (
                  <div key={i} className="text-xs text-slate-300 mb-2 flex items-start gap-1.5 leading-relaxed">
                    <span style={{ color: ind.color }} className="mt-0.5 flex-shrink-0">▸</span>{s}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

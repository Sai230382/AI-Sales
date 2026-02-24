"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const spectrum = [
  {
    num: "1", color: "#6366f1", title: "Generative AI", subtitle: "The Intern",
    desc: "Creates content on demand — text, images, video, code. Reactive and single-turn. Encyclopedic knowledge but needs specific instructions for every task.",
    capabilities: ["Content creation (emails, proposals)", "Image and video generation", "Code writing and debugging", "Summarization and analysis"],
    limitations: ["No memory between conversations", "Can't access real-time data", "Hallucinates plausible-sounding facts", "Reactive only — waits for prompts"],
    tools: ["ChatGPT (GPT-5.2)", "Claude (Opus 4.6)", "Gemini 3 Pro", "Grok 4.1", "Midjourney V7"],
    example: '"Write me a cold email for this prospect" — it creates it and waits for your next prompt.',
    stat: "94% of enterprises use Gen AI tools in 2026",
  },
  {
    num: "2", color: "#0ea5e9", title: "AI Copilots", subtitle: "The Executive Assistant",
    desc: "Embedded in-app assistants inside tools you already use — CRM, email, calendar. They watch what you're doing and proactively suggest, draft, and summarize.",
    capabilities: ["In-app drafting and suggestions", "Meeting summarization & action items", "CRM data enrichment", "Email reply drafts"],
    limitations: ["Constrained to one application", "Limited context outside their app", "Dependent on data quality"],
    tools: ["Microsoft Copilot (M365)", "Salesforce Einstein", "HubSpot AI", "Notion AI", "Gmail Smart Compose"],
    example: "You finish a sales call. Your CRM automatically drafts the follow-up email and updates deal stage.",
    stat: "Copilot users save avg 1.2 hrs/day (Microsoft 2026)",
  },
  {
    num: "3", color: "#10b981", title: "AI Agents", subtitle: "The Specialist Employee",
    desc: "Autonomous AI that can plan, use tools, search the web, and complete multi-step tasks without hand-holding each step.",
    capabilities: ["Multi-step task completion", "Web browsing & research", "Tool use (calendar, email, CRM)", "Autonomous decision-making"],
    limitations: ["Can make costly autonomous mistakes", "Requires clear goal definition", "Less predictable than copilots"],
    tools: ["Manus AI", "OpenAI Operator", "Anthropic Computer Use", "Devin (coding)"],
    example: "Tell it: 'Research the top 10 prospects in healthcare IT and draft personalised outreach for each.' It does it.",
    stat: "Agentic AI market projected at $47B by 2027",
  },
  {
    num: "4", color: "#f59e0b", title: "Multi-Agent Systems", subtitle: "The Dream Team",
    desc: "Networks of specialized agents collaborating — one researches, one writes, one reviews. Coordination produces outputs no single agent could achieve.",
    capabilities: ["Parallel task execution", "Specialization + coordination", "Self-checking and validation", "Complex workflow automation"],
    limitations: ["Hard to debug when something fails", "Latency from agent coordination", "Cost multiplied by number of agents"],
    tools: ["AutoGen (Microsoft)", "CrewAI", "LangGraph", "Genspark deep research"],
    example: "Competitive analysis: Agent 1 scrapes competitor pricing. Agent 2 analyses sentiment. Agent 3 drafts your response strategy.",
    stat: "Multi-agent use cases up 300% YoY in enterprise (2026)",
  },
  {
    num: "5", color: "#ec4899", title: "AI-Native Apps", subtitle: "The Purpose-Built Tool",
    desc: "Applications built from scratch with AI as the core — not AI bolted on. Every feature is designed around AI capability.",
    capabilities: ["AI-first UX", "Continuous learning from usage", "Deep domain specialization", "Real-time intelligence"],
    limitations: ["Vendor lock-in risk", "Data privacy concerns", "Less flexible than general models"],
    tools: ["Gong (conversation intel)", "Lavender (email AI)", "Perplexity (research)", "Clay (prospecting)"],
    example: "Gong analyses 100% of your sales calls, surfaces coaching insights, predicts deal risk — all without you asking.",
    stat: "AI-native apps command 2-3x premium over traditional SaaS",
  },
  {
    num: "6", color: "#8b5cf6", title: "Autonomous AI Workers", subtitle: "The Digital Employee",
    desc: "AI that holds a job title, runs 24/7, manages its own workflow, and reports outcomes. The frontier of what's possible in 2026.",
    capabilities: ["24/7 availability with no fatigue", "Handles entire job functions", "Learns and improves over time", "Seamless human handoff"],
    limitations: ["Requires significant setup", "Needs clear SLAs and guardrails", "Regulatory and legal grey area"],
    tools: ["Salesforce Agentforce", "Intercom Fin", "Zendesk AI", "ServiceNow AI agents"],
    example: "An AI SDR that researches prospects, personalises outreach, books meetings, and updates CRM — while you sleep.",
    stat: "Outcome-based AI pricing (pay-per-result) now 22% of deals",
  },
];

export default function SalesSlide4({ isActive }: { isActive: boolean }) {
  const [selected, setSelected] = useState(0);
  const current = spectrum[selected];

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(145deg, #020817 0%, #0a0f1e 60%, #050d1a 100%)" }}>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(139,92,246,0.05) 0%, transparent 60%)"
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
            style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.25)" }}>
            Module 3
          </span>
          <h2 className="text-3xl font-black text-white mt-1">The AI Spectrum</h2>
          <p className="text-slate-400 text-sm">6 categories of AI you'll encounter in every 2026 sales conversation</p>
        </motion.div>

        <div className="flex gap-5 flex-1 min-h-0">

          {/* Left: category list */}
          <div className="flex flex-col gap-2 w-56 flex-shrink-0">
            {spectrum.map((s, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                onClick={() => setSelected(i)}
                className="text-left rounded-xl px-3 py-2.5 transition-all"
                style={{
                  background: selected === i ? `${s.color}18` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${selected === i ? s.color + "50" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: selected === i ? `0 0 16px ${s.color}20` : "none",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0"
                    style={{ background: s.color, color: "#fff" }}>{s.num}</span>
                  <div>
                    <div className="font-bold text-white text-xs">{s.title}</div>
                    <div className="text-xs" style={{ color: s.color }}>{s.subtitle}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 rounded-xl p-5 overflow-y-auto flex flex-col gap-4"
              style={{ background: `${current.color}08`, border: `1px solid ${current.color}25` }}
            >
              <div>
                <div className="text-2xl font-black text-white">{current.title}</div>
                <div className="font-semibold mb-2" style={{ color: current.color }}>{current.subtitle}</div>
                <p className="text-slate-300 text-sm leading-relaxed">{current.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">✦ Key Capabilities</div>
                  <div className="flex flex-col gap-1">
                    {current.capabilities.map((c, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span style={{ color: current.color }} className="mt-0.5">▸</span>{c}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">⚠ Limitations</div>
                  <div className="flex flex-col gap-1">
                    {current.limitations.map((l, i) => (
                      <div key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                        <span className="text-red-400 mt-0.5">✕</span>{l}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">🔧 Tools You'll Encounter</div>
                <div className="flex flex-wrap gap-2">
                  {current.tools.map((t, i) => (
                    <span key={i} className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ background: `${current.color}18`, border: `1px solid ${current.color}30`, color: current.color }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-xs font-bold text-slate-400 mb-1">💼 SALES EXAMPLE</div>
                <div className="text-sm text-slate-200 italic">{current.example}</div>
              </div>

              <div className="rounded-lg p-3" style={{ background: `${current.color}12`, border: `1px solid ${current.color}30` }}>
                <div className="text-xs font-bold mb-1" style={{ color: current.color }}>📊 KEY STAT</div>
                <div className="text-sm text-white font-semibold">{current.stat}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

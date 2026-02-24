"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    label: "AI Assistants", color: "#6366f1",
    tools: [
      { name: "ChatGPT (GPT-5.2)", best: "Creative writing, brainstorming, versatile general use", price: "Free / $20/mo", tag: "freemium" },
      { name: "Claude (Opus 4.6)", best: "Coding, long document analysis, structured reasoning", price: "Free / $20/mo", tag: "freemium" },
      { name: "Google Gemini 3", best: "Multimodal (text+image+video), Google Workspace, 1M tokens", price: "Free / $19.99/mo", tag: "freemium" },
      { name: "Grok 4.1", best: "Real-time X/Twitter data, social sentiment, 2M token context", price: "Free / $30/mo", tag: "freemium" },
      { name: "Perplexity", best: "Quick factual lookups with cited sources, real-time web search", price: "Free / $20/mo", tag: "freemium" },
      { name: "Genspark", best: "Deep multi-agent research, structured Sparkpage reports", price: "Free / $24.99/mo", tag: "freemium" },
    ],
  },
  {
    label: "Vibe Coding", color: "#0ea5e9",
    note: 'Coined by Andrej Karpathy (OpenAI co-founder): describe what you want in plain English, AI generates the code. Collins Dictionary Word of the Year 2025.',
    tools: [
      { name: "Cursor", best: "Professional devs, full codebase context, multi-file editing", price: "Free / $20/mo", tag: "freemium" },
      { name: "Windsurf", best: "Large codebases, enterprise teams, Cascade autonomous agent", price: "Free / $15/mo", tag: "freemium" },
      { name: "Lovable", best: "Non-technical founders, best UI polish ($100M ARR in 8 months)", price: "Free / $25/mo", tag: "freemium" },
      { name: "Bolt.new", best: "Browser-based, zero setup, hackathon prototypes, one-click deploy", price: "Free / $25/mo", tag: "freemium" },
      { name: "v0 by Vercel", best: "React/Next.js specific, clean shadcn/ui output", price: "Free / $20/mo", tag: "freemium" },
    ],
  },
  {
    label: "Image Gen", color: "#10b981",
    tools: [
      { name: "Midjourney V7", best: "Artistic, stylized, aesthetically stunning", price: "$10/mo Basic", tag: "paid" },
      { name: "OpenAI GPT Image", best: "Precise prompt execution, complex compositions", price: "Via ChatGPT Plus", tag: "paid" },
      { name: "Flux 2 (BFL)", best: "Most photorealistic output, fastest generation", price: "Pay-per-use", tag: "paid" },
      { name: "Ideogram 3.0", best: "Images with readable text — 90% accuracy vs competitors 40%", price: "Free / $8/mo", tag: "freemium" },
    ],
  },
  {
    label: "Sales Tools", color: "#f59e0b",
    tools: [
      { name: "Gong", best: "Conversation intelligence, deal risk prediction, coaching", price: "~$1,400/user/yr", tag: "paid" },
      { name: "Lavender", best: "Email AI scoring and personalisation assistant", price: "$29/mo", tag: "paid" },
      { name: "Clay", best: "AI-powered prospecting and data enrichment at scale", price: "$149/mo+", tag: "paid" },
      { name: "Regie.ai", best: "AI-generated sales sequences and outreach content", price: "$59/mo+", tag: "paid" },
      { name: "Salesloft / Outreach", best: "AI-enhanced sales engagement platforms", price: "Custom", tag: "paid" },
    ],
  },
  {
    label: "Meeting & Email", color: "#ec4899",
    tools: [
      { name: "Otter.ai", best: "Real-time transcription, meeting summaries, action items", price: "Free / $16.99/mo", tag: "freemium" },
      { name: "Fireflies.ai", best: "Meeting recorder with CRM integration and search", price: "Free / $18/mo", tag: "freemium" },
      { name: "Microsoft Copilot", best: "Office 365 integration, enterprise workflows", price: "$30/mo with M365", tag: "paid" },
      { name: "Superhuman", best: "AI-powered email productivity for sales teams", price: "$30/mo", tag: "paid" },
    ],
  },
  {
    label: "Voice & Conv. AI", color: "#8b5cf6",
    tools: [
      { name: "Vapi", best: "Developer-first voice AI platform, 99+ languages", price: "$0.05/min base", tag: "paid" },
      { name: "Retell AI", best: "Pre-built voice agent templates, easy deployment", price: "$0.07/min", tag: "paid" },
      { name: "Bland AI", best: "Outbound call automation at scale", price: "$0.09/min", tag: "paid" },
      { name: "ElevenLabs", best: "Ultra-realistic voice cloning and generation", price: "Free / $22/mo", tag: "freemium" },
    ],
  },
];

export default function SalesSlide5({ isActive }: { isActive: boolean }) {
  const [activeTab, setActiveTab] = useState(0);
  const cat = categories[activeTab];

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(145deg, #020817 0%, #0a0f1e 60%, #050d1a 100%)" }}>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 40% at 80% 80%, rgba(245,158,11,0.05) 0%, transparent 60%)"
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
            style={{ background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.25)" }}>
            Module 4
          </span>
          <h2 className="text-3xl font-black text-white mt-1">AI Tools Landscape 2026</h2>
          <p className="text-slate-400 text-sm">50+ tools across 6 categories — know which tool to use and when</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-2 mb-4 flex-wrap"
        >
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={{
                background: activeTab === i ? c.color : "rgba(255,255,255,0.05)",
                color: activeTab === i ? "#fff" : "rgba(255,255,255,0.5)",
                border: `1px solid ${activeTab === i ? c.color : "rgba(255,255,255,0.08)"}`,
                boxShadow: activeTab === i ? `0 0 12px ${c.color}50` : "none",
              }}
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Tool table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex-1 rounded-xl overflow-hidden"
            style={{ border: `1px solid ${cat.color}25` }}
          >
            {cat.note && (
              <div className="px-4 py-2 text-xs text-slate-400 italic"
                style={{ background: `${cat.color}10`, borderBottom: `1px solid ${cat.color}20` }}>
                💡 {cat.note}
              </div>
            )}
            <div className="overflow-auto h-full">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Tool</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Best For</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.tools.map((t, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-t"
                      style={{ borderColor: "rgba(255,255,255,0.05)" }}
                    >
                      <td className="px-4 py-3">
                        <span className="font-bold text-white">{t.name}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{t.best}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold"
                          style={{
                            background: t.tag === "free" ? "rgba(16,185,129,0.15)" : t.tag === "freemium" ? "rgba(99,102,241,0.15)" : "rgba(245,158,11,0.15)",
                            color: t.tag === "free" ? "#34d399" : t.tag === "freemium" ? "#818cf8" : "#fbbf24",
                          }}>
                          {t.price}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

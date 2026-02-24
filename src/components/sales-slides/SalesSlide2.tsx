"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Bot, BarChart2, MessageSquare, Sparkles, TrendingUp, Zap } from "lucide-react";

const concepts = [
  {
    icon: Bot, color: "#6366f1", title: "Artificial Intelligence",
    text: "The umbrella term for machines that perform tasks requiring human-like intelligence — learning, reasoning, problem-solving.",
    analogy: "Calling everything 'AI' is like calling everything with wheels a 'car'. There are bikes, trucks, and scooters too. AI includes ML, NLP, computer vision, and more.",
  },
  {
    icon: BarChart2, color: "#0ea5e9", title: "Machine Learning",
    text: "Systems that learn patterns from data and improve with experience — without being explicitly programmed for every scenario.",
    analogy: "Like a rep who's listened to 10,000 sales calls and can now predict which deals will close. They've internalized patterns from experience.",
  },
  {
    icon: MessageSquare, color: "#10b981", title: "Natural Language Processing",
    text: "AI that understands, interprets, and generates human language — powering chatbots, email analysis, sentiment detection.",
    analogy: "Like having a translator between you and your data. NLP reads thousands of customer emails and tells you: 'Here's what they're really asking for.'",
  },
  {
    icon: Sparkles, color: "#f59e0b", title: "Generative AI",
    text: "AI that creates new content — text, images, video, code, music — based on patterns learned from training data. ChatGPT, DALL-E, Midjourney.",
    analogy: "Like having a copywriter, designer, and analyst rolled into one who works 24/7 and produces drafts in seconds. You still review, but the first draft is done.",
  },
  {
    icon: TrendingUp, color: "#ec4899", title: "Predictive Analytics",
    text: "Using historical data and ML to forecast future outcomes — which leads will convert, which deals are at risk, which customers will churn.",
    analogy: "Like your best sales forecaster — but with access to every historical deal, every interaction, every data point. It calculates probability, not guesses.",
  },
  {
    icon: Zap, color: "#8b5cf6", title: "Automation vs. AI",
    text: "Automation follows fixed rules (if X, do Y). AI adapts and learns. A chatbot that says 'Press 1 for billing' is automation. One that understands 'I want to cancel' is AI.",
    analogy: "Automation is a vending machine. AI is a personal shopper who learns your preferences and proactively suggests what you need.",
  },
];

const pipelineSteps = [
  { label: "Raw Data", color: "#6366f1", desc: "Customer emails, CRM records, call transcripts" },
  { label: "Clean & Label", color: "#0ea5e9", desc: "Remove noise, tag outcomes (closed/lost)" },
  { label: "Train Model", color: "#10b981", desc: "Algorithm finds patterns across thousands of examples" },
  { label: "Validate", color: "#f59e0b", desc: "Test on unseen data to measure accuracy" },
  { label: "Deploy", color: "#ec4899", desc: "Live predictions embedded in your CRM or workflow" },
];

function MLPipeline({ isActive }: { isActive: boolean }) {
  const [visible, setVisible] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) { setVisible(-1); return; }
    let i = 0;
    const interval = setInterval(() => {
      setVisible(i);
      i++;
      if (i >= pipelineSteps.length) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {pipelineSteps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={visible >= i ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                style={{ background: step.color, boxShadow: `0 0 12px ${step.color}60` }}>
                {step.label}
              </div>
              <div className="text-xs text-slate-500 text-center max-w-[90px]">{step.desc}</div>
            </motion.div>
            {i < pipelineSteps.length - 1 && (
              <motion.div
                animate={visible >= i ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-slate-600 text-lg font-bold mb-4"
              >→</motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SalesSlide2({ isActive }: { isActive: boolean }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(145deg, #020817 0%, #0a0f1e 60%, #050d1a 100%)" }}>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 60%)"
      }} />

        <div className="relative z-10 flex flex-col h-full px-8 py-4 max-w-7xl mx-auto w-full">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
          <div className="flex items-center gap-3 mb-1">
            <span className="px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>
              Module 1
            </span>
          </div>
          <h2 className="text-3xl font-black text-white">What is AI?</h2>
          <p className="text-slate-400 text-sm mt-1">Think of AI as a super-intern — fast, tireless, knowledgeable, but needs clear instructions.</p>
        </motion.div>

        {/* Concept cards grid */}
        <div className="grid grid-cols-3 gap-3 mb-4 flex-1 min-h-0">
          {concepts.map((c, i) => {
            const Icon = c.icon;
            const isOpen = expanded === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                className="rounded-xl p-3 cursor-pointer transition-all"
                style={{
                  background: isOpen ? `${c.color}14` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isOpen ? c.color + "50" : "rgba(255,255,255,0.08)"}`,
                  boxShadow: isOpen ? `0 0 20px ${c.color}25` : "none",
                }}
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${c.color}20`, border: `1px solid ${c.color}40` }}>
                    <Icon size={14} style={{ color: c.color }} />
                  </div>
                  <span className="font-bold text-white text-sm">{c.title}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-auto"
                  >
                    <ChevronDown size={14} style={{ color: c.color }} />
                  </motion.div>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{c.text}</p>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 pt-2 border-t" style={{ borderColor: `${c.color}30` }}>
                        <div className="text-xs font-bold mb-1" style={{ color: c.color }}>SALES ANALOGY</div>
                        <div className="text-xs text-slate-300 leading-relaxed">{c.analogy}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ML Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-xl p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            ⚡ ML Pipeline — How a model learns from your sales data
          </div>
          <MLPipeline isActive={isActive} />
        </motion.div>
      </div>
    </div>
  );
}

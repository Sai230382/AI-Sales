"use client";

import React, { useState, useEffect } from "react";
import { 
  Bot as Robot, 
  ChartLine, 
  Languages, 
  Sparkles, 
  Search, 
  Settings2, 
  ChevronDown, 
  PlayCircle, 
  RotateCcw,
  Brain,
  ArrowRight,
  Database,
  Terminal,
  Ghost,
  Cpu,
  ArrowRightCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CoreConcepts Component
 * 
 * Clones the "What is AI?" slide with:
 * - 3-column grid of 3D cards with expandable "Sales Analogy" sections.
 * - Animated machine learning pipeline flow diagram at the bottom.
 * - Deep dark theme with electric blue accents.
 */

const conceptData = [
  {
    icon: <Robot className="w-8 h-8 text-[#0099ff]" />,
    title: "Artificial Intelligence",
    text: "The umbrella term for machines that can perform tasks requiring human-like intelligence — learning, reasoning, problem-solving.",
    analogy: "Calling everything 'AI' is like calling everything with wheels a car. There are bikes, trucks, and scooters too. AI includes machine learning, NLP, computer vision, and more — each solves different problems."
  },
  {
    icon: <ChartLine className="w-8 h-8 text-[#0099ff]" />,
    title: "Machine Learning",
    text: "Systems that learn patterns from data and improve with experience — without being explicitly programmed for every scenario.",
    analogy: "Like a rep who's listened to 10,000 sales calls and can now predict which deals will close. They haven't memorized rules — they've internalized patterns from experience."
  },
  {
    icon: <Languages className="w-8 h-8 text-[#0099ff]" />,
    title: "Natural Language Processing",
    text: "AI that understands, interprets, and generates human language — powering chatbots, email analysis, sentiment detection, and more.",
    analogy: "Like having a translator between you and your data. NLP reads thousands of customer emails and tells you: 'Here's what they're really asking for.'"
  },
  {
    icon: <Sparkles className="w-8 h-8 text-[#0099ff]" />,
    title: "Generative AI",
    text: "AI that creates new content — text, images, video, code, music — based on patterns learned from training data. ChatGPT, DALL-E, and Midjourney are examples.",
    analogy: "Like having a copywriter, designer, and analyst rolled into one — who works 24/7 and produces drafts in seconds. You still need to review and edit, but the first draft is done."
  },
  {
    icon: <Search className="w-8 h-8 text-[#0099ff]" />,
    title: "Predictive Analytics",
    text: "Using historical data and ML to forecast future outcomes — which leads will convert, which deals are at risk, which customers will churn.",
    analogy: "Like your best sales forecaster — but with access to every historical deal, every interaction, every data point. It doesn't guess; it calculates probability."
  },
  {
    icon: <Settings2 className="w-8 h-8 text-[#0099ff]" />,
    title: "Automation vs. AI",
    text: "Automation follows fixed rules (if X, do Y). AI learns and adapts. Automation is autopilot on a straight road; AI is a co-pilot that navigates curves.",
    analogy: "Auto-sending a follow-up email at 9am = automation. Deciding which email to send, when to send it, and whether to send it based on buyer behavior = AI."
  }
];

const mlSteps = [
  { label: "Raw Data", icon: "📊" },
  { label: "Clean & Label", icon: "🧹" },
  { label: "Train Model", icon: "🧠" },
  { label: "Test & Validate", icon: "✅" },
  { label: "Deploy", icon: "🚀" },
  { label: "Predict", icon: "🎯" }
];

export default function CoreConcepts() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [animStep, setAnimStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const pipelineRef = React.useRef<HTMLDivElement>(null);
  const hasAutoPlayed = React.useRef(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnimating) {
      interval = setInterval(() => {
        setAnimStep((prev) => {
          if (prev >= mlSteps.length - 1) {
            setIsAnimating(false);
            return prev;
          }
          return prev + 1;
        });
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Auto-play when pipeline scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAutoPlayed.current) {
          hasAutoPlayed.current = true;
          setTimeout(() => {
            setAnimStep(-1);
            setIsAnimating(true);
          }, 400);
        }
      },
      { threshold: 0.4 }
    );
    if (pipelineRef.current) observer.observe(pipelineRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const startAnimation = () => {
    setAnimStep(-1);
    setIsAnimating(true);
  };

  return (
    <section className="relative w-full min-h-screen py-20 px-4 md:px-8 bg-[#0a0e1a] text-white flex flex-col items-center overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0099ff]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#38bdf8]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] w-full z-10">
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#0099ff] mb-6">
            <Brain size={14} />
            Module 1
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">What is AI?</h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed">
            Think of AI as a <strong className="text-white font-semibold">super-intern</strong> — fast, tireless, and knowledgeable, but it needs clear instructions and can&apos;t be trusted without supervision.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {conceptData.map((concept, idx) => (
            <div 
              key={idx}
              className="group relative flex flex-col p-8 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0099ff]/10"
            >
              <div className="mb-6">{concept.icon}</div>
              <h3 className="text-xl font-bold mb-4">{concept.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                {concept.text}
              </p>

              {/* Sales Analogy Section */}
              <div className="mt-4 border-t border-white/10 pt-4">
                <button 
                  onClick={() => toggleExpand(idx)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-[#0099ff] hover:text-[#38bdf8] transition-colors uppercase tracking-wider"
                >
                  Sales Analogy
                  <ChevronDown 
                    size={16} 
                    className={cn("transition-transform duration-300", expandedIndex === idx && "rotate-180")} 
                  />
                </button>
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    expandedIndex === idx ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="p-4 rounded-lg bg-[#0099ff]/10 border border-[#0099ff]/20 text-sm text-slate-200 leading-relaxed italic">
                    {concept.analogy}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

          {/* ML Pipeline Flow Diagram */}
          <div ref={pipelineRef} className="p-10 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <PlayCircle className="text-[#0099ff]" />
              How Machine Learning Works
            </h3>
            <button 
              onClick={startAnimation}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0099ff]/10 border border-[#0099ff]/20 hover:bg-[#0099ff]/20 transition-all text-sm font-medium"
            >
              <RotateCcw size={16} />
              Replay Visualizer
            </button>
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            {mlSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div 
                  className={cn(
                    "relative flex flex-col items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-500 min-w-[140px]",
                    animStep >= idx 
                      ? "bg-[#0099ff]/20 border-[#0099ff] scale-105 shadow-[0_0_20px_rgba(0,153,255,0.3)]" 
                      : "bg-white/[0.03] border-white/10 opacity-40"
                  )}
                >
                  <span className="text-2xl">{step.icon}</span>
                  <span className="text-xs font-bold text-center whitespace-nowrap">{step.label}</span>
                  {animStep === idx && (
                    <div className="absolute inset-0 rounded-xl border-2 border-[#0099ff] animate-ping opacity-20" />
                  )}
                </div>
                
                {idx < mlSteps.length - 1 && (
                  <div className={cn(
                    "transition-all duration-500 mx-2",
                    animStep > idx ? "text-[#0099ff] opacity-100" : "text-white/10 opacity-30"
                  )}>
                    <ArrowRight className={cn("hidden md:block")} size={24} />
                    <ChevronDown className={cn("md:hidden")} size={24} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Animated Background Progress Line (MD only) */}
          <div className="hidden md:block absolute bottom-12 left-28 right-28 h-px bg-white/5 pointer-events-none">
            <div 
              className="h-full bg-gradient-to-right from-transparent via-[#0099ff] to-transparent transition-all duration-700 ease-in-out" 
              style={{ width: `${(animStep + 1) * 16.6}%` }} 
            />
          </div>
        </div>

        {/* Next Module Prompt */}
        <div className="mt-16 flex justify-center">
          <div className="group inline-flex items-center gap-3 py-4 pr-6 pl-8 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all cursor-pointer">
            <span className="text-slate-400 text-sm font-medium">Next: <span className="text-white">How AI Models Work</span></span>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0099ff] group-hover:bg-[#38bdf8] transition-colors">
              <ArrowRight size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Cpu,
  Puzzle,
  MemoryStick as Memory,
  Thermometer,
  Ghost,
  ArrowRight,
} from "lucide-react";

// Temperature sentences mapped from 0.0 → 1.0
const tempSentences: Record<number, { label: string; color: string; example: string }> = {
  0:   { label: "Robotic",    color: "#60a5fa", example: "The quarterly revenue increased by 15.3% compared to the previous quarter." },
  1:   { label: "Precise",    color: "#60a5fa", example: "The quarterly revenue increased by 15.3% year-over-year, driven by enterprise sales." },
  2:   { label: "Balanced",   color: "#34d399", example: "Revenue grew 15% this quarter — a strong result driven by our enterprise team." },
  3:   { label: "Engaging",   color: "#34d399", example: "We had a fantastic quarter — revenue jumped 15%, and the enterprise team absolutely crushed it." },
  4:   { label: "Creative",   color: "#f59e0b", example: "The numbers are in and they're singing — revenue soared 15% as our enterprise warriors conquered new territory!" },
  5:   { label: "Wild",       color: "#ef4444", example: "Revenue exploded like a supernova — 15% growth fuelled by our unstoppable, boundary-smashing enterprise dream team!!" },
};

const contextModels = [
  { name: "GPT-4o",        tokens: "128K",  books: 96,    fill: 4 },
  { name: "Claude 3.5",    tokens: "200K",  books: 150,   fill: 7 },
  { name: "Gemini 1.5",    tokens: "1M",    books: 750,   fill: 35 },
  { name: "Llama 4 Scout", tokens: "10M",   books: 7500,  fill: 100 },
];

export default function AIModels() {
  const [temperature, setTemperature] = useState(2);
  const [ctxVisible, setCtxVisible] = useState(false);
  const [ctxFills, setCtxFills] = useState<number[]>([0, 0, 0, 0]);
  const ctxRef = useRef<HTMLDivElement>(null);
  const ctxAnimated = useRef(false);

  // Animate context bars on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !ctxAnimated.current) {
          ctxAnimated.current = true;
          setCtxVisible(true);
          contextModels.forEach((m, i) => {
            setTimeout(() => {
              setCtxFills((prev) => {
                const next = [...prev];
                next[i] = m.fill;
                return next;
              });
            }, i * 250);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (ctxRef.current) observer.observe(ctxRef.current);
    return () => observer.disconnect();
  }, []);

  const tempData = tempSentences[temperature];

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 overflow-hidden bg-[#0a0e1a] text-white">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0099ff]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#38bdf8]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#0099ff] uppercase tracking-wider">
            <Cpu size={14} />
            Module 2
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">How AI Models Work</h2>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            From text prediction to image generation — the two engines behind modern AI
          </p>
        </div>

        {/* Core Concept Card */}
        <div className="mb-10 p-8 md:p-10 rounded-2xl bg-white/[0.03] border border-white/10 border-l-4 border-l-[#0099ff]">
          <h3 className="text-2xl font-semibold mb-5 flex items-center gap-3">
            <span className="text-[#0099ff]">🎯</span> The Core Concept
          </h3>
          <div className="space-y-4 text-slate-300 leading-relaxed text-[17px]">
            <p>
              Imagine someone who has read <strong className="text-white">every sales book, every email, every deal transcript, every piece of business writing ever produced</strong>.
              Now you give them the beginning of a sentence and ask them to guess the next word. Their guesses would be incredibly good — not because they "understand" in the human sense, but because they've seen so many patterns.
            </p>
            <p>
              That's exactly what an LLM does. It's the same mechanism as your phone's autocomplete — but trained on billions of pages of text.
              It predicts the next word, one word at a time, until a full response emerges.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">

          {/* Tokens */}
          <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0099ff]/10">
            <div className="w-12 h-12 rounded-xl bg-[#0099ff]/10 flex items-center justify-center mb-5 text-[#0099ff]">
              <Puzzle size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Tokens</h3>
            <p className="text-slate-400 mb-5 text-sm leading-relaxed">
              Words broken into pieces. LLMs think in tokens, not whole words. Knowing this helps you write better prompts.
            </p>
            {/* Token animation */}
            <div className="flex flex-wrap gap-2 font-mono text-sm">
              {["Un", "comfort", "able", " =", " 3 tokens"].map((t, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-md border transition-all duration-500 ${
                    i < 3
                      ? "bg-[#0099ff]/15 border-[#0099ff]/40 text-[#60a5fa]"
                      : "text-slate-500 border-transparent"
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 text-xs text-slate-500">
              💡 <span className="text-slate-400">~750 words ≈ 1,000 tokens</span> — keep prompts focused
            </div>
          </div>

          {/* Context Window — animated fill bars */}
          <div ref={ctxRef} className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0099ff]/10">
            <div className="w-12 h-12 rounded-xl bg-[#0099ff]/10 flex items-center justify-center mb-5 text-[#0099ff]">
              <Memory size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Context Window</h3>
            <p className="text-slate-400 mb-5 text-sm leading-relaxed">
              The AI's "short-term memory" — how much it can consider at once. Bigger = smarter answers.
            </p>
            <div className="space-y-3">
              {contextModels.map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">{m.name}</span>
                    <span className="text-[#0099ff] font-bold">{m.tokens} <span className="text-slate-500 font-normal">≈ {m.books.toLocaleString()} novels</span></span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0099ff] to-[#38bdf8] transition-all duration-700 ease-out"
                      style={{
                        width: ctxVisible ? `${ctxFills[i]}%` : "0%",
                        transitionDelay: `${i * 250}ms`,
                        boxShadow: ctxFills[i] > 0 ? "0 0 8px rgba(0,153,255,0.5)" : "none",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 text-xs text-slate-500">
              💡 <span className="text-slate-400">1M tokens ≈ full Harry Potter series × 12</span>
            </div>
          </div>

          {/* Temperature — live interactive slider */}
          <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0099ff]/10 md:col-span-2">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#0099ff]/10 flex items-center justify-center shrink-0 text-[#0099ff]">
                <Thermometer size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Temperature — Drag the Slider</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The creativity dial. Slide it and watch the AI's tone transform in real time.
                </p>
              </div>
            </div>

            {/* Slider */}
            <div className="mb-5">
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>Predictable (0)</span>
                <span
                  className="font-bold text-sm transition-all duration-300"
                  style={{ color: tempData.color }}
                >
                  {tempData.label}
                </span>
                <span>Wild (5)</span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={1}
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #0099ff 0%, ${tempData.color} ${(temperature / 5) * 100}%, rgba(255,255,255,0.1) ${(temperature / 5) * 100}%, rgba(255,255,255,0.1) 100%)`,
                }}
              />
              <div className="flex justify-between mt-1">
                {[0,1,2,3,4,5].map((v) => (
                  <span key={v} className={`text-[10px] transition-all ${v === temperature ? "text-white font-bold" : "text-slate-600"}`}>{v}</span>
                ))}
              </div>
            </div>

            {/* Live output */}
            <div
              className="p-4 rounded-xl border transition-all duration-500 min-h-[70px] flex items-center"
              style={{
                borderColor: `${tempData.color}40`,
                background: `${tempData.color}10`,
              }}
            >
              <p
                className="text-sm leading-relaxed italic transition-all duration-300"
                style={{ color: tempData.color }}
              >
                "{tempData.example}"
              </p>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              💡 For sales emails use <strong className="text-slate-300">2–3</strong>. For brainstorming use <strong className="text-slate-300">4–5</strong>. For data reports use <strong className="text-slate-300">0–1</strong>.
            </div>
          </div>

          {/* Hallucinations */}
          <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0099ff]/10 md:col-span-2">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 text-red-400">
                <Ghost size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-red-300">Hallucinations</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Why AI can be <strong className="text-white">confidently wrong</strong>. LLMs always generate plausible-sounding text — even when facts are completely made up.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: "📊", label: "Fake Statistics", ex: '"Our AI increases revenue by 347%"', warn: "Always verify numbers independently" },
                { icon: "📚", label: "Fake Citations", ex: '"As published in Harvard Business Review, 2024..."', warn: "Check that the article actually exists" },
                { icon: "🏢", label: "Fake Quotes", ex: '"Gartner says AI will replace 80% of sales reps"', warn: "Look up the original source" },
              ].map((h, i) => (
                <div key={i} className="p-4 rounded-xl bg-red-500/5 border border-red-500/15">
                  <div className="text-2xl mb-2">{h.icon}</div>
                  <div className="text-sm font-semibold text-red-300 mb-2">{h.label}</div>
                  <div className="text-xs text-slate-400 italic mb-3">"{h.ex}"</div>
                  <div className="text-xs text-red-400/80 flex items-center gap-1">
                    <span>⚠️</span> {h.warn}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Prompt */}
        <div className="mt-4 flex justify-center md:justify-end">
          <div className="group inline-flex items-center gap-3 py-4 pr-6 pl-8 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all cursor-pointer">
            <span className="text-slate-400 text-sm">Next: <span className="text-white font-medium">Prompt Lab</span></span>
            <div className="w-8 h-8 rounded-full bg-[#0099ff] flex items-center justify-center group-hover:bg-[#38bdf8] transition-colors">
              <ArrowRight size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

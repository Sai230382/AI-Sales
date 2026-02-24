"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Send, RotateCcw, Sparkles, ChevronRight } from "lucide-react";

// Token colours for different categories
const TOKEN_COLORS = [
  "bg-[#0099ff]/20 border-[#0099ff]/50 text-[#60a5fa]",
  "bg-purple-500/20 border-purple-500/50 text-purple-300",
  "bg-emerald-500/20 border-emerald-500/50 text-emerald-300",
  "bg-amber-500/20 border-amber-500/50 text-amber-300",
  "bg-pink-500/20 border-pink-500/50 text-pink-300",
  "bg-cyan-500/20 border-cyan-500/50 text-cyan-300",
];

// Simple tokeniser — splits on word boundaries, punctuation, spaces
function tokenise(text: string): string[] {
  if (!text.trim()) return [];
  return text.match(/[\w']+|[^\w\s]/g) ?? [];
}

// Canned AI responses per prompt keyword
const RESPONSES: Record<string, string> = {
  email:
    "Subject: Quick follow-up on your goals\n\nHi [Name],\n\nI wanted to circle back after our last conversation. Based on what you shared about [pain point], I think we can help you achieve [outcome] faster than you might expect.\n\nWould you have 15 minutes this week to explore what that could look like for your team?\n\nBest,\n[Your Name]",
  objection:
    "That's a completely fair concern — budget is always top of mind. Here's what I'd suggest: rather than thinking of this as a cost, let's frame it as an ROI question. If this saves your team 5 hours a week, at an average hourly rate of $50, that's $1,300/month in recovered time alone. The tool pays for itself in the first few weeks. Would it help if I showed you a quick ROI calculator?",
  summary:
    "Meeting Summary:\n• Client expressed interest in automating their sales outreach\n• Key concern: integration with existing CRM (HubSpot)\n• Budget: $2,000–$5,000/month range confirmed\n• Next step: Technical demo scheduled for next Thursday\n• Decision maker: Sarah (VP Sales) + IT lead need to both sign off",
  default:
    "Great question! Based on the context you've provided, here's what I'd recommend as a starting point. The key is to focus on the specific outcome your prospect cares most about, then work backwards to show exactly how your solution bridges that gap. Would you like me to refine this further with more specific details?",
};

function getResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes("email") || lower.includes("follow")) return RESPONSES.email;
  if (lower.includes("objection") || lower.includes("budget") || lower.includes("expensive")) return RESPONSES.objection;
  if (lower.includes("summary") || lower.includes("meeting") || lower.includes("notes")) return RESPONSES.summary;
  return RESPONSES.default;
}

const EXAMPLE_PROMPTS = [
  "Write a follow-up email for a prospect who went cold after the demo",
  "Handle the objection: 'Your product is too expensive'",
  "Summarise this sales meeting into bullet points",
  "What are the top 3 AI tools a sales rep should use daily?",
];

export default function PromptLab() {
  const [prompt, setPrompt] = useState("");
  const [tokens, setTokens] = useState<string[]>([]);
  const [tokenCount, setTokenCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [output, setOutput] = useState("");
  const [outputDone, setOutputDone] = useState(false);
  const [phase, setPhase] = useState<"idle" | "tokenising" | "thinking" | "streaming" | "done">("idle");
  const [visibleTokens, setVisibleTokens] = useState<number>(0);
  const outputRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePromptChange = (val: string) => {
    setPrompt(val);
    const t = tokenise(val);
    setTokenCount(Math.ceil(t.length * 1.3)); // rough token estimate
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || phase !== "idle") return;

    const t = tokenise(prompt);
    setTokens(t);
    setVisibleTokens(0);
    setOutput("");
    setOutputDone(false);
    setPhase("tokenising");

    // Animate tokens appearing one by one
    for (let i = 0; i <= t.length; i++) {
      await new Promise((r) => setTimeout(r, 120));
      setVisibleTokens(i);
    }

    setPhase("thinking");
    await new Promise((r) => setTimeout(r, 1400));

    // Stream the response word by word
    const response = getResponse(prompt);
    const words = response.split(" ");
    setPhase("streaming");
    let built = "";
    for (const word of words) {
      built += (built ? " " : "") + word;
      setOutput(built);
      await new Promise((r) => setTimeout(r, 55));
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }

    setOutputDone(true);
    setPhase("done");
  };

  const handleReset = () => {
    setPrompt("");
    setTokens([]);
    setTokenCount(0);
    setOutput("");
    setOutputDone(false);
    setPhase("idle");
    setVisibleTokens(0);
    if (textareaRef.current) textareaRef.current.focus();
  };

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 bg-[#060a14] text-white overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#0099ff]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#0099ff] uppercase tracking-wider">
            <Terminal size={14} />
            Prompt Lab
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Try It Live</h2>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Type a real sales prompt. Watch it get tokenised, processed, and answered — see exactly how AI thinks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT — Input */}
          <div className="flex flex-col gap-4">

            {/* Example prompts */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Try an example:</p>
              <div className="flex flex-col gap-2">
                {EXAMPLE_PROMPTS.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => { handlePromptChange(ex); setPrompt(ex); }}
                    disabled={phase !== "idle" && phase !== "done"}
                    className="text-left text-xs px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-[#0099ff]/10 hover:border-[#0099ff]/30 transition-all text-slate-400 hover:text-white flex items-center gap-2 group"
                  >
                    <ChevronRight size={12} className="text-[#0099ff] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) handleSubmit(); }}
                placeholder="Or type your own prompt here..."
                rows={4}
                disabled={phase !== "idle" && phase !== "done"}
                className="w-full resize-none rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#0099ff]/50 focus:outline-none px-4 py-4 text-sm text-white placeholder:text-slate-600 transition-all leading-relaxed"
              />
              <div className="absolute bottom-3 right-3 text-[11px] text-slate-600">
                ~{tokenCount} tokens • ⌘+Enter to send
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={!prompt.trim() || (phase !== "idle" && phase !== "done")}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0099ff] hover:bg-[#38bdf8] disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-semibold"
              >
                <Send size={16} />
                {phase === "thinking" ? "Thinking..." : phase === "streaming" ? "Streaming..." : "Send Prompt"}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-all"
              >
                <RotateCcw size={16} />
              </button>
            </div>

            {/* Token visualiser */}
            {tokens.length > 0 && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0099ff] animate-pulse inline-block" />
                  Tokens ({tokens.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tokens.map((tok, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 rounded border text-xs font-mono transition-all duration-200 ${
                        i < visibleTokens
                          ? TOKEN_COLORS[i % TOKEN_COLORS.length]
                          : "opacity-0 scale-75"
                      }`}
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      {tok}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Output */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={12} className="text-[#0099ff]" />
                AI Response
              </p>
              {phase === "thinking" && (
                <span className="text-xs text-amber-400 animate-pulse">⚙ Processing tokens...</span>
              )}
              {phase === "streaming" && (
                <span className="text-xs text-emerald-400 animate-pulse">▌ Generating...</span>
              )}
              {phase === "done" && (
                <span className="text-xs text-emerald-400">✓ Complete</span>
              )}
            </div>

            <div
              ref={outputRef}
              className="flex-1 min-h-[420px] p-5 rounded-xl bg-white/[0.02] border border-white/5 overflow-y-auto font-mono text-sm leading-relaxed text-slate-200 whitespace-pre-wrap relative"
            >
              {phase === "idle" && (
                <p className="text-slate-600 italic text-center mt-16">Your AI response will appear here...</p>
              )}
              {phase === "thinking" && (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="flex gap-2">
                    {[0,1,2].map((i) => (
                      <div key={i} className="w-3 h-3 rounded-full bg-[#0099ff] animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                  <p className="text-slate-500 text-xs">Processing {tokens.length} tokens...</p>
                </div>
              )}
              {(phase === "streaming" || phase === "done") && (
                <>
                  {output}
                  {phase === "streaming" && <span className="inline-block w-[2px] h-4 bg-[#0099ff] ml-0.5 animate-pulse align-middle" />}
                </>
              )}
            </div>

            {outputDone && (
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Tokens In", val: `~${tokenCount}` },
                  { label: "Words Out", val: output.split(" ").length },
                  { label: "Model", val: "GPT-4o" },
                ].map((stat, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-lg font-bold text-[#0099ff]">{stat.val}</div>
                    <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tip bar */}
        <div className="mt-10 p-4 rounded-xl bg-[#0099ff]/5 border border-[#0099ff]/15 text-sm text-slate-400 leading-relaxed">
          <strong className="text-[#0099ff]">Pro tip:</strong> Notice how the AI never truly "understands" your prompt — it converts it to tokens, finds the most statistically likely response patterns, and streams them out one token at a time. That's why <strong className="text-white">specific, structured prompts always outperform vague ones.</strong>
        </div>
      </div>
    </section>
  );
}

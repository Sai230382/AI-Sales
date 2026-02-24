"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quizSets = [
  {
    label: "📚 Fundamentals",
    color: "#6366f1",
    questions: [
      {
        q: "What does LLM stand for?",
        opts: ["Large Language Model", "Linear Learning Machine", "Layered Logic Module", "Lightweight Language Method"],
        answer: 0,
        explanation: "LLM = Large Language Model. Examples: GPT-5.2, Claude, Gemini, Grok.",
      },
      {
        q: "What is 'Temperature' in AI models?",
        opts: ["The server heat level", "A creativity/randomness dial for outputs", "The model's training speed", "Data storage temperature"],
        answer: 1,
        explanation: "Temperature controls output creativity. Low (0) = predictable. High (1) = creative and varied.",
      },
      {
        q: "AI that follows fixed rules (if X, do Y) without learning is called:",
        opts: ["Machine Learning", "Generative AI", "Automation", "Predictive Analytics"],
        answer: 2,
        explanation: "Automation follows fixed rules. AI adapts and learns from data. A chatbot that says 'Press 1 for billing' is automation.",
      },
      {
        q: "What is a 'hallucination' in AI?",
        opts: ["A visual glitch in the interface", "Confidently generated false information", "Slow model response time", "A dream-like training state"],
        answer: 1,
        explanation: "Hallucinations = AI inventing plausible-sounding but false facts. LLMs pattern-match, not fact-check.",
      },
    ],
  },
  {
    label: "🎯 Prompting",
    color: "#0ea5e9",
    questions: [
      {
        q: "What does RACE stand for in prompting?",
        opts: ["Result, Action, Content, Example", "Role, Action, Context, Expectation", "Request, Analyse, Create, Evaluate", "Role, Audience, Context, Examples"],
        answer: 1,
        explanation: "RACE = Role, Action, Context, Expectation. The go-to for daily B2B sales work.",
      },
      {
        q: "Which framework is best for customer-facing content where voice and tone matter most?",
        opts: ["APE", "RACE", "CO-STAR", "RISEN"],
        answer: 2,
        explanation: "CO-STAR = Context, Objective, Style, Tone, Audience, Response. Best when voice and audience matter.",
      },
      {
        q: "Chain of Thought prompting is best used when:",
        opts: ["You need creative content", "Speed is the priority", "Accuracy and reasoning quality matter most", "You want short outputs"],
        answer: 2,
        explanation: "Chain of Thought forces AI to reason step by step — dramatically improving accuracy on complex or logical questions.",
      },
      {
        q: "The simplest prompting framework, covering 80% of everyday tasks:",
        opts: ["CO-STAR", "RISEN", "RACE", "APE"],
        answer: 3,
        explanation: "APE = Action, Purpose, Expectation. Simple and effective for quick daily tasks.",
      },
    ],
  },
  {
    label: "🏢 Industry",
    color: "#10b981",
    questions: [
      {
        q: "Which regulation governs AI use of patient data in the US?",
        opts: ["GDPR", "SOX", "HIPAA", "CCPA"],
        answer: 2,
        explanation: "HIPAA governs all patient health data. AI vendors must sign BAAs (Business Associate Agreements).",
      },
      {
        q: "AI scribes in healthcare reduce documentation time by approximately:",
        opts: ["10–20%", "30–40%", "50–60%", "70%+"],
        answer: 3,
        explanation: "AI scribes reduce documentation time by up to 70%, giving physicians more time with patients.",
      },
      {
        q: "In financial services, AI lending decisions must be:",
        opts: ["Fully automated", "Explainable to regulators", "Based on social media data", "Made without human review"],
        answer: 1,
        explanation: "ECOA/Fair Lending regulations require AI credit decisions to be explainable. 'Black box AI' is a non-starter in finance.",
      },
      {
        q: "AI agent assist in contact centers typically reduces average handle time by:",
        opts: ["5–10%", "15–20%", "30%+", "50–60%"],
        answer: 2,
        explanation: "Agent assist AI surfaces real-time answers and reduces average handle time by ~30% while improving first contact resolution.",
      },
    ],
  },
  {
    label: "🔒 Ethics",
    color: "#f59e0b",
    questions: [
      {
        q: "What should you NEVER do with client confidential information?",
        opts: ["Store it in your CRM", "Enter it into public AI tools like ChatGPT", "Share it with your manager", "Include it in a proposal"],
        answer: 1,
        explanation: "Public AI tools (ChatGPT, etc.) may use inputs for training. Never enter client confidential data — use enterprise-approved tools only.",
      },
      {
        q: "Before using an AI-generated statistic in a client pitch, you should:",
        opts: ["Use it immediately — AI is accurate", "Verify it from a primary source", "Ask the AI to confirm it", "Add a disclaimer"],
        answer: 1,
        explanation: "AI hallucinates statistics. Always verify from primary sources (Gartner, McKinsey, vendor reports) before using in client materials.",
      },
      {
        q: "TCPA compliance in contact center AI primarily governs:",
        opts: ["Data storage", "AI-initiated outbound calls", "Agent performance scoring", "Chat interface design"],
        answer: 1,
        explanation: "TCPA (Telephone Consumer Protection Act) regulates AI-initiated outbound calls and requires proper consent.",
      },
    ],
  },
];

export default function SalesSlide12({ isActive }: { isActive: boolean }) {
  const [activeSet, setActiveSet] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [scores, setScores] = useState<Record<number, number[]>>({});
  const [finished, setFinished] = useState(false);

  const qset = quizSets[activeSet];
  const q = qset.questions[currentQ];
  const setScore = scores[activeSet] || [];
  const totalCorrect = setScore.filter(Boolean).length;

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    const correct = idx === q.answer ? 1 : 0;
    setScores(s => ({ ...s, [activeSet]: [...(s[activeSet] || []), correct] }));
  };

  const handleNext = () => {
    if (currentQ < qset.questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setRevealed(false);
    setFinished(false);
    setScores(s => ({ ...s, [activeSet]: [] }));
  };

  const handleTabChange = (i: number) => {
    setActiveSet(i);
    setCurrentQ(0);
    setSelected(null);
    setRevealed(false);
    setFinished(false);
  };

  const getGrade = (correct: number, total: number) => {
    const pct = correct / total;
    if (pct >= 0.9) return { label: "AI Expert", color: "#10b981", emoji: "🏆" };
    if (pct >= 0.7) return { label: "AI Practitioner", color: "#6366f1", emoji: "🎯" };
    return { label: "AI Learner", color: "#f59e0b", emoji: "📚" };
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(145deg, #020817 0%, #0a0f1e 60%, #050d1a 100%)" }}>

        <div className="relative z-10 flex flex-col h-full px-8 py-4 max-w-4xl mx-auto w-full">

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
          <span className="px-2 py-0.5 rounded text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>
            Assessment
          </span>
          <h2 className="text-3xl font-black text-white mt-1">Knowledge Quizzes</h2>
          <p className="text-slate-400 text-sm">Test your understanding — 70% required to pass each quiz</p>
        </motion.div>

          {/* Quiz set tabs */}
          <div className="flex gap-2 mb-3">
          {quizSets.map((qs, i) => (
            <button
              key={i}
              onClick={() => handleTabChange(i)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={{
                background: activeSet === i ? qs.color : "rgba(255,255,255,0.05)",
                color: activeSet === i ? "#fff" : "rgba(255,255,255,0.4)",
                border: `1px solid ${activeSet === i ? qs.color : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {qs.label} {(scores[i] || []).length > 0 && !finished && `(${(scores[i] || []).filter(Boolean).length}/${(scores[i] || []).length})`}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={`${activeSet}-${currentQ}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4 flex-1"
            >
              {/* Progress */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500 font-semibold">
                  Question {currentQ + 1} of {qset.questions.length}
                </div>
                <div className="text-xs font-bold" style={{ color: qset.color }}>
                  Score: {setScore.filter(Boolean).length} / {setScore.length}
                </div>
              </div>
              <div className="w-full h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${((currentQ) / qset.questions.length) * 100}%`, background: qset.color }} />
              </div>

              {/* Question */}
              <div className="rounded-xl p-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-white font-bold text-lg leading-relaxed">{q.q}</div>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2">
                {q.opts.map((opt, i) => {
                  let borderColor = "rgba(255,255,255,0.1)";
                  let bg = "rgba(255,255,255,0.04)";
                  let textColor = "rgba(255,255,255,0.7)";

                  if (revealed) {
                    if (i === q.answer) { bg = "rgba(16,185,129,0.15)"; borderColor = "#10b981"; textColor = "#34d399"; }
                    else if (i === selected) { bg = "rgba(239,68,68,0.1)"; borderColor = "#ef4444"; textColor = "#f87171"; }
                  } else if (selected === i) {
                    bg = `${qset.color}20`; borderColor = qset.color; textColor = "#fff";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className="text-left rounded-xl px-4 py-3 flex items-center gap-3 transition-all"
                      style={{ background: bg, border: `1px solid ${borderColor}`, color: textColor }}
                    >
                      <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ borderColor, color: textColor }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm">{opt}</span>
                      {revealed && i === q.answer && <span className="ml-auto text-green-400">✓</span>}
                      {revealed && i === selected && i !== q.answer && <span className="ml-auto text-red-400">✗</span>}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-xl p-4 overflow-hidden"
                    style={{
                      background: selected === q.answer ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.06)",
                      border: `1px solid ${selected === q.answer ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.2)"}`,
                    }}
                  >
                    <div className="text-xs font-bold mb-1" style={{ color: selected === q.answer ? "#34d399" : "#f87171" }}>
                      {selected === q.answer ? "✓ Correct!" : "✗ Not quite"}
                    </div>
                    <div className="text-sm text-slate-300">{q.explanation}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {revealed && (
                <button
                  onClick={handleNext}
                  className="self-end px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all"
                  style={{ background: qset.color, boxShadow: `0 0 20px ${qset.color}50` }}
                >
                  {currentQ < qset.questions.length - 1 ? "Next Question →" : "See Results"}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center flex-1 text-center gap-4"
            >
              {(() => {
                const grade = getGrade(totalCorrect, qset.questions.length);
                const pct = Math.round((totalCorrect / qset.questions.length) * 100);
                const pass = pct >= 70;
                return (
                  <>
                    <div className="text-6xl">{grade.emoji}</div>
                    <div className="text-7xl font-black" style={{ color: pass ? "#10b981" : "#ef4444" }}>{pct}%</div>
                    <div className="text-2xl font-bold text-white">{grade.label}</div>
                    <div className="text-slate-400">{totalCorrect} of {qset.questions.length} correct</div>
                    <div className="px-4 py-2 rounded-full text-sm font-bold"
                      style={{ background: pass ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.1)", color: pass ? "#34d399" : "#f87171" }}>
                      {pass ? "✓ Passed" : "✗ 70% required to pass"}
                    </div>
                    <button onClick={handleRestart}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm text-white"
                      style={{ background: qset.color }}>
                      Try Again
                    </button>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

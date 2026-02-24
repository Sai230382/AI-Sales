"use client";

import React, { useState } from "react";
import { Trophy, RotateCcw, CheckCircle, XCircle, ChevronRight, Brain } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What does 'Temperature' control in an AI model?",
    options: [
      "How fast the AI responds",
      "The creativity and randomness of the output",
      "How many tokens the AI can process",
      "The AI's internet access",
    ],
    correct: 1,
    explanation: "Temperature controls how creative or predictable the AI is. Low = consistent, High = creative and surprising.",
  },
  {
    id: 2,
    question: "A sales rep uses AI to write an email. It quotes '347% ROI from a Harvard study' — but no such study exists. This is called…",
    options: [
      "A context window error",
      "Token overflow",
      "An AI hallucination",
      "A prompt injection",
    ],
    correct: 2,
    explanation: "Hallucinations happen when AI generates plausible-sounding but completely fabricated facts. Always verify statistics and citations.",
  },
  {
    id: 3,
    question: "What is a 'token' in the context of LLMs?",
    options: [
      "A full sentence",
      "A piece of text — roughly a word or part of a word",
      "An API key used for authentication",
      "A type of AI model architecture",
    ],
    correct: 1,
    explanation: "Tokens are chunks of text — typically a word or sub-word. 'Uncomfortable' = 3 tokens: 'un', 'comfort', 'able'. ~750 words ≈ 1,000 tokens.",
  },
  {
    id: 4,
    question: "Your prospect says 'I need to think about it.' Which AI use case is MOST valuable here?",
    options: [
      "Ask AI to generate a cold email",
      "Use AI to analyse sentiment and suggest the ideal follow-up timing and message",
      "Use AI to create an image of your product",
      "Ask AI to summarise your CRM data",
    ],
    correct: 1,
    explanation: "Predictive AI and NLP excel at analysing hesitation signals and recommending the right follow-up — turning 'maybe' into 'yes'.",
  },
  {
    id: 5,
    question: "What is the main difference between Automation and AI?",
    options: [
      "Automation is faster than AI",
      "AI requires the internet, automation doesn't",
      "Automation follows fixed rules; AI learns and adapts from data",
      "There is no difference — they are the same",
    ],
    correct: 2,
    explanation: "Automation = if X then Y (rigid rules). AI = learns patterns from data and adapts to new situations. A chatbot that follows a script = automation. One that understands context = AI.",
  },
  {
    id: 6,
    question: "Which model has the largest context window (as of early 2026)?",
    options: [
      "GPT-4o (128K tokens)",
      "Claude 3.5 (200K tokens)",
      "Gemini 1.5 (1M tokens)",
      "Llama 4 Scout (10M tokens)",
    ],
    correct: 3,
    explanation: "Llama 4 Scout has a 10M token context window — roughly 7,500 novels worth of text. This enables processing entire databases in a single prompt.",
  },
];

type AnswerMap = Record<number, number>;

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[current];
  const score = Object.entries(answers).filter(([id, ans]) => {
    const question = QUESTIONS.find((qq) => qq.id === Number(id));
    return question && ans === question.correct;
  }).length;

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    setAnswers((prev) => ({ ...prev, [q.id]: idx }));
  };

  const handleNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setDone(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setAnswers({});
    setSelected(null);
    setRevealed(false);
    setDone(false);
  };

  const pct = Math.round((score / QUESTIONS.length) * 100);
  const grade =
    pct >= 90 ? { label: "AI Expert", color: "#34d399", emoji: "🏆" } :
    pct >= 70 ? { label: "AI Practitioner", color: "#60a5fa", emoji: "🎯" } :
    pct >= 50 ? { label: "AI Learner", color: "#f59e0b", emoji: "📚" } :
               { label: "Keep Practising", color: "#ef4444", emoji: "💪" };

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 bg-[#0a0e1a] text-white overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[800px] mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-400 uppercase tracking-wider">
            <Brain size={14} />
            Knowledge Check
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Test Yourself</h2>
          <p className="text-slate-400 text-lg">
            {QUESTIONS.length} questions. No time limit. Explanations after each answer.
          </p>
        </div>

        {!done ? (
          <div>
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>Question {current + 1} of {QUESTIONS.length}</span>
                <span>{score} correct so far</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#0099ff] transition-all duration-500"
                  style={{ width: `${((current) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question card */}
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 mb-5">
              <p className="text-xl font-semibold leading-relaxed mb-8">{q.question}</p>

              <div className="flex flex-col gap-3">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.correct;
                  const isSelected = selected === i;
                  let cls = "px-5 py-4 rounded-xl border text-sm text-left transition-all duration-300 cursor-pointer ";

                  if (!revealed) {
                    cls += "bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-slate-300";
                  } else if (isCorrect) {
                    cls += "bg-emerald-500/15 border-emerald-500/50 text-emerald-200";
                  } else if (isSelected && !isCorrect) {
                    cls += "bg-red-500/15 border-red-500/50 text-red-300";
                  } else {
                    cls += "bg-white/[0.02] border-white/5 text-slate-500 opacity-60";
                  }

                  return (
                    <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={revealed}>
                      <div className="flex items-center justify-between gap-3">
                        <span>{opt}</span>
                        {revealed && isCorrect && <CheckCircle size={18} className="text-emerald-400 shrink-0" />}
                        {revealed && isSelected && !isCorrect && <XCircle size={18} className="text-red-400 shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}
            {revealed && (
              <div className="mb-6 p-5 rounded-xl bg-[#0099ff]/5 border border-[#0099ff]/20 text-sm text-slate-300 leading-relaxed">
                <strong className="text-[#0099ff]">💡 Explanation: </strong>
                {q.explanation}
              </div>
            )}

            {/* Next button */}
            {revealed && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0099ff] hover:bg-[#38bdf8] transition-all text-sm font-semibold"
                >
                  {current < QUESTIONS.length - 1 ? "Next Question" : "See Results"}
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Results screen */
          <div className="text-center">
            <div className="text-7xl mb-6">{grade.emoji}</div>

            {/* Score ring */}
            <div className="relative inline-flex items-center justify-center w-40 h-40 mb-6">
              <svg className="w-40 h-40 -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="66" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                <circle
                  cx="80" cy="80" r="66"
                  fill="none"
                  stroke={grade.color}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 66}`}
                  strokeDashoffset={`${2 * Math.PI * 66 * (1 - pct / 100)}`}
                  className="transition-all duration-1000"
                  style={{ filter: `drop-shadow(0 0 8px ${grade.color})` }}
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-3xl font-bold" style={{ color: grade.color }}>{pct}%</div>
                <div className="text-xs text-slate-500">{score}/{QUESTIONS.length}</div>
              </div>
            </div>

            <h3 className="text-3xl font-bold mb-2" style={{ color: grade.color }}>{grade.label}</h3>
            <p className="text-slate-400 mb-10 text-lg">You got {score} out of {QUESTIONS.length} correct</p>

            {/* Per-question breakdown */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
              {QUESTIONS.map((qq, i) => {
                const correct = answers[qq.id] === qq.correct;
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border text-xs font-medium ${
                      correct
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-red-500/10 border-red-500/30 text-red-400"
                    }`}
                  >
                    <div className="text-lg mb-1">{correct ? "✓" : "✗"}</div>
                    Q{i + 1}
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0099ff] hover:bg-[#38bdf8] transition-all text-sm font-semibold"
            >
              <RotateCcw size={16} />
              Try Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

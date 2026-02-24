"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Constants ───────────────────────────────────────────────────────────────

const PROMPT = "What is photosynthesis?";

const TOKENS = [
  { text: "What", color: "#818CF8" },
  { text: "is", color: "#A78BFA" },
  { text: "photo", color: "#F472B6" },
  { text: "syn", color: "#F472B6" },
  { text: "thesis", color: "#F472B6" },
  { text: "?", color: "#94A3B8" },
];

// Each word + the probability it was picked (shown as flash)
const OUTPUT_STEPS = [
  { word: "Photosynthesis", prob: "94%" },
  { word: "is", prob: "88%" },
  { word: "the", prob: "91%" },
  { word: "process", prob: "79%" },
  { word: "by", prob: "96%" },
  { word: "which", prob: "85%" },
  { word: "plants", prob: "92%" },
  { word: "use", prob: "89%" },
  { word: "sunlight,", prob: "97%" },
  { word: "water,", prob: "93%" },
  { word: "and", prob: "98%" },
  { word: "CO₂", prob: "87%" },
  { word: "to", prob: "99%" },
  { word: "produce", prob: "82%" },
  { word: "glucose", prob: "76%" },
  { word: "and", prob: "98%" },
  { word: "oxygen.", prob: "95%" },
];

const RECAP = [
  "LLMs are trained on billions of text examples",
  "They predict the next most-likely word — one at a time",
  "No 'thinking' — pure pattern-based probability",
  "The bigger the training data, the smarter the guess",
];

// ─── Scenes ──────────────────────────────────────────────────────────────────
// 0 = title card   (4 s)
// 1 = typing       (types at 110 ms/char → ~2.5 s + 1.5 s pause = ~4 s)
// 2 = tokenise     (tokens bounce in 700 ms apart → ~4.5 s)
// 3 = processing   (network fires + prob bars, 8 s)
// 4 = streaming    (words at 650 ms/word → ~11 s)
// 5 = recap        (bullets 900 ms apart → ~4 s)

const SCENE_DURATIONS = [4000, 4000, 4500, 8000, 11000, 4000];

// ─── Mini neural net ─────────────────────────────────────────────────────────
const NN_NODES = [
  { id: 0, x: 10, y: 20 }, { id: 1, x: 10, y: 50 }, { id: 2, x: 10, y: 80 },
  { id: 3, x: 35, y: 15 }, { id: 4, x: 35, y: 38 }, { id: 5, x: 35, y: 62 }, { id: 6, x: 35, y: 85 },
  { id: 7, x: 65, y: 20 }, { id: 8, x: 65, y: 50 }, { id: 9, x: 65, y: 80 },
  { id: 10, x: 90, y: 30 }, { id: 11, x: 90, y: 50 }, { id: 12, x: 90, y: 70 },
];
const NN_EDGES: [number, number][] = [
  [0,3],[0,4],[0,5],[1,3],[1,4],[1,5],[1,6],[2,4],[2,5],[2,6],
  [3,7],[3,8],[4,7],[4,8],[4,9],[5,8],[5,9],[6,8],[6,9],
  [7,10],[7,11],[8,10],[8,11],[8,12],[9,11],[9,12],
];

function NeuralNet({ active }: { active: boolean }) {
  const [lit, setLit] = useState<Set<number>>(new Set());
  useEffect(() => {
    if (!active) { setLit(new Set()); return; }
    const iv = setInterval(() => {
      setLit(new Set(Array.from({ length: 6 }, () => Math.floor(Math.random() * 13))));
    }, 320);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {NN_EDGES.map(([a, b], i) => {
        const na = NN_NODES[a], nb = NN_NODES[b];
        const on = lit.has(a) || lit.has(b);
        return (
          <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={on ? "#6366F1" : "#1e293b"}
            strokeWidth={on ? "0.9" : "0.4"}
            opacity={on ? 0.9 : 0.3}
            style={{ transition: "all 0.25s" }}
          />
        );
      })}
      {NN_NODES.map(n => {
        const on = lit.has(n.id);
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={3.5}
              fill={on ? "#6366F1" : "#0f172a"}
              stroke={on ? "#818CF8" : "#334155"}
              strokeWidth="0.7"
              style={{ transition: "all 0.25s" }}
            />
            {on && <circle cx={n.x} cy={n.y} r={6} fill="none" stroke="#6366F1" strokeWidth="0.5" opacity="0.35" />}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Probability bar ─────────────────────────────────────────────────────────
const PROB_WORDS = [
  { word: "Photosynthesis", pct: 94 },
  { word: "Plants",         pct: 3  },
  { word: "Sunlight",       pct: 2  },
  { word: "Biology",        pct: 1  },
];

function ProbBars({ show }: { show: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {PROB_WORDS.map((p, i) => (
        <div key={p.word} className="flex items-center gap-2">
          <span className="text-xs font-mono w-24 text-right shrink-0" style={{ color: i === 0 ? "#a5b4fc" : "#475569" }}>
            {p.word}
          </span>
          <div className="flex-1 rounded-full overflow-hidden h-2" style={{ background: "rgba(99,102,241,0.12)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: i === 0 ? "linear-gradient(90deg,#6366F1,#818CF8)" : "#1e3a5f" }}
              initial={{ width: 0 }}
              animate={show ? { width: `${p.pct}%` } : { width: 0 }}
              transition={{ duration: 1.2, delay: i * 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs font-mono w-8 shrink-0" style={{ color: i === 0 ? "#818CF8" : "#334155" }}>
            {p.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Slide2({ isActive }: { isActive: boolean }) {
  const [scene, setScene] = useState(0);
  const [typedLen, setTypedLen] = useState(0);
  const [tokensShown, setTokensShown] = useState(0);
  const [outputCount, setOutputCount] = useState(0);
  const [flashProb, setFlashProb] = useState<string | null>(null);
  const [recapCount, setRecapCount] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const t = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  useEffect(() => {
    if (!isActive) {
      clear();
      setScene(0); setTypedLen(0); setTokensShown(0);
      setOutputCount(0); setFlashProb(null); setRecapCount(0);
      return;
    }

    // Scene 0 → title card (already visible)
    setScene(0);

    // Scene 1 → typing
    t(() => {
      setScene(1);
      for (let i = 0; i <= PROMPT.length; i++) {
        t(() => setTypedLen(i), i * 110);
      }
    }, 3500);

    // Scene 2 → tokenise
    const s2Start = 3500 + PROMPT.length * 110 + 1200;
    t(() => {
      setScene(2);
      for (let i = 0; i <= TOKENS.length; i++) {
        t(() => setTokensShown(i), i * 700);
      }
    }, s2Start);

    // Scene 3 → processing / prob bars
    const s3Start = s2Start + TOKENS.length * 700 + 1000;
    t(() => setScene(3), s3Start);

    // Scene 4 → streaming output
    const s4Start = s3Start + 8000;
    t(() => {
      setScene(4);
      OUTPUT_STEPS.forEach((step, i) => {
        t(() => {
          setOutputCount(i + 1);
          setFlashProb(step.prob);
          t(() => setFlashProb(null), 500);
        }, i * 650);
      });
    }, s4Start);

    // Scene 5 → recap
    const s5Start = s4Start + OUTPUT_STEPS.length * 650 + 1500;
    t(() => {
      setScene(5);
      for (let i = 0; i <= RECAP.length; i++) {
        t(() => setRecapCount(i), i * 900);
      }
    }, s5Start);

    return clear;
  }, [isActive]);

  // Derived helpers
  const inScene = (min: number, max = 99) => scene >= min && scene <= max;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-8 py-6">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-6">

        {/* ── Title ── */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "#6366F1" }}>
            Deep Dive
          </span>
          <h2 className="font-black leading-tight mt-1" style={{
            fontSize: "clamp(1.8rem,4vw,3.2rem)",
            background: "linear-gradient(135deg,#ffffff 0%,#e2e8f0 50%,#818CF8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            How LLMs Actually Work
          </h2>
        </motion.div>

        {/* ── Scene 0 — headline hook ── */}
        <AnimatePresence>
          {scene === 0 && (
            <motion.div
              key="hook"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-4 py-4"
            >
              <div className="text-4xl font-black text-white text-center leading-tight">
                The world&apos;s best<br />
                <span style={{ color: "#818CF8" }}>next-word guesser</span>
              </div>
              <p className="text-slate-400 text-lg text-center max-w-xl">
                An LLM doesn&apos;t &ldquo;understand&rdquo; — it predicts the most probable next word,<br />
                billions of times, incredibly fast.
              </p>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-slate-600 text-sm mt-2"
              >
                Watch how it does it →
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Scenes 1-4 — 3-box flow ── */}
        <AnimatePresence>
          {inScene(1, 4) && (
            <motion.div
              key="flow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="grid gap-3"
              style={{ gridTemplateColumns: "1fr 36px 1fr 36px 1fr" }}
            >
              {/* ── Box 1: Prompt & Tokens ── */}
              <div className="rounded-xl p-4 flex flex-col gap-3" style={{
                background: "rgba(15,23,42,0.85)",
                border: "1px solid rgba(99,102,241,0.35)",
                boxShadow: "0 0 20px rgba(99,102,241,0.12)",
              }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-500 ml-1 font-semibold">① Your Prompt</span>
                </div>

                {/* Typing */}
                <div className="font-mono text-sm rounded-lg p-3 min-h-[44px]" style={{
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  color: "#a5b4fc",
                }}>
                  {PROMPT.slice(0, typedLen)}
                  {inScene(1) && typedLen < PROMPT.length && typedLen > 0 && (
                    <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 align-middle" style={{ animation: "blink 1s step-end infinite" }} />
                  )}
                </div>

                {/* Tokens */}
                <div>
                  <div className="text-xs text-slate-600 mb-1.5">Split into tokens (word-pieces):</div>
                  <div className="flex flex-wrap gap-1.5">
                    {TOKENS.map((tok, i) => (
                      <AnimatePresence key={i}>
                        {tokensShown > i && (
                          <motion.span
                            initial={{ opacity: 0, y: 6, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="text-xs px-2 py-0.5 rounded font-mono"
                            style={{ background: `${tok.color}18`, color: tok.color, border: `1px solid ${tok.color}35` }}
                          >
                            {tok.text}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
                  {tokensShown >= TOKENS.length && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                      className="text-xs text-slate-500 mt-2">
                      6 tokens — each becomes a number vector
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="flex items-center justify-center">
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
                  style={{ color: inScene(3, 4) ? "#6366F1" : "#334155" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>

              {/* ── Box 2: Transformer ── */}
              <div className="rounded-xl p-4 flex flex-col gap-2" style={{
                background: "rgba(15,23,42,0.85)",
                border: `1px solid rgba(99,102,241,${inScene(3, 4) ? 0.6 : 0.2})`,
                boxShadow: inScene(3, 4) ? "0 0 28px rgba(99,102,241,0.28)" : "none",
                transition: "all 0.6s",
              }}>
                <div className="text-xs text-slate-500 text-center font-semibold">② Transformer (175B weights)</div>
                <div className="h-24 my-1">
                  <NeuralNet active={inScene(3, 4)} />
                </div>

                {/* Prob bars — only in scene 3 */}
                <AnimatePresence>
                  {scene === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                      <div className="text-xs text-slate-600 mb-1.5 text-center">
                        Next-word probabilities:
                      </div>
                      <ProbBars show={scene === 3} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center text-xs font-mono" style={{ color: "#6366F1" }}>
                  {inScene(3, 4) ? (
                    <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>
                      ● Calculating probabilities...
                    </motion.span>
                  ) : (
                    <span className="text-slate-700">Waiting for tokens</span>
                  )}
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="flex items-center justify-center">
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                  style={{ color: scene === 4 ? "#10b981" : "#334155" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>

              {/* ── Box 3: Output ── */}
              <div className="rounded-xl p-4 flex flex-col gap-2" style={{
                background: "rgba(15,23,42,0.85)",
                border: `1px solid rgba(16,185,129,${scene === 4 ? 0.45 : 0.15})`,
                boxShadow: scene === 4 ? "0 0 22px rgba(16,185,129,0.18)" : "none",
                transition: "all 0.5s",
              }}>
                <div className="text-xs text-slate-500 font-semibold">③ Generated Output</div>
                <div className="text-sm rounded-lg p-3 min-h-[90px] leading-relaxed relative" style={{
                  background: "rgba(16,185,129,0.05)",
                  border: "1px solid rgba(16,185,129,0.15)",
                  color: "#6ee7b7",
                }}>
                  {OUTPUT_STEPS.slice(0, outputCount).map(s => s.word).join(" ")}
                  {outputCount > 0 && outputCount < OUTPUT_STEPS.length && (
                    <span className="inline-block w-0.5 h-4 bg-emerald-400 ml-0.5 align-middle" style={{ animation: "blink 0.7s step-end infinite" }} />
                  )}
                </div>

                {/* Probability flash */}
                <AnimatePresence>
                  {flashProb && (
                    <motion.div
                      key={flashProb + outputCount}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-center font-mono"
                      style={{ color: "#10b981" }}
                    >
                      confidence: {flashProb}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Scene 5 — Recap bullets ── */}
        <AnimatePresence>
          {scene === 5 && (
            <motion.div
              key="recap"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-center text-xl font-bold text-white">Key takeaways</h3>
              <div className="grid grid-cols-2 gap-3">
                {RECAP.map((line, i) => (
                  <AnimatePresence key={i}>
                    {recapCount > i && (
                      <motion.div
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-start gap-3 rounded-xl p-4"
                        style={{
                          background: "rgba(99,102,241,0.08)",
                          border: "1px solid rgba(99,102,241,0.22)",
                        }}
                      >
                        <span className="text-xl mt-0.5">
                          {["🧠", "🎯", "🔢", "📚"][i]}
                        </span>
                        <p className="text-sm text-slate-300 leading-relaxed">{line}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}

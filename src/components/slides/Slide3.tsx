"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    step: 0,
    label: "Pure Noise",
    denoiseStep: 0,
    noiseAmount: 1.0,
    description: "Random Gaussian noise — no structure whatsoever",
  },
  {
    step: 1,
    label: "Heavy Noise",
    denoiseStep: 10,
    noiseAmount: 0.75,
    description: "Subtle global structure beginning to emerge",
  },
  {
    step: 2,
    label: "Partial Denoising",
    denoiseStep: 25,
    noiseAmount: 0.5,
    description: "Colors and rough shapes forming",
  },
  {
    step: 3,
    label: "Near Clear",
    denoiseStep: 40,
    noiseAmount: 0.2,
    description: "Details resolving, noise almost gone",
  },
  {
    step: 4,
    label: "Final Image",
    denoiseStep: 50,
    noiseAmount: 0,
    description: "Crystal-clear mountain lake at sunset",
  },
];

const IMAGE_URL =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop";

function NoiseCanvas({
  noiseAmount,
  width = 400,
  height = 240,
}: {
  noiseAmount: number;
  width?: number;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = IMAGE_URL;
    img.onload = () => {
      imgRef.current = img;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    cancelAnimationFrame(animRef.current);

    function drawFrame() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw base image if available and noise < 1
      if (imgRef.current && noiseAmount < 1) {
        ctx.globalAlpha = 1;
        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
      }

      // Overlay noise
      if (noiseAmount > 0) {
        const imgData = ctx.createImageData(canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.floor(Math.random() * 255);
          const r = Math.floor(Math.random() * 80 + 100);
          const g = Math.floor(Math.random() * 60 + 80);
          const b = Math.floor(Math.random() * 120 + 100);
          data[i] = noise * 0.5 + r * 0.5;
          data[i + 1] = noise * 0.5 + g * 0.5;
          data[i + 2] = noise * 0.5 + b * 0.5;
          data[i + 3] = Math.floor(noiseAmount * 255);
        }

        ctx.putImageData(imgData, 0, 0);
      }

      if (noiseAmount > 0.05) {
        animRef.current = requestAnimationFrame(drawFrame);
      }
    }

    drawFrame();
    return () => cancelAnimationFrame(animRef.current);
  }, [noiseAmount]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

export default function Slide3({ isActive }: { isActive: boolean }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setIsPlaying(false);
      return;
    }

    // Auto-play after slide enters
    const startTimeout = setTimeout(() => {
      setIsPlaying(true);
    }, 600);

    return () => clearTimeout(startTimeout);
  }, [isActive]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STEPS.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const step = STEPS[currentStep];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-8">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(139,92,246,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-5">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "#A855F7" }}
          >
            Generative Image AI
          </span>
          <h2
            className="font-black mt-1 leading-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              background:
                "linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #C084FC 80%, #F59E0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Diffusion Models — From Noise to Reality
          </h2>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-2 gap-6 items-start">
          {/* Left: Canvas + info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Canvas */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: `1px solid ${step.noiseAmount === 0 ? "rgba(245,158,11,0.5)" : "rgba(139,92,246,0.3)"}`,
                boxShadow:
                  step.noiseAmount === 0
                    ? "0 0 40px rgba(245,158,11,0.2)"
                    : "0 0 20px rgba(139,92,246,0.15)",
                transition: "all 0.8s",
                aspectRatio: "16/9",
              }}
            >
              {step.noiseAmount === 0 ? (
                <motion.img
                  key="final-image"
                  src={IMAGE_URL}
                  alt="Mountain lake sunset"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
              ) : (
                <NoiseCanvas noiseAmount={step.noiseAmount} />
              )}

              {/* Overlay label */}
              <div className="absolute bottom-3 left-3 right-3">
                <div
                  className="text-xs font-mono px-3 py-1.5 rounded-lg inline-block"
                  style={{
                    background: "rgba(0,0,0,0.7)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: step.noiseAmount === 0 ? "#FCD34D" : "#A78BFA",
                  }}
                >
                  Denoising: Step {step.denoiseStep} of 50
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "rgba(15,23,42,0.8)",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-mono">
                  Progress
                </span>
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: "#A855F7" }}
                >
                  {step.denoiseStep}/50 steps
                </span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: "rgba(139,92,246,0.15)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${(step.denoiseStep / 50) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{
                    background:
                      "linear-gradient(90deg, #7C3AED, #A855F7, #F59E0B)",
                    boxShadow: "0 0 10px rgba(168,85,247,0.5)",
                  }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">{step.description}</p>
            </div>
          </motion.div>

          {/* Right: Step indicators + info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            {/* Step cards */}
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer"
                onClick={() => {
                  setCurrentStep(i);
                  setIsPlaying(false);
                }}
                animate={{
                  background:
                    i === currentStep
                      ? "rgba(139,92,246,0.15)"
                      : "rgba(15,23,42,0.6)",
                  borderColor:
                    i === currentStep
                      ? "rgba(168,85,247,0.5)"
                      : "rgba(255,255,255,0.05)",
                }}
                transition={{ duration: 0.3 }}
                style={{
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background:
                      i <= currentStep
                        ? "linear-gradient(135deg, #7C3AED, #A855F7)"
                        : "rgba(30,41,59,0.8)",
                    color: i <= currentStep ? "#fff" : "#475569",
                    boxShadow:
                      i === currentStep
                        ? "0 0 15px rgba(168,85,247,0.5)"
                        : "none",
                    transition: "all 0.4s",
                  }}
                >
                  {i < currentStep ? "✓" : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm font-semibold"
                    style={{
                      color: i === currentStep ? "#E2E8F0" : "#64748B",
                    }}
                  >
                    {s.label}
                  </div>
                  <div className="text-xs text-slate-600">
                    Step {s.denoiseStep}/50
                  </div>
                </div>
                <div
                  className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{
                    background:
                      i === currentStep
                        ? "rgba(168,85,247,0.2)"
                        : "transparent",
                    color:
                      i === currentStep ? "#C084FC" : "transparent",
                    transition: "all 0.3s",
                  }}
                >
                  {Math.round(s.noiseAmount * 100)}% noise
                </div>
              </motion.div>
            ))}

            {/* Replay button */}
            <button
              onClick={() => {
                setCurrentStep(0);
                setTimeout(() => setIsPlaying(true), 100);
              }}
              className="mt-2 py-2 px-4 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.3)",
                color: "#A855F7",
              }}
            >
              ↺ Replay Animation
            </button>

            {/* Caption */}
            <div
              className="rounded-xl p-3 text-xs text-slate-400 leading-relaxed"
              style={{
                background: "rgba(15,23,42,0.6)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span style={{ color: "#A855F7" }}>Stable Diffusion</span>,{" "}
              <span style={{ color: "#60A5FA" }}>Midjourney</span>, and{" "}
              <span style={{ color: "#F59E0B" }}>DALL·E</span> all use this
              iterative denoising technique — the model learns to reverse the
              noise process, step by step.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

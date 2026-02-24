"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bolt, 
  Clock, 
  Layers, 
  CheckCircle2, 
  MousePointer2, 
  Globe, 
  HeartPulse, 
  ShoppingCart, 
  LibraryBig, 
  Headset, 
  Play, 
  Trophy,
  Cpu,
  Briefcase,
  Terminal,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const HeroSection = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('General');
  const canvasRefLeft = useRef<HTMLCanvasElement>(null);
  const canvasRefRight = useRef<HTMLCanvasElement>(null);

  // Data Rain Effect Implementation
  useEffect(() => {
    const setupRain = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 150;
      canvas.height = window.innerHeight;

      const characters = "0101010101010101";
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      const drops: number[] = [];

      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100;
      }

      const draw = () => {
        ctx.fillStyle = "rgba(10, 14, 26, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0099ff33"; // Very faint blue
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i] += 0.5;
        }
      };

      const interval = setInterval(draw, 50);
      return () => clearInterval(interval);
    };

    if (canvasRefLeft.current) setupRain(canvasRefLeft.current);
    if (canvasRefRight.current) setupRain(canvasRefRight.current);
  }, []);

  const industries = [
    { name: 'General', icon: Globe },
    { name: 'Healthcare', icon: HeartPulse },
    { name: 'Retail', icon: ShoppingCart },
    { name: 'Financial Services', icon: LibraryBig },
    { name: 'Contact Center', icon: Headset },
  ];

  const pillars = [
    { title: 'How AI Works', icon: Cpu },
    { title: 'Workplace Applications', icon: Briefcase },
    { title: 'Prompting Mastery', icon: Terminal },
    { title: 'Evaluating Outputs', icon: CheckCircle2 },
    { title: 'Responsible Use', icon: ShieldCheck },
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0e1a]"
      style={{ backgroundImage: 'radial-gradient(circle at center, #16203a 0%, #0a0e1a 100%)' }}
    >
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[10%] w-[500px] height-[500px] rounded-full blur-[120px] bg-primary/10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[600px] height-[600px] rounded-full blur-[150px] bg-accent/5 pointer-events-none" />

      {/* Data Rain Sidebars */}
      <canvas 
        ref={canvasRefLeft} 
        className="fixed left-0 top-0 h-full w-[150px] opacity-40 pointer-events-none z-10 data-rain-mask" 
      />
      <canvas 
        ref={canvasRefRight} 
        className="fixed right-0 top-0 h-full w-[150px] opacity-40 pointer-events-none z-10 data-rain-mask" 
      />

      <div className="container relative z-20 px-5 pt-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Bolt className="w-4 h-4 text-primary fill-primary" />
            <span className="text-[13px] font-medium text-white/90">Updated February 2026</span>
          </div>

          {/* Heading */}
          <h1 className="text-[3.5rem] font-extrabold text-white leading-[1.1] mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Master AI for <span className="text-gradient-blue">Sales Excellence</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            A comprehensive curriculum covering AI foundations, prompting mastery, 40+ AI tools, and industry-specific playbooks — built for sales professionals who want to lead, not follow.
          </p>

          {/* Sub-headers Metrics */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            {[
              { label: '~45-60 min', icon: Clock },
              { label: '11 Modules', icon: Layers },
              { label: '4 Quizzes', icon: CheckCircle2 },
              { label: 'Interactive Demos', icon: MousePointer2 }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-lg glass-panel text-[13px] font-medium text-white/80">
                <item.icon className="w-4 h-4 text-primary" />
                {item.label}
              </div>
            ))}
          </div>

          {/* Industry Selection */}
          <div className="w-full mb-12 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
            <p className="text-[13px] uppercase tracking-widest font-semibold text-white/40 mb-4">Select Your Industry for Personalized Examples</p>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((ind) => (
                <button
                  key={ind.name}
                  onClick={() => setSelectedIndustry(ind.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-[13px] font-medium ${
                    selectedIndustry === ind.name 
                      ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(0,153,255,0.3)]' 
                      : 'glass-panel border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <ind.icon className="w-4 h-4" />
                  {ind.name}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-[50px] duration-1000 delay-500">
            <button className="flex items-center gap-2 px-8 py-4 bg-primary rounded-xl text-white font-bold text-[15px] hover:scale-105 transition-transform duration-200 shadow-lg shadow-primary/20">
              <Play className="w-5 h-5 fill-white" />
              Start Training
            </button>
            <button className="flex items-center gap-2 px-8 py-4 glass-panel rounded-xl text-white font-bold text-[15px] hover:bg-white/10 transition-colors duration-200">
              <Trophy className="w-5 h-5 text-white/80" />
              Jump to Quizzes
            </button>
          </div>

          {/* Training Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full animate-in fade-in slide-in-from-bottom-[60px] duration-1000 delay-700">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col items-center justify-center gap-3 p-6 glass-panel rounded-xl hover:bg-white/10 transition-all duration-300 cursor-default"
              >
                <div className="p-3 rounded-lg bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <pillar.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-[13px] font-semibold text-white/70 group-hover:text-white transition-colors text-center leading-tight">
                  {pillar.title}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Floating Prompt at Bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-[13px] font-medium cursor-pointer hover:text-white transition-colors group">
        <span>Next: Core Concepts</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </section>
  );
};

export default HeroSection;
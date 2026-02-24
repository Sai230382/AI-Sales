"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Concepts", href: "#concepts" },
    { name: "AI Models", href: "#llms" },
    { name: "AI Spectrum", href: "#spectrum" },
    { name: "Tools", href: "#tools" },
    { name: "Prompting", href: "#prompting" },
    { name: "Prompt Lab", href: "#lab" },
    { name: "Industries", href: "#industries" },
    { name: "Pricing", href: "#pricing" },
    { name: "Ethics", href: "#ethics" },
    { name: "Future", href: "#future" },
    { name: "Quizzes", href: "#quizzes" },
  ];

  const mobileNavLinks = [
    { name: "Core Concepts", href: "#concepts" },
    { name: "How AI Models Work", href: "#llms" },
    { name: "AI Spectrum", href: "#spectrum" },
    { name: "AI Tools", href: "#tools" },
    { name: "Prompting", href: "#prompting" },
    { name: "Prompt Lab", href: "#lab" },
    { name: "Industries", href: "#industries" },
    { name: "AI Pricing", href: "#pricing" },
    { name: "AI Ethics", href: "#ethics" },
    { name: "Future of AI", href: "#future" },
    { name: "Quizzes", href: "#quizzes" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[1003] transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10"
            : "bg-[#0f172a]/65 backdrop-blur-sm"
        }`}
        style={{ height: "65px" }}
      >
        <div className="max-w-[1280px] h-full mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-2 text-white font-sans font-semibold text-[18px] transition-opacity hover:opacity-80"
          >
            <GraduationCap className="text-[#0ea5e9] w-[27px] h-[22px]" />
            AI Sales Academy
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/60 hover:text-white hover:bg-white/5 px-[14px] py-[6px] rounded-[6px] text-[13px] font-medium transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[1002] lg:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.98)",
          paddingTop: "65px",
        }}
      >
        <div className="flex flex-col p-6 gap-2">
          {mobileNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-[#64748b] hover:text-white hover:bg-white/5 px-[14px] py-[10px] rounded-[8px] text-[14px] font-medium transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Top Scroll Indicator */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#0099ff] z-[1004] transition-all duration-300"
        style={{ width: "0%" }} // This would typically be linked to scroll progress state
      />
    </>
  );
};

export default Navigation;
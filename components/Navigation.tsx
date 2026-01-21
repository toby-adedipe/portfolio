"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationProps {
  name: string;
}

export function Navigation({ name }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-30 transition-colors duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollTo("hero")}
              className="text-lg font-bold text-text-primary hover:text-accent transition-colors"
            >
              {name}
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollTo("projects")}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollTo("experience")}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Contact
              </button>
              <span className="text-text-secondary text-sm font-mono">
                <kbd className="px-2 py-1 bg-surface border border-border rounded text-xs">
                  ⌘K
                </kbd>
              </span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 bg-surface border-b border-border z-20 md:hidden"
          >
            <div className="px-6 py-4 space-y-4">
              <button
                onClick={() => scrollTo("projects")}
                className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollTo("experience")}
                className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="block w-full text-left text-text-secondary hover:text-text-primary transition-colors"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

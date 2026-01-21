"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface SearchResult {
  type: "project" | "experience";
  title: string;
  subtitle: string;
  description: string;
  slug: string | null;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const placeholders = [
  "Search projects...",
  "Find AI work...",
  "What did you build?",
  "Type to search...",
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter placeholder effect
  useEffect(() => {
    if (!isOpen) return;

    const targetPlaceholder = placeholders[placeholderIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= targetPlaceholder.length) {
        setPlaceholder(targetPlaceholder.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [isOpen, placeholderIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Easter egg
  const triggerEasterEgg = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2dd4bf", "#a78bfa", "#ededec"],
    });

    setTimeout(() => {
      window.open("mailto:adedipe.toby@gmail.com?subject=Let's work together!", "_blank");
    }, 500);
  }, []);

  // Search function
  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    // Easter egg check
    if (searchQuery.toLowerCase().includes("hire tobi")) {
      triggerEasterEgg();
      onClose();
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });

      const data = await response.json();
      setResults(data.results || []);
      setSelectedIndex(0);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [onClose, triggerEasterEgg]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      search(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, search]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };

  const handleSelect = (result: SearchResult) => {
    if (result.type === "project" && result.slug) {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    } else if (result.type === "experience") {
      document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg z-50"
          >
            <div className="bg-surface border border-border rounded-xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <svg
                  className="w-5 h-5 text-text-secondary shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent text-text-primary placeholder-text-secondary focus:outline-none text-lg"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-text-secondary bg-background rounded border border-border">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto">
                {isLoading && (
                  <div className="p-4 text-center text-text-secondary">
                    <span className="inline-block animate-pulse">Searching...</span>
                  </div>
                )}

                {!isLoading && query && results.length === 0 && (
                  <div className="p-4 text-center text-text-secondary">
                    No results found. Try a different search term.
                  </div>
                )}

                {!isLoading && results.length > 0 && (
                  <ul className="py-2">
                    {results.map((result, index) => (
                      <li key={`${result.type}-${result.title}`}>
                        <button
                          onClick={() => handleSelect(result)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full px-4 py-3 text-left transition-colors ${
                            index === selectedIndex
                              ? "bg-accent/10"
                              : "hover:bg-background"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                                result.type === "project"
                                  ? "bg-accent"
                                  : "bg-ai-glow"
                              }`}
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-text-primary truncate">
                                  {result.title}
                                </span>
                                <span className="text-xs font-mono text-text-secondary">
                                  {result.subtitle}
                                </span>
                              </div>
                              <p className="text-sm text-text-secondary truncate">
                                {result.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {!query && !isLoading && (
                  <div className="p-4 text-sm text-text-secondary">
                    <p className="mb-2">Quick tips:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Search for technologies like &quot;Python&quot; or &quot;React&quot;</li>
                      <li>• Find projects by company name</li>
                      <li>• Try &quot;hire tobi&quot; for a surprise</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-border text-xs text-text-secondary">
                <span>
                  <kbd className="px-1 py-0.5 bg-background rounded border border-border">↑↓</kbd>
                  {" "}to navigate
                </span>
                <span>
                  <kbd className="px-1 py-0.5 bg-background rounded border border-border">↵</kbd>
                  {" "}to select
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

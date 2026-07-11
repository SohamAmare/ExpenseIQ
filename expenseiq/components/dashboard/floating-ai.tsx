"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot } from "lucide-react";

export function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello Soham! I am your AI financial co-pilot. I can analyze your spending, check your remaining budgets, or give saving recommendations.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Mock contextual AI responses
    setTimeout(() => {
      let aiResponse = "I've analyzed your active ledger profiles. Currently, your largest expenditure category is Cloud Infrastructure (₹1,250).";

      if (userMessage.toLowerCase().includes("budget") || userMessage.toLowerCase().includes("limit")) {
        aiResponse = "Your total monthly budget remaining is ₹1,180. Your software subscription budget is safe, but your marketing budget is close to 85% used.";
      } else if (userMessage.toLowerCase().includes("save") || userMessage.toLowerCase().includes("optimization")) {
        aiResponse = "Based on your subscription seats, I recommend downgrading unused seats in Figma to save approximately ₹1,200/month.";
      } else if (userMessage.toLowerCase().includes("health") || userMessage.toLowerCase().includes("score")) {
        aiResponse = "Your ExpenseIQ Health Score is 88/100 (Excellent). This rating is sustained by your solid liquidity buffer and stable consulting incomes.";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Dynamic Chat Window Popup */}
      {open && (
        <div className="mb-4 w-80 md:w-96 h-[400px] bg-white border border-neutral-border rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-250">
          {/* Header */}
          <div className="bg-brand-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="size-4.5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-none">AI Advisor</h4>
                <span className="text-[9px] text-emerald-200 font-semibold uppercase tracking-wider mt-0.5 block">
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white size-6 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-neutral-secondary-bg/25">
            {messages.map((m, idx) => {
              const isUser = m.role === "user";
              return (
                <div key={idx} className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
                  {!isUser && (
                    <div className="size-7 rounded-lg bg-brand-primary/10 border border-brand-primary/15 text-brand-primary flex items-center justify-center shrink-0">
                      <Bot className="size-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      isUser
                        ? "bg-brand-primary text-white rounded-tr-xs"
                        : "bg-white border border-neutral-border text-text-primary rounded-tl-xs"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              );
            })}
            
            {/* AI is thinking bubble indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="size-7 rounded-lg bg-brand-primary/10 border border-brand-primary/15 text-brand-primary flex items-center justify-center shrink-0">
                  <Bot className="size-3.5 animate-pulse" />
                </div>
                <div className="bg-white border border-neutral-border text-text-primary rounded-2xl rounded-tl-xs px-3.5 py-2.5 text-xs flex gap-1 items-center">
                  <span className="size-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="size-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="size-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="p-3 border-t border-neutral-border bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Advisor... e.g. How to save?"
              disabled={isTyping}
              className="flex-1 border border-neutral-border rounded-xl px-3 text-xs h-9 bg-neutral-secondary-bg/50 focus:bg-white outline-none focus:ring-1 focus:ring-brand-primary/20 transition-all"
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="flex items-center justify-center size-9 rounded-xl bg-brand-primary text-white shadow-xs hover:bg-brand-primary/95 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Sparkly Pulse Bubble Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative size-12 rounded-full bg-brand-primary text-white shadow-lg flex items-center justify-center hover:scale-105 transition-all duration-200 outline-none border border-brand-primary/20 cursor-pointer group"
        aria-label="Toggle AI Advisor"
      >
        {/* Glow pulsing ring layer */}
        <span className="absolute inset-0 rounded-full bg-brand-primary/45 -z-10 animate-ping opacity-75" />
        
        {open ? <X className="size-5" /> : <Sparkles className="size-5 group-hover:rotate-12 transition-transform duration-250" />}
      </button>
    </div>
  );
}

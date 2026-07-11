"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, CornerDownLeft } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI Portfolio assistant. Ask me anything about my developer's technical skills, case studies, or how to collaborate!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setIsLoading(true);

    try {
      // Map message history to correct server format
      const formattedHistory = [
        ...messages.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content,
        })),
        { role: "user", content: userText },
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: formattedHistory }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: `System Error: ${data.error}` }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Apologies, I encountered an issue reaching the chat server. Please ensure the server-side API is active." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="w-80 sm:w-96 h-[500px] bg-white rounded-2xl border border-gray-100 shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-emerald-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-tight">AI Assistant</h4>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Powered by Gemini
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
                id="close-chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                    m.role === "user" ? "bg-gray-100 text-gray-700" : "bg-gray-900 text-white"
                  }`}>
                    {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] text-xs leading-relaxed p-3 rounded-xl border ${
                    m.role === "user" 
                      ? "bg-gray-50 border-gray-100 text-gray-800 rounded-tr-none" 
                      : "bg-white border-gray-100 text-gray-800 rounded-tl-none"
                  }`}>
                    <p className="whitespace-pre-line">{m.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center text-xs shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-gray-100 p-3 rounded-xl rounded-tl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Form Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-gray-50 bg-white flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, contact..."
                className="flex-grow text-xs outline-none border border-gray-200 focus:border-gray-900 rounded-xl px-3.5 py-2.5 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 disabled:bg-gray-100 text-white disabled:text-gray-400 transition-colors cursor-pointer shrink-0"
                id="send-chat-msg"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        id="open-chatbot-btn"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}

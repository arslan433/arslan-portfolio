"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (options: { title: string; description?: string; type?: ToastType; duration?: number }) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({
      title,
      description,
      type = "info",
      duration = 5000,
    }: {
      title: string;
      description?: string;
      type?: ToastType;
      duration?: number;
    }) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback((title: string, description?: string) => {
    toast({ title, description, type: "success" });
  }, [toast]);

  const error = useCallback((title: string, description?: string) => {
    toast({ title, description, type: "error" });
  }, [toast]);

  const info = useCallback((title: string, description?: string) => {
    toast({ title, description, type: "info" });
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((t) => {
            let Icon = Info;
            let iconColor = "text-blue-500 dark:text-blue-400";
            let borderColor = "border-zinc-200/50 dark:border-zinc-800/50";
            let accentBar = "bg-blue-500";

            if (t.type === "success") {
              Icon = CheckCircle;
              iconColor = "text-emerald-500 dark:text-emerald-400";
              borderColor = "border-emerald-500/20 dark:border-emerald-500/20";
              accentBar = "bg-emerald-500";
            } else if (t.type === "error") {
              Icon = AlertCircle;
              iconColor = "text-rose-500 dark:text-rose-400";
              borderColor = "border-rose-500/20 dark:border-rose-500/20";
              accentBar = "bg-rose-500";
            }

            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`relative pointer-events-auto flex w-full overflow-hidden rounded-xl border ${borderColor} bg-white/95 dark:bg-zinc-950/95 backdrop-blur-[12px] p-4 pr-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]`}
              >
                {/* Visual Accent Side Strip */}
                <div className={`absolute top-0 left-0 bottom-0 w-[4px] ${accentBar}`} />

                <div className="flex gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white leading-snug">
                      {t.title}
                    </h4>
                    {t.description && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                        {t.description}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => removeToast(t.id)}
                  className="absolute top-3.5 right-3 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

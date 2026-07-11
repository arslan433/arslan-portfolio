"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useToast } from "@/components/ui/Toast";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
      staggerChildren: 0.1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const { success, error, info } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    info("Sending Message", "Transmitting your contact request securely...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        success("Message Sent!", "Thank you for reaching out! I will get back to you shortly.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Try again.");
        error("Sending Failed", "There was an issue sending your message. Please try again.");
      }
    } catch (err) {
      setStatus("Failed to send message. Try again.");
      error("Network Error", "Unable to establish contact. Please verify your connection.");
    }
  };

  return (
    <motion.section 
      className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-12 gap-12 items-start"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      {/* Left side text column */}
      <motion.div className="md:col-span-5 space-y-6" variants={itemVariants}>
        <div className="space-y-2">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Collaboration</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Let's build something.</h2>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
          Have an interesting project, a job opportunity, or just want to discuss software? Drop me a message and let's start a conversation.
        </p>

        <ul className="space-y-4 pt-4 text-sm text-zinc-700 dark:text-zinc-300">
          <li className="flex items-center gap-3.5">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <a
              href="https://wa.me/923474875097"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-colors"
            >
              +92 347 4875097
            </a>
          </li>
          <li className="flex items-center gap-3.5">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <a
              href="mailto:arslanpc65@gmail.com"
              className="hover:text-emerald-500 transition-colors"
            >
              arslanpc65@gmail.com
            </a>
          </li>
          <li className="flex items-center gap-3.5">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-zinc-600 dark:text-zinc-400">
              Rawalpindi, Pakistan
            </span>
          </li>
        </ul>
      </motion.div>

      {/* Right side elegant form column */}
      <motion.div 
        className="md:col-span-7 w-full p-6 sm:p-8 rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md shadow-xl"
        variants={itemVariants}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Your Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Jane Doe"
              className="w-full border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all text-zinc-800 dark:text-zinc-200"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. jane@example.com"
              className="w-full border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all text-zinc-800 dark:text-zinc-200"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="How can I help you?"
              className="w-full border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all text-zinc-800 dark:text-zinc-200"
              rows={4}
              required
            />
          </div>

          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center py-3 bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-sm"
            >
              Send Message
            </motion.button>
            {status && (
              <p className="mt-3 text-xs text-center font-medium text-emerald-600 dark:text-emerald-400 animate-pulse">
                {status}
              </p>
            )}
          </div>
        </form>
      </motion.div>
    </motion.section>
  );
}

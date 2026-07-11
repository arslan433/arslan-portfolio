'use client';

import {
  Github,
  Mail,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-50/10 dark:bg-zinc-950/10 backdrop-blur-sm py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left column - branding & copyright */}
        <div className="text-center sm:text-left space-y-1">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Arslan Muhammad
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            &copy; {currentYear} • Crafting next-generation web & AI systems.
          </p>
        </div>

        {/* Center column - quick links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/#about" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            About
          </Link>
          <Link href="/projects" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            Projects
          </Link>
          <Link href="/#experience" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            Experience
          </Link>
          <a 
            href="/Arslan-Web-&-Generative-AI-Developer-Resume.pdf" 
            target="_blank" 
            className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            Resume / CV
          </a>
        </div>

        {/* Right column - interactive social actions */}
        <div className="flex items-center gap-4">
          <motion.a
            href="https://github.com/arslan433/"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            whileHover={{ scale: 1.1, y: -1 }}
            className="p-2 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/20 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all shadow-sm"
          >
            <Github size={16} />
          </motion.a>
          
          <motion.a
            href="mailto:arslanpc65@gmail.com"
            title="Email"
            whileHover={{ scale: 1.1, y: -1 }}
            className="p-2 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/20 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all shadow-sm"
          >
            <Mail size={16} />
          </motion.a>

          <motion.a
            href="https://wa.me/923474875097"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            whileHover={{ scale: 1.1, y: -1 }}
            className="p-2 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/20 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all shadow-sm"
          >
            <MessageCircle size={16} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}

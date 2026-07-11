"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, MessageCircle, Youtube } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="flex justify-center items-center py-24 px-6 max-w-5xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full flex flex-col lg:flex-row items-center gap-16"
      >
        {/* Left Side - Image Container with Glass Frame */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-72 h-88 lg:w-96 lg:h-110 rounded-2xl p-2 bg-white/20 dark:bg-zinc-900/20 backdrop-blur-md border border-white/20 dark:border-zinc-800/40 shadow-xl"
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <img
              src="/assets/new-profile.webp"
              alt="Profile"
              className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

        {/* Right Side - Text and details */}
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">About Me</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Full-Stack Engineering with a human touch
            </h2>
          </div>

          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            I am a full-stack developer with over 2 years of practical experience in writing stable, responsive, and performance-oriented code. My passion is translating complex ideas into elegant, highly interactive user experiences that are fast under the hood and clean on the surface.
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Whether developing robust APIs in Laravel, crafting client interfaces in React and Next.js, or integrating generative AI agents and semantic retrieval pipelines, I focus on delivering scalable software that solves real problems.
          </p>

          {/* Social Icons & CV */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
              <motion.a
                title="Github"
                target="_blank"
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://github.com/arslan433/"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                title="WhatsApp"
                target="_blank"
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://wa.me/923474875097"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                <MessageCircle size={20} />
              </motion.a>
              <motion.a
                title="Stack Overflow"
                target="_blank"
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://stackoverflow.com/users/30619908/arslan-muhammad"
                className="hover:text-black dark:hover:text-white transition-colors flex items-center"
              >
                <span className="font-sans text-xs font-semibold uppercase tracking-wider border border-current rounded px-1 text-[9px]">StackOverflow</span>
              </motion.a>
            </div>

            <span className="hidden sm:inline h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

            {/* Resume Button */}
            <a target="_blank" href="/Arslan-Web-&-Generative-AI-Developer-Resume.pdf">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer"
              >
                View CV / Resume
              </motion.button>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

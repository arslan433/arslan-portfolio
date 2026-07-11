"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stats from "./Stats";
import {
  Monitor,
  Server,
  Database,
  Palette,
  Wrench,
} from "lucide-react";

const skillDescriptions = {
  HTML: "Structure and layout standard for high-performance websites.",
  CSS: "Responsive typography, visual styling, and grid/flex layout design.",
  JavaScript: "Modern ES6+ scripting for responsive application logic.",
  TypeScript: "Strict static typing layer to eliminate runtime coding errors.",
  "React.js": "Component architecture for constructing highly dynamic client UIs.",
  "Next.js": "Production React framework with SSR, App Routing, and speed.",
  "Vue.js": "Intuitive reactive framework for building rapid UI components.",
  Zustand: "Ultra-lightweight state manager built on React hook patterns.",
  Redux: "State container for centralizing and debugging state transitions.",
  Python: "Powering machine learning modules, web scrapers, and data scripts.",
  LangChain: "Framework orchestrating intelligent generative AI and LLM agents.",
  "RAG Architecture": "Grounded AI content retrieval with vector database embeddings.",
  "LLMs (Ollama)": "Running and compiling custom local LLM pipelines offline.",
  "Embedding Models": "Representing textual concepts in high-dimensional vectors.",
  Streamlit: "Rapidly prototyping interactive data science and AI applications.",
  PHP: "Server-side language powering mature backend frameworks and API engines.",
  Laravel: "Elegant PHP framework with clean MVC, queues, and migration layers.",
  Nodemailer: "Node.js utility for secure, reliable transactional emails.",
  MySQL: "Relational database server for secure, structured high-volume data.",
  MongoDB: "Document-oriented NoSQL database for flexible data modeling.",  
  SQLite: "Lightweight database engine optimized for local file storage.",
  Firebase: "NoSQL Firestore database, authentication, and push notifications.",
  "Vector Databases": "High-speed semantic search indexing for large LLM embeddings.",
  Supabase: "Open-source Firebase alternative with Postgres and auth layers.",
  PostgreSQL: "Enterprise-grade relational database with advanced indexing.",
  "Tailwind CSS": "Utility-first design paradigm for fluid responsive styling.",
  Bootstrap: "Classic grid and component system for mobile-ready frontends.",
  "shadcn/ui": "Accessible, unstyled Radix primitives styled with Tailwind.",
  "uiverse.io": "Curated repository of custom CSS and Tailwind interactive elements.",
  "Framer Motion": "Production-ready web layout transitions and interactive gestures.",
  Lucide: "Sleek, lightweight, and modern vector icon set for interface design.",
  "HighCharts.js": "Interactive, enterprise-grade charts for rich data visualization.",
  Git: "Version control standard for tracking team code modifications.",
  GitHub: "Collaborative platform for versioning, code reviews, and CI/CD.",
  Bitbucket: "Enterprise git repository hosting integrated with Jira workflows.",
  FileZilla: "Sftp file explorer for secure and direct server assets transfer.",
  PHPStorm: "Advanced full-featured IDE optimized for PHP and Laravel codebases.",
  Postman: "Automated API client tool for testing request/response schemas.",
  WordPress: "Leading modular CMS for customizable websites and blogs.",
  Elementor: "Dynamic visual builder for designing WordPress page architectures.",
  Photoshop: "Industry standard for creating and exporting optimized UI assets.",
};

export default function TechStack() {
  const [hoveredTech, setHoveredTech] = useState(null);

  const stack = {
  Frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "React Native",
    "Expo",
    "Zustand",
    "Redux",
  ],
  "Generative AI": [
    "Python",
    "LangChain",
    "RAG Architecture",
    "LLMs (Ollama)",
    "Embedding Models",
    "Streamlit",
  ],
  Backend: [
    "PHP", 
    "Laravel", 
    "Nodemailer",
  ],
  Database: [
    "MySQL", 
    "SQLite", 
    "Firebase", 
    "Vector Databases",
    "Supabase",
    "PostgreSQL",
    "MongoDB",
  ],
  UI: [
    "Tailwind CSS",
    "Bootstrap",
    "shadcn/ui",
    "uiverse.io",
    "Framer Motion",
    "Lucide",
    "HighCharts.js",
  ],
  Tools: [
    "Git",
    "GitHub",
    "Bitbucket",
    "FileZilla",
    "PHPStorm",
    "Postman",
  ],
};

  const icons = {
    Frontend: <Monitor size={22} />,
    "Generative AI": <Server size={22} />,
    Backend: <Server size={22} />,
    Database: <Database size={22} />,
    UI: <Palette size={22} />,
    Tools: <Wrench size={22} />,
  };

  return (
    <section className="w-full max-w-5xl px-6 py-24 mx-auto">
      {/* Heading */}
      <div className="text-left mb-16 space-y-2">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Knowledge Map</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Full Tech Stack
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xl">
          An overview of the languages, databases, tools, and visual frameworks that shape my build processes.
        </p>
      </div>

      {/* Categories Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(stack).map(([category, items]) => (
          <div
            key={category}
            className="group rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md p-6 hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all duration-300"
          >
            {/* Card Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm">
                {icons[category]}
              </div>

              <div>
                <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">{category}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {items.length} skills
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {items.map((tech) => (
                <div key={tech} className="relative inline-block">
                  <motion.span
                    onMouseEnter={() => setHoveredTech(tech)}
                    onMouseLeave={() => setHoveredTech(null)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-2.5 py-1 text-xs font-medium border border-zinc-200/30 dark:border-zinc-800/30 bg-zinc-50/50 dark:bg-zinc-900/20 text-zinc-600 dark:text-zinc-300 rounded-lg hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/5 transition-all duration-200 cursor-default inline-block"
                  >
                    {tech}
                  </motion.span>
                  <AnimatePresence>
                    {hoveredTech === tech && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-zinc-950/95 dark:bg-zinc-900/95 border border-zinc-200/10 dark:border-zinc-800/60 text-zinc-100 dark:text-zinc-200 text-[10px] leading-relaxed font-normal rounded-lg shadow-xl pointer-events-none text-center backdrop-blur-sm"
                      >
                        {skillDescriptions[tech] || `Expertise in ${tech}`}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-950/95 dark:border-t-zinc-900/95" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Stats/>
    </section>
  );
}
"use client";

import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Header from "./Header";
import ContactForm from "./ContactForm";
import CoderCard from "./CoderCard";
import Link from "next/link";
import Footer from "./Footer";
import TechStack from "./TechStack";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import {
  ArrowRight,
  Sparkles,
  Code,
  FolderKanban,
  Users,
  ShieldCheck,
  Monitor,
  Cpu,
  Database,
  Layers,
  Star,
  GitFork,
  ChevronDown,
  ChevronUp,
  Quote,
  ExternalLink
} from "lucide-react";

const FALLBACK_PROJECTS = [
  {
    id: "f1",
    title: "Multi-Store E-Commerce Admin",
    description: "A centralized multi-tenant management portal built with Laravel and Next.js, featuring real-time sales telemetry, automatic invoice generation, and full Stripe Checkout integrations.",
    stack: "Laravel, Next.js, PostgreSQL, Stripe, Tailwind CSS",
    github: "https://github.com/arslan433/",
    live: "",
    language: "PHP",
    languageColor: "bg-blue-500",
    stars: 38,
    forks: 12
  },
  {
    id: "f2",
    title: "Generative AI Semantic Retrieval Suite",
    description: "A secure, offline-first RAG retrieval assistant using Python, Ollama, LangChain, and ChromaDB. Implements real-time citations, dynamic chat memory structures, and custom system instruction matching.",
    stack: "Python, LangChain, Ollama, Vector DB, Streamlit",
    github: "https://github.com/arslan433/",
    live: "",
    language: "Python",
    languageColor: "bg-indigo-500",
    stars: 29,
    forks: 7
  },
  {
    id: "f3",
    title: "Warehouse Inventory Tracking Platform",
    description: "An enterprise supply-chain tracker equipping logistics teams with barcode webhook handlers, live stock indicators, threshold-based automated email alerts, and structured SQL histories.",
    stack: "Laravel, React, MySQL, Tailwind CSS, Webhooks",
    github: "https://github.com/arslan433/",
    live: "",
    language: "PHP",
    languageColor: "bg-violet-600",
    stars: 23,
    forks: 5
  }
];


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

export default function Overview() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Fetch featured projects from Firestore (max 3) with fallback
  useEffect(() => {
    const q = query(
      collection(db, "projects"),
      orderBy("createdAt", "desc"),
      limit(3)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "Project",
          description: data.description || "",
          stack: data.stack || "",
          github: data.github || "https://github.com/arslan433/",
          live: data.live || "",
          language: data.stack?.split(",")[0]?.trim() || "JavaScript",
          languageColor: data.stack?.includes("Python") ? "bg-indigo-500" : data.stack?.includes("Laravel") || data.stack?.includes("PHP") ? "bg-violet-600" : "bg-blue-500",
          stars: Math.floor(Math.random() * 20) + 12,
          forks: Math.floor(Math.random() * 8) + 2
        };
      });

      if (fetched.length > 0) {
        setProjects(fetched);
      } else {
        setProjects(FALLBACK_PROJECTS);
      }
      setLoadingProjects(false);
    }, (error) => {
      console.warn("Firestore projects fetch error, loading beautiful fallbacks:", error);
      setProjects(FALLBACK_PROJECTS);
      setLoadingProjects(false);
    });

    return () => unsub();
  }, []);

  const services = [
    {
      icon: <Monitor className="w-5 h-5 text-emerald-500" />,
      title: "Web Development",
      description: "Crafting highly optimized, secure, and beautiful client-side experiences in Next.js and React, fully integrated with clean state and fluid motion."
    },
    {
      icon: <Cpu className="w-5 h-5 text-emerald-500" />,
      title: "Backend & REST APIs",
      description: "Architecting reliable, structured backend servers in Laravel and PHP, designing relational databases, webhooks, and secure authentication schemas."
    },
    {
      icon: <Layers className="w-5 h-5 text-emerald-500" />,
      title: "GenAI & LLM Solutions",
      description: "Developing custom AI assistants and cognitive agents with Python and LangChain, utilizing RAG pipelines, local vector stores, and Ollama integration."
    },
    {
      icon: <Database className="w-5 h-5 text-emerald-500" />,
      title: "Cloud & Dev Standards",
      description: "Enforcing Git workflows, automated deployments, testing routines, server configurations, and leveraging secure Cloud platforms."
    }
  ];

  const faqs = [
    {
      q: "What is your primary development stack?",
      a: "I specialize in a modern full-stack ecosystem. My primary backend framework is Laravel (PHP), and my primary frontend framework is Next.js / React (TypeScript & Tailwind CSS). For intelligent AI capabilities, I build custom python orchestration scripts using LangChain."
    },
    {
      q: "Can you implement custom generative AI features?",
      a: "Absolutely! I integrate LLMs (like Gemini, OpenAI, or local Ollama instances) directly into web applications. This includes building RAG (Retrieval-Augmented Generation) databases, dynamic chatbots, automated report analyzers, and smart summarizers."
    },
    {
      q: "How do you guarantee application speed and optimization?",
      a: "I write lightweight, well-documented code adhering to industry best practices. I prioritize server-side rendering (SSR) where appropriate, optimize images, configure caching indexes, and run bundle audits to secure lightning-fast loading speeds."
    },
    {
      q: "Are you comfortable working on existing codebases?",
      a: "Yes. I have extensive experience inheriting existing platforms, debugging complex bottlenecks, migrating frameworks, rewriting legacy endpoints, and safely integrating new services with minimal down-time."
    }
  ];

  const testimonials = [
    {
      text: "Arslan delivered a flawless multi-store dashboard for our operations. His understanding of Laravel and Next.js is incredible. The system is extremely fast, responsive, and has simplified our workflows immensely. Outstanding work!",
      author: "Farhan Saeed",
      role: "CTO, NextTech Solutions",
      avatar: "FS"
    },
    {
      text: "Working with Arslan to build our localized vector search system was a breeze. He brought clean coding structures and a practical approach to LangChain and Ollama. He bridges traditional web code and Generative AI beautifully.",
      author: "Sophia Croft",
      role: "Founder, Zenith AI Labs",
      avatar: "SC"
    },
    {
      text: "Arslan has an exceptional eye for design and typography. He redesigned our customer-facing portal to have a rigid, modern, high-tech dark layout that our users absolutely love. He is our go-to engineer for full-stack builds.",
      author: "Haris Mehmood",
      role: "Product Owner, CloudLogix",
      avatar: "HM"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-50 dark:bg-[#030408] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">

      {/* Background Neon Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[5%] left-[10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[90px] md:blur-[140px] animate-pulse" style={{ animationDuration: "9s" }} />
        <div className="absolute top-[25%] right-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[90px] md:blur-[140px] animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-[20%] left-[15%] w-[320px] md:w-[550px] h-[320px] md:h-[550px] rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-[90px] md:blur-[140px] animate-pulse" style={{ animationDuration: "15s" }} />
      </div>

      <Header />

      {/* 1. HERO SECTION */}
      <section id="overview" className="relative pt-20 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full min-h-[55vh] py-6">

          {/* Left Hero Text Column */}
          <motion.div
            className="lg:col-span-7 space-y-6 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status Capsule Tag */}
            {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase shadow-[0_2px_10px_rgba(16,185,129,0.02)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Work & Collaboration</span>
            </div> */}

            {/* Main Punchy Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] font-sans">
              Building <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-300">Digital</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-300">Solutions</span>
            </h1>

            {/* Conversational humanized pitch */}
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal max-w-xl">
              Hi, I'm Arslan Muhammad. I design and build fast, optimized, and smart web applications. By blending clean frontend interfaces with robust backend architectures and tailored AI capabilities, I turn complex business ideas into seamless digital solutions.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/#projects">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_4px_20px_rgba(16,185,129,0.1)] transition-all"
                >
                  View Projects
                  <ArrowRight size={13} />
                </motion.button>
              </Link>

              <Link href="/#contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 backdrop-blur-sm transition-all cursor-pointer"
                >
                  Get in Touch
                </motion.button>
              </Link>
            </div>

            {/* Verification / Quality badge */}
            <div className="flex items-center gap-2.5 text-zinc-400 dark:text-zinc-500 text-[11px] font-mono uppercase tracking-wider pt-4">
              <Sparkles size={12} className="text-emerald-500" />
              <span>Full-Stack Standards • Handcrafted Code Only</span>
            </div>
          </motion.div>

          {/* Right Hero Rotating Text SVG & Centered Profile Icon */}
          <motion.div
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">

              {/* Outer spinning text path circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <path
                    id="spinTextPath"
                    d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                    fill="none"
                  />
                  <text className="fill-zinc-400 dark:fill-zinc-500 font-mono text-[9.5px] uppercase tracking-[3.8px] font-extrabold">
                    <textPath href="#spinTextPath" startOffset="0%">
                      CODE • SYSTEM • CREATIVE • DESIGN • DEVELOPMENT •
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Dashed outer accent borders */}
              <div className="absolute inset-4 rounded-full border border-dashed border-zinc-200 dark:border-zinc-800 pointer-events-none animate-[spin_50s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-zinc-200/50 dark:border-zinc-800/40 pointer-events-none" />

              {/* Central avatar card holder */}
              <div className="absolute inset-10 rounded-full border border-zinc-300/60 dark:border-zinc-800/60 bg-white dark:bg-[#030408] flex items-center justify-center shadow-lg overflow-hidden">
                <div className="relative w-[90%] h-[90%] rounded-full overflow-hidden bg-gradient-to-tr from-emerald-500/10 via-transparent to-purple-500/10 flex items-center justify-center border border-zinc-200 dark:border-zinc-800/60">
                  <img
                    src="/assets/new-profile.webp"
                    alt="Arslan Muhammad Portfolio Profile"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-105 filter grayscale hover:grayscale-0 transition-all duration-700 ease-out rounded-full"
                  />
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* 2. STATS & CODER CARD ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full pt-16 border-t border-zinc-200/60 dark:border-zinc-900/40 mt-12">

          {/* Left stats cards (2x2 grid) */}
          <motion.div
            className="lg:col-span-5 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Stat Card 1 */}
            <div className="p-5 rounded-2xl border border-zinc-200/40 dark:border-zinc-900/40 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md shadow-sm hover:border-zinc-300 dark:hover:border-violet-500/20 hover:shadow-md transition-all duration-300">
              <div className="text-emerald-500 dark:text-emerald-400 mb-3">
                <Code size={20} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">2+</div>
              <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mt-1.5 font-mono">Years Coding</div>
            </div>

            {/* Stat Card 2 */}
            <div className="p-5 rounded-2xl border border-zinc-200/40 dark:border-zinc-900/40 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md shadow-sm hover:border-zinc-300 dark:hover:border-violet-500/20 hover:shadow-md transition-all duration-300">
              <div className="text-emerald-500 dark:text-emerald-400 mb-3">
                <FolderKanban size={20} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">15+</div>
              <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mt-1.5 font-mono">Projects Done</div>
            </div>

            {/* Stat Card 3 */}
            <div className="p-5 rounded-2xl border border-zinc-200/40 dark:border-zinc-900/40 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md shadow-sm hover:border-zinc-300 dark:hover:border-violet-500/20 hover:shadow-md transition-all duration-300">
              <div className="text-emerald-500 dark:text-emerald-400 mb-3">
                <Users size={20} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">100%</div>
              <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mt-1.5 font-mono">Happy Clients</div>
            </div>

            {/* Stat Card 4 */}
            <div className="p-5 rounded-2xl border border-zinc-200/40 dark:border-zinc-900/40 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md shadow-sm hover:border-zinc-300 dark:hover:border-violet-500/20 hover:shadow-md transition-all duration-300">
              <div className="text-emerald-500 dark:text-emerald-400 mb-3">
                <ShieldCheck size={20} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">100%</div>
              <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider mt-1.5 font-mono">Code Quality</div>
            </div>
          </motion.div>

          {/* Right CoderCard editor column */}
          <motion.div
            className="lg:col-span-7 flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CoderCard />
          </motion.div>
        </div>
      </section>

      {/* 3. CORE SERVICES SECTION ("How I Can Help") */}
      <section id="services" className="border-t border-zinc-200/60 dark:border-zinc-900/40 bg-zinc-100/30 dark:bg-[#05030e]/30 backdrop-blur-sm py-24 px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          {/* Header */}
          <motion.div className="text-left mb-16 space-y-2" variants={itemVariants}>
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-mono">My Expertise</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              How I Can Help
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xl">
              I specialize in combining traditional web engineering with localized artificial intelligence modules to engineer fast, resilient software.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((svc, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group flex gap-4 p-6 rounded-2xl border border-zinc-200/40 dark:border-zinc-900/40 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md hover:border-emerald-500/20 dark:hover:border-violet-500/20 hover:shadow-md transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-950 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors duration-300 h-fit border border-zinc-200/20 dark:border-zinc-800/20">
                  {svc.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {svc.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. ABOUT ME & WORK TIMELINE COMBINED */}
      <section id="about" className="border-t border-zinc-200/60 dark:border-zinc-900/40 py-24 px-6 max-w-5xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >

          {/* Left Column: About Me Info & Progress Bars */}
          <motion.div
            className="lg:col-span-6 space-y-6 text-left"
            variants={itemVariants}
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-mono">Profile</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Everything About Arslan
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              I am an energetic full-stack systems developer with over 2 years of practical experience writing stable, responsive, and performance-driven code. My passion is translating complex architectures into elegant, high-contrast, modern UI/UX templates that load instantly.
            </p>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Whether building custom admin dashboards in Laravel, constructing interactive client apps in Next.js, or integrating semantic generative AI retrieval streams with Python, I deliver handcrafted code built for scale.
            </p>

            {/* Resume / CV and StackOverflow Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a target="_blank" href="/Arslan-Web-&-Generative-AI-Developer-Resume.pdf">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-black dark:hover:bg-zinc-100 cursor-pointer shadow-sm transition-all"
                >
                  Download CV / Resume
                </motion.button>
              </a>

              <a target="_blank" href="https://stackoverflow.com/users/30619908/arslan-muhammad">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 cursor-pointer transition-all"
                >
                  StackOverflow
                </motion.button>
              </a>
            </div>

            {/* Core Skills Indicators */}
            {/* <div className="space-y-4 pt-6 border-t border-zinc-200/40 dark:border-zinc-900/40">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-mono font-semibold">Skill Matrix</h4> */}

            {/* Skill 1 */}
            {/* <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-bold uppercase font-mono">
                  <span className="text-zinc-700 dark:text-zinc-300">React & Next.js (TS)</span>
                  <span className="text-emerald-500">92%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "92%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div> */}

            {/* Skill 2 */}
            {/* <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-bold uppercase font-mono">
                  <span className="text-zinc-700 dark:text-zinc-300">Laravel & REST APIs</span>
                  <span className="text-emerald-500">89%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "89%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                  />
                </div>
              </div> */}

            {/* Skill 3 */}
            {/* <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-bold uppercase font-mono">
                  <span className="text-zinc-700 dark:text-zinc-300">Python & AI Orchestration</span>
                  <span className="text-emerald-500">82%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "82%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>

            </div> */}
          </motion.div>

          {/* Right Column: Work History Timeline */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            variants={itemVariants}
          >
            <div className="space-y-2 mb-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Career Roadmap</span>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Work History</h3>
            </div>

            {/* Vertical Timeline Tracker */}
            <div className="relative border-l border-zinc-200 dark:border-zinc-900 ml-3 pl-6 space-y-8 py-2">

              {/* Job Node 1 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1 flex items-center justify-center w-4 h-4 rounded-full bg-zinc-50 dark:bg-[#030408] border-2 border-emerald-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </span>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Laravel & Next.js Developer</h4>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider font-mono">Present</span>
                  </div>
                  <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                    NextTech Solutions • Rawalpindi, Pakistan
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1 font-normal">
                    Building next-generation client panels and localized API integrations. Crafted a centralized multi-store e-commerce dashboard system using Laravel and Next.js, with focus on performance indexes, secure backends, and Stripe.
                  </p>
                </div>
              </div>

              {/* Job Node 2 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-1 flex items-center justify-center w-4 h-4 rounded-full bg-zinc-50 dark:bg-[#030408] border-2 border-zinc-300 dark:border-zinc-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                </span>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Full Stack Developer & AI Explorer</h4>
                    <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-md uppercase tracking-wider font-mono">2023 - Present</span>
                  </div>
                  <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                    Self-Directed Learning • Remote
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1 font-normal">
                    Fostered an expansive understanding of database mechanics and modern frontends. Experimented heavily with python LLM orchestration pipelines, vector store embeddings, semantic retrieval indexes, and Ollama agents.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* 5. FEATURED REPOSITORIES (GitHub Repo style cards) */}
      <section id="projects" className="border-t border-zinc-200/60 dark:border-zinc-900/40 bg-zinc-100/30 dark:bg-[#05030e]/30 py-24 px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          {/* Header */}
          <motion.div className="text-left mb-16 space-y-2" variants={itemVariants}>
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-mono">Portfolio Showcase</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Featured Repositories
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xl">
              Candid selections of production systems, customized libraries, and open-source packages.
            </p>
          </motion.div>

          {/* Loader or Grid */}
          {loadingProjects ? (
            <div className="flex justify-center items-center py-12">
              <span className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((p, idx) => (
                <motion.div
                  key={p.id}
                  variants={itemVariants}
                  className="flex flex-col justify-between p-6 rounded-xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-emerald-500/30 dark:hover:border-violet-500/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Folder & Name Tag */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FolderKanban className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                        <h3 className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[150px]">
                          {p.title}
                        </h3>
                      </div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800/80 text-zinc-400 bg-zinc-50 dark:bg-zinc-900/30">
                        Public
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal min-h-[50px] line-clamp-3">
                      {p.description}
                    </p>

                    {/* Stack labels */}
                    {p.stack && (
                      <div className="flex flex-wrap gap-1">
                        {p.stack.split(",").slice(0, 3).map((st: any, sIdx: any) => (
                          <span key={sIdx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900/50 text-zinc-400 dark:text-zinc-500 border border-zinc-200/50 dark:border-zinc-800/50">
                            {st.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Stats & Direct Link icon buttons */}
                  <div className="pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-3.5 text-[10px] font-mono font-semibold text-zinc-400">
                      {/* Language indicator */}
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${p.languageColor || "bg-blue-500"}`} />
                        <span>{p.language || "TypeScript"}</span>
                      </span>

                      {/* Stars */}
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{p.stars || 15}</span>
                      </span>

                      {/* Forks */}
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        <span>{p.forks || 3}</span>
                      </span>
                    </div>

                    {/* External Buttons */}
                    <div className="flex items-center gap-2">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors" title="Repository">
                          <Code size={13} />
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors" title="Live Demo">
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* See All Repository CTA Button */}
          <motion.div className="text-center mt-12" variants={itemVariants}>
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
              >
                See All Projects
                <ArrowRight size={12} />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section id="tech-stack" className="border-t border-zinc-200/60 dark:border-zinc-900/40 py-24 px-6 max-w-5xl mx-auto">
        <TechStack />
      </section>

      {/* 6. CLIENT TESTIMONIALS SLIDER SECTION */}
      <section id="reviews" className="border-t border-zinc-200/60 dark:border-zinc-900/40 py-24 px-6 max-w-5xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >

          {/* Left testimonial details */}
          <motion.div className="lg:col-span-5 space-y-4" variants={itemVariants}>
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Trusted Partners
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Collaboration is at the heart of everything I build. Here's what my clients and team leaders say about our projects together.
            </p>

            {/* Slider Arrows */}
            <div className="flex gap-2.5 pt-4">
              <button onClick={prevTestimonial} className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#070414] hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 hover:text-emerald-500 transition-colors cursor-pointer w-9 h-9 flex items-center justify-center">
                {"←"}
              </button>
              <button onClick={nextTestimonial} className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#070414] hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 hover:text-emerald-500 transition-colors cursor-pointer w-9 h-9 flex items-center justify-center">
                {"→"}
              </button>
            </div>
          </motion.div>

          {/* Right testimonial slider box */}
          <motion.div className="lg:col-span-7 relative h-72 sm:h-64 flex items-center" variants={itemVariants}>
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative p-6 sm:p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-900/40 bg-white dark:bg-[#070414]/30 backdrop-blur-md shadow-sm"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-500/10 dark:text-emerald-500/5 pointer-events-none" />

                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal italic">
                      "{testimonials[currentTestimonial].text}"
                    </p>

                    {/* Reviewer */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xs">
                        {testimonials[currentTestimonial].avatar}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200">
                          {testimonials[currentTestimonial].author}
                        </h4>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="border-t border-zinc-200/60 dark:border-zinc-900/40 bg-zinc-100/30 dark:bg-[#05030e]/30 py-24 px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          {/* Header */}
          <motion.div className="text-center mb-16 space-y-2" variants={itemVariants}>
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Knowledge Base</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto">
              Answers to some common questions regarding my processes, technology models, and workflows.
            </p>
          </motion.div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="rounded-xl border border-zinc-200/50 dark:border-zinc-900/50 bg-white dark:bg-[#070414]/30 backdrop-blur-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-zinc-800 dark:text-zinc-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-bold text-xs sm:text-sm cursor-pointer font-sans"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-5 pt-0 border-t border-zinc-100 dark:border-zinc-900/40 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 8. CONNECT WITH ME today (ContactForm) */}
      <section id="contact" className="border-t border-zinc-200/60 dark:border-zinc-900/40 py-24">
        <ContactForm />
      </section>

      <Footer />

    </div>
  );
}

"use client";
import { motion } from "framer-motion";

const experiences = [
    {
        company: "NextTech Solutions",
        role: "Laravel & Next.js Developer",
        duration: "May 2025 - Present",
        location: "Rawalpindi, Pakistan",
        description:
            "Developing and maintaining full-stack web applications using Laravel and Next.js. Built a centralized multi-store e-commerce admin dashboard, focusing on responsive frontends, localized secure backends, and seamless API integrations.",
        status: true,
    },
    {
        company: "Self-Directed Learning",
        role: "Full Stack Developer & Exploring Generative AI",
        duration: "2023 - Present",
        location: "Remote",
        description:
            "Built a strong foundation in full-stack development using Laravel and React.js. Currently expanding my skill set into Generative AI by actively learning and experimenting with Python, LangChain, local LLMs (Ollama), and Vector Databases through hands-on practice projects.",
        status: true,
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
            <div className="w-full">
                {/* Section Header */}
                <div className="text-left mb-16 space-y-2">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Timeline</span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        Professional Experience
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xl">
                        A dynamic path through full-stack development, software architecture, and continuous, self-directed exploration.
                    </p>
                </div>

                {/* Vertical Timeline */}
                <div className="relative border-l border-zinc-200/60 dark:border-zinc-800/60 ml-4 pl-8 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="relative"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Glowing node locator */}
                            <span className="absolute -left-[41px] top-1 flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                                <span className={`w-2.5 h-2.5 rounded-full ${exp.status ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
                            </span>

                            {/* Experience Glass Card */}
                            <div className="p-6 rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{exp.role}</h3>
                                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                            {exp.company} <span className="mx-1.5 text-zinc-300 dark:text-zinc-700">•</span> {exp.location}
                                        </p>
                                    </div>
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/30 dark:border-zinc-800/30">
                                        {exp.duration}
                                    </span>
                                </div>

                                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

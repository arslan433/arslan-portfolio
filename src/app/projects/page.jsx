"use client";

import { useEffect, useState, Suspense } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, Github } from "lucide-react";
import { motion } from "framer-motion";

import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ProjectsDisplayContent() {
    const searchParams = useSearchParams();
    const sort = searchParams.get("sort") || "desc";
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, "projects"),
            orderBy("createdAt", sort)
        );

        const unsub = onSnapshot(q, (snapshot) => {
            setProjects(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
            setLoading(false);
        });

        return () => unsub();
    }, [sort]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-100 pb-12">
            {/* Ambient glass background glow blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[10%] left-[5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[80px] md:blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute top-[30%] right-[5%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] md:blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
            </div>

            <Header />

            {/* Hero Section */}
            <section className="pt-36 pb-12 px-6 max-w-5xl mx-auto">
                <div className="text-left space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase">
                        <span>Showcase</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        Featured Projects
                    </h1>

                    <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                        A curation of projects built throughout my development journey. These include production-ready applications, open-source utilities, and complex systems built with Next.js, React, Laravel, and Firebase.
                    </p>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Want to explore the complete repository list?
                        <Link
                            href="https://github.com/arslan433"
                            target="_blank"
                            className="font-semibold ml-1.5 hover:text-emerald-500 underline underline-offset-4 transition-colors"
                        >
                            Visit my GitHub
                        </Link>
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-24 px-6 max-w-5xl mx-auto">
                <div>
                    {projects.length === 0 ? (
                        <div className="text-center py-24 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/10 dark:bg-zinc-900/5 backdrop-blur-sm">
                            <p className="text-zinc-500 text-sm">
                                No projects published yet. Check back soon!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {projects.map((p, index) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.05,
                                    }}
                                    whileHover={{
                                        y: -6,
                                    }}
                                    className="group flex flex-col justify-between h-full rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white/30 dark:bg-zinc-950/30 backdrop-blur-[12px] shadow-xl hover:shadow-2xl hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="p-6 sm:p-8 flex flex-col h-full justify-between">
                                        <div className="space-y-4">
                                            {/* Title */}
                                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                {p.title}
                                            </h2>

                                            {/* Description */}
                                            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal">
                                                {p.description}
                                            </p>

                                            {/* Tech Stack */}
                                            {p.stack && (
                                                <div className="flex flex-wrap gap-1.5 pt-2">
                                                    {p.stack
                                                        .split(",")
                                                        .map((tech, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-2 py-0.5 rounded-md text-[10px] font-semibold border border-zinc-200/30 dark:border-zinc-800/30 bg-zinc-100/50 dark:bg-zinc-900/20 text-zinc-500 dark:text-zinc-400"
                                                            >
                                                                {tech.trim()}
                                                            </span>
                                                        ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-3 mt-8">
                                            {p.github && (
                                                <Link
                                                    href={p.github}
                                                    target="_blank"
                                                    className="flex-1"
                                                >
                                                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer">
                                                        <Github size={14} />
                                                        GitHub
                                                    </button>
                                                </Link>
                                            )}

                                            {p.live && (
                                                <Link
                                                    href={p.live}
                                                    target="_blank"
                                                    className="flex-1"
                                                >
                                                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-all cursor-pointer">
                                                        <Eye size={14} />
                                                        Live Demo
                                                    </button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default function ProjectsDisplay() {
    return (
        <Suspense fallback={<Loader />}>
            <ProjectsDisplayContent />
        </Suspense>
    );
}
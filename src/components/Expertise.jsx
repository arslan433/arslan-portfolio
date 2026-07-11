"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Expertise() {
  const skills = [
    { name: "React", src: "/assets/react.webp" },
    { name: "Next.js", src: "/assets/next.webp", invert: true },
    { name: "Laravel", src: "/assets/laravel.webp" },
    { name: "Firebase", src: "/assets/firebase.webp" },
    { name: "SQL", src: "/assets/sql.webp", invert: true },
    { name: "Tailwind", src: "/assets/tailwind.webp" },
    { name: "Bootstrap", src: "/assets/bootstrap.webp" },
    { name: "WordPress", src: "/assets/wordpress.webp" },
  ];

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="w-full">
        {/* Left-Aligned Elegant Section Header */}
        <div className="text-left mb-12 space-y-2">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Expertise</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Core Technologies
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xl">
            A handpicked selection of platforms and frameworks that I use daily to build highly-optimized and scalable applications.
          </p>
        </div>

        {/* Beautiful Glass Tech Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 justify-items-stretch">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:shadow-[0_8px_30px_rgb(16,185,129,0.05)] hover:-translate-y-1 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative"
              >
                <Image
                  src={skill.src}
                  alt={skill.name}
                  width={40}
                  height={40}
                  unoptimized
                  id={skill.invert ? "imginvert" : undefined}
                  className="transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full bg-emerald-500/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
              <h4 className="text-xs font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 transition-colors">
                {skill.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

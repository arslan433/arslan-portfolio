'use client';

import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';

export default function CoderCard() {
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="w-full max-w-lg">
      <div className="relative group rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-emerald-500/5 transition-all duration-300">
        {/* Top bar simulating a code editor window */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/70" />
            <div className="w-3 h-3 rounded-full bg-amber-500/70" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[11px] font-mono tracking-wider text-zinc-400 dark:text-zinc-500">developer.ts</span>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Editor Body */}
        <div className="p-6 sm:p-8 font-mono text-[13px] leading-relaxed select-none overflow-x-auto h-101">
          <div className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
            <Typewriter
              options={{
                delay: 8,
                cursor: '▋',
                autoStart: true,
                loop: false,
              }}
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(300)
                  .typeString(
                    `<span class="text-indigo-500 dark:text-indigo-400">const</span> <span class="text-teal-500 dark:text-teal-400">developer</span> <span class="text-zinc-400">=</span> <span class="text-amber-500 dark:text-amber-400">{</span><br>` +
                    `  <span class="text-rose-500 dark:text-rose-400">name</span>: <span class="text-emerald-600 dark:text-emerald-400">'Arslan Muhammad'</span>,<br>` +
                    `  <span class="text-rose-500 dark:text-rose-400">role</span>: <span class="text-emerald-600 dark:text-emerald-400">'Full Stack Web and GenAI Developer'</span>,<br>` +
                    `  <span class="text-rose-500 dark:text-rose-400">skills</span>: [<br>` +
                    `    <span class="text-emerald-600 dark:text-emerald-400">'Laravel'</span>, <span class="text-emerald-600 dark:text-emerald-400">'Next.js'</span>, <span class="text-emerald-600 dark:text-emerald-400">'React.js'</span>,<br>` +
                    `    <span class="text-emerald-600 dark:text-emerald-400">'React Native'</span>, <span class="text-emerald-600 dark:text-emerald-400">'MySQL'</span>, <span class="text-emerald-600 dark:text-emerald-400">'MongoDB'</span>,<br>` +
                    `    <span class="text-emerald-600 dark:text-emerald-400">'Python'</span>, <span class="text-emerald-600 dark:text-emerald-400">'LangChain'</span>, <span class="text-emerald-600 dark:text-emerald-400">'RAG'</span><br>` +
                    `  ],<br>` +
                    `  <span class="text-rose-500 dark:text-rose-400">adaptive</span>: <span class="text-amber-500 dark:text-amber-400">true</span>,<br>` +
                    `  <span class="text-rose-500 dark:text-rose-400">hireable</span>() <span class="text-amber-500 dark:text-amber-400">{</span><br>` +
                    `    <span class="text-indigo-500 dark:text-indigo-400">return</span> <span class="text-rose-500 dark:text-rose-400">this</span>.<span class="text-teal-500 dark:text-teal-400">skills</span>.<span class="text-indigo-500 dark:text-indigo-400">length</span> <span class="text-zinc-400">=</span> <span class="text-amber-600 dark:text-amber-500">10+</span>;<br>` +
                    `  <span class="text-amber-500 dark:text-amber-400">}</span><br>` +
                    `<span class="text-amber-500 dark:text-amber-400">}</span>;`
                  )
                  .callFunction(() => {
                    setTimeout(() => setShowResult(true), 600);
                  })
                  .start();
              }}
            />
          </div>

          {showResult && (
            <div className="mt-6 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50 animate-fade-in">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                developer.hireable() <span className="text-zinc-400">{"=>"}</span> true
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
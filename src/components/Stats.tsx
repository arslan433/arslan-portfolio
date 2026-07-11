import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) ref.current.textContent = String(latest);
    });
  }, [rounded]);

  return <span ref={ref} />;
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16"> 
      {/* Box 1 */}
      <div className="text-center rounded-2xl border border-zinc-200/30 dark:border-zinc-800/30 bg-white/10 dark:bg-zinc-900/5 p-6 backdrop-blur-sm"> 
        <h4 className="text-3xl font-bold text-zinc-900 dark:text-white">
          {isInView ? <Counter value={30} /> : "0"}+
        </h4> 
        <p className="text-xs tracking-wider uppercase text-zinc-500 mt-1">Technologies</p> 
      </div> 

      {/* Box 2 */}
      <div className="text-center rounded-2xl border border-zinc-200/30 dark:border-zinc-800/30 bg-white/10 dark:bg-zinc-900/5 p-6 backdrop-blur-sm"> 
        <h4 className="text-3xl font-bold text-zinc-900 dark:text-white">
          {isInView ? <Counter value={2} /> : "0"}+
        </h4> 
        <p className="text-xs tracking-wider uppercase text-zinc-500 mt-1">Years Experience</p> 
      </div> 

      {/* Box 3 */}
      <div className="text-center rounded-2xl border border-zinc-200/30 dark:border-zinc-800/30 bg-white/10 dark:bg-zinc-900/5 p-6 backdrop-blur-sm"> 
        <h4 className="text-3xl font-bold text-zinc-900 dark:text-white">
          {isInView ? <Counter value={15} /> : "0"}+
        </h4> 
        <p className="text-xs tracking-wider uppercase text-zinc-500 mt-1">Projects Built</p> 
      </div> 
    </div>
  );
}

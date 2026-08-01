import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { allPrizes, type Prize } from "@/lib/prizes";
import { tick } from "@/lib/celebrate";
import { Particles } from "./Particles";

const SEQUENCE_MS = 4200;

export function SpinStage({ onComplete }: { onComplete: (p: Prize) => void }) {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"fast" | "slow">("fast");
  const targetRef = useRef(Math.floor(Math.random() * allPrizes.length));

  useEffect(() => {
    const start = Date.now();
    let timer: ReturnType<typeof setTimeout>;
    let i = Math.floor(Math.random() * allPrizes.length);

    const step = () => {
      const t = Math.min((Date.now() - start) / SEQUENCE_MS, 1);
      const delay = 55 + Math.pow(t, 3.2) * 520;
      if (t > 0.55) setPhase("slow");
      i = (i + 1) % allPrizes.length;
      setCurrent(i);
      tick(520 + (i % 6) * 90, 0.04, 0.035);

      if (t >= 1 && i === targetRef.current) {
        setTimeout(() => onComplete(allPrizes[targetRef.current]), 700);
        return;
      }
      timer = setTimeout(step, delay);
    };
    timer = setTimeout(step, 80);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const prize = allPrizes[current];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.5 }}
      className="surface-hero relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5"
    >
      <Particles density={70} />
      <div className="grid-floor pointer-events-none absolute inset-0" />

      {/* light streaks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(7)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-px w-[60vw] bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ top: `${12 + i * 12}%` }}
            initial={{ x: "-70vw", opacity: 0 }}
            animate={{ x: "120vw", opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="relative z-10 mb-8 text-xs uppercase tracking-[0.42em] text-primary"
      >
        {phase === "fast" ? "Locking your chase" : "Selecting reward"}
      </motion.p>

      <motion.div
        animate={{ scale: phase === "fast" ? [1, 1.03, 1] : 1.06 }}
        transition={{ duration: 0.6, repeat: phase === "fast" ? Infinity : 0 }}
        className="glass relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] glow-red"
      >
        <motion.div
          key={prize.id + current}
          initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: phase === "fast" ? 0.12 : 0.35 }}
        >
          <img
            src={prize.image}
            alt={prize.name}
            width={1024}
            height={768}
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="space-y-1 p-6 text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-primary">{prize.tagline}</p>
            <h2 className="font-display text-3xl">{prize.name}</h2>
          </div>
        </motion.div>
        <div className="sheen pointer-events-none absolute inset-0" />
      </motion.div>
    </motion.section>
  );
}

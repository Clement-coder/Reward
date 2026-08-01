import { useEffect } from "react";
import { motion } from "motion/react";
import { Trophy, Sparkles } from "lucide-react";
import type { Prize } from "@/lib/prizes";
import { celebrate, fanfare } from "@/lib/celebrate";
import { Particles } from "./Particles";

export function WinScreen({ prize, onClaim }: { prize: Prize; onClaim: () => void }) {
  useEffect(() => {
    void celebrate();
    fanfare();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 1.08 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="surface-hero relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-20"
    >
      <Particles density={90} />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.3, 0.75, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="pointer-events-none absolute left-1/2 top-1/4 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]"
      />

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.15 }}
        className="relative z-10 grid h-20 w-20 place-items-center rounded-3xl glass animate-glow"
      >
        <Trophy className="h-9 w-9" style={{ color: "var(--gold)" }} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="relative z-10 mt-6 text-center text-4xl sm:text-6xl"
      >
        🎉 <span className="text-gradient-red">Congratulations!</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-3 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        Your chase unlocked
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.45, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        className="glass relative z-10 mt-10 w-full max-w-md overflow-hidden rounded-[2rem] glow-red animate-float"
      >
        <img
          src={prize.image}
          alt={prize.name}
          width={1024}
          height={768}
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="space-y-2 p-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-primary">{prize.tagline}</p>
          <h2 className="font-display text-3xl">{prize.name}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{prize.description}</p>
        </div>
        <div className="sheen pointer-events-none absolute inset-0" />
      </motion.div>

      {/* floating sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute z-10"
          style={{ left: `${8 + i * 11}%`, top: `${25 + ((i * 37) % 55)}%`, color: "var(--gold)" }}
          animate={{ y: [-14, 14, -14], opacity: [0.2, 1, 0.2], rotate: [0, 90, 0] }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        >
          <Sparkles className="h-4 w-4" />
        </motion.span>
      ))}

      <motion.button
        onClick={onClaim}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="sheen relative z-10 mt-10 rounded-full px-10 py-5 font-display text-base uppercase tracking-[0.18em] text-primary-foreground animate-glow"
        style={{ background: "var(--gradient-red)" }}
      >
        Claim Reward
      </motion.button>
    </motion.section>
  );
}

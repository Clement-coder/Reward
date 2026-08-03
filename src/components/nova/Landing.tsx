import { motion } from "motion/react";
import { ChevronRight, ShieldCheck, Gauge, Gift } from "lucide-react";
import { Particles } from "./Particles";
import { PrizeCard } from "./PrizeCard";
import { cashPrizes, vehiclePrizes } from "@/lib/prizes";
import logoSrc from "@/assets/logo.png";

export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2"
          >
            <span className="grid h-8 w-8 place-items-center glass overflow-hidden glow-red">
              <img src={logoSrc} alt="Nova Chase" className="h-full w-full object-contain" />
            </span>
            <span className="font-display text-lg tracking-[0.22em] uppercase">Nova Chase</span>
          </motion.div>
          <span className="hidden text-[11px] uppercase tracking-[0.28em] text-muted-foreground sm:block">
            Promotional Experience
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="surface-hero relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-24">
        <Particles density={80} />
        <div className="grid-floor pointer-events-none absolute inset-0" />
        <motion.div
          aria-hidden
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/25 blur-[130px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          {/* Hero Logo — glassmorphism frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
            className="relative mx-auto mb-8 h-36 w-36 animate-float"
          >
            {/* Outer glow ring */}
            <motion.div
              aria-hidden
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.92, 1.06, 0.92] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0 rounded-[2rem] bg-primary/30 blur-[28px]"
            />
            {/* Glass card */}
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] glass animate-glow p-3">
              {/* Inner subtle gradient overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[2rem]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(1 0 0 / 0.12) 0%, transparent 50%, oklch(0.57 0.226 26.5 / 0.12) 100%)",
                }}
              />
              <img
                src={logoSrc}
                alt="Nova Chase logo"
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_2px_18px_oklch(0.62_0.24_27/0.7)]"
              />
            </div>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 px-4 py-1.5 text-[11px] uppercase tracking-[0.24em] text-primary backdrop-blur-md"
          >
            Invitation-only campaign
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="mt-6 text-balance text-5xl leading-[1.03] sm:text-7xl"
          >
            <span className="text-gradient-red">Chase Luxury.</span>
            <br />
            Unlock Incredible Rewards.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground"
          >
            Spin for a chance to unlock cash prizes or luxury vehicles in our interactive
            promotional experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex justify-center"
          >
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="sheen group relative inline-flex items-center gap-3 rounded-full px-9 py-5 font-display text-base uppercase tracking-[0.18em] text-primary-foreground animate-glow"
              style={{ background: "var(--gradient-red)" }}
            >
              Start Your Chase
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            <li className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary" /> Instant reveal
            </li>
            <li className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-primary" /> 6 reward tiers
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Verified process
            </li>
          </motion.ul>
        </div>
      </section>

      {/* CASH */}
      <section className="relative px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Cash Rewards" title="Liquid, immediate, life-changing." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cashPrizes.map((p, i) => (
              <PrizeCard key={p.id} prize={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* VEHICLES */}
      <section className="relative px-5 pb-28">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Luxury Vehicles" title="Electric icons on the line." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehiclePrizes.map((p, i) => (
              <PrizeCard key={p.id} prize={p} index={i} />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-primary/40 px-8 py-4 font-display text-sm uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Start Your Chase
            </motion.button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-10 text-center text-xs leading-relaxed text-muted-foreground">
        Nova Chase is an interactive promotional experience. Prize visuals are illustrative and do
        not guarantee an award. Eligibility verification and promotional terms apply.
      </footer>
    </motion.div>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="text-center"
    >
      <p className="text-[11px] uppercase tracking-[0.34em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl sm:text-5xl">{title}</h2>
    </motion.div>
  );
}

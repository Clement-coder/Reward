import { motion } from "motion/react";
import type { Prize } from "@/lib/prizes";

export function PrizeCard({ prize, index = 0 }: { prize: Prize; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
      className="glass group relative overflow-hidden rounded-3xl [transform-style:preserve-3d]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={prize.image}
          alt={prize.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-primary/40 bg-background/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary backdrop-blur-md">
          {prize.tagline}
        </span>
      </div>
      <div className="relative space-y-2 p-6">
        <h3 className="font-display text-2xl">{prize.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{prize.description}</p>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:glow-red" />
    </motion.article>
  );
}

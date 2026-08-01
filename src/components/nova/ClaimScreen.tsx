import { useMemo } from "react";
import { motion } from "motion/react";
import { MessageCircle, Mail, Send, Phone, Headphones, RotateCcw } from "lucide-react";
import type { Prize } from "@/lib/prizes";
import { makeReference } from "@/lib/prizes";
import { Particles } from "./Particles";

const WHATSAPP_NUMBER = "10000000000";

export function ClaimScreen({ prize, onRestart }: { prize: Prize; onRestart: () => void }) {
  const reference = useMemo(() => makeReference(), []);
  const stamp = useMemo(
    () =>
      new Date().toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    [],
  );

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Nova Chase support, I would like to request promotional verification for my reward.\n\nPrize: ${prize.name}\nReference: ${reference}\nDate: ${stamp}`,
  )}`;

  const options = [
    { label: "WhatsApp", note: "Fastest response", icon: MessageCircle, href: waLink },
    { label: "Live Chat", note: "Available 24/7", icon: Headphones, href: "#live-chat" },
    { label: "Email", note: "support@novachase.example", icon: Mail, href: "mailto:support@novachase.example" },
    { label: "Telegram", note: "@novachase", icon: Send, href: "https://t.me/novachase" },
    { label: "Phone Support", note: "+1 (000) 000-0000", icon: Phone, href: "tel:+10000000000" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className="surface-hero relative min-h-[100svh] overflow-hidden px-5 py-20"
    >
      <Particles density={50} />

      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="text-center text-[11px] uppercase tracking-[0.34em] text-primary">
          Reward Claim
        </p>
        <h1 className="mt-3 text-center text-4xl sm:text-5xl">Your reward file</h1>

        <div className="glass mt-10 overflow-hidden rounded-[2rem]">
          <div className="grid md:grid-cols-2">
            <img
              src={prize.image}
              alt={prize.name}
              loading="lazy"
              width={1024}
              height={768}
              className="h-full max-h-72 w-full object-cover md:max-h-none"
            />
            <div className="space-y-4 p-7">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-primary">
                  {prize.tagline}
                </p>
                <h2 className="font-display text-3xl">{prize.name}</h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{prize.description}</p>
              <dl className="grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Reference
                  </dt>
                  <dd className="font-display text-primary">{reference}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Date &amp; Time
                  </dt>
                  <dd className="font-display">{stamp}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Thank you for participating in Nova Chase. To continue with the promotional verification
          process, please contact our support team using one of the options below. Eligibility
          verification and promotional terms apply.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((o, i) => (
            <motion.a
              key={o.label}
              href={o.href}
              target={o.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="glass group relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 transition-shadow hover:glow-red"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary transition-transform duration-500 group-hover:scale-110">
                <o.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-base">{o.label}</span>
                <span className="block text-xs text-muted-foreground">{o.note}</span>
              </span>
              <span className="pointer-events-none absolute inset-0 scale-0 rounded-2xl bg-primary/10 opacity-0 transition-all duration-700 group-hover:scale-150 group-hover:opacity-100" />
            </motion.a>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" /> Back to Nova Chase
          </button>
        </div>

        <p className="mt-10 text-center text-[11px] leading-relaxed text-muted-foreground">
          This is a promotional experience. Participation does not guarantee a prize.
        </p>
      </div>
    </motion.section>
  );
}

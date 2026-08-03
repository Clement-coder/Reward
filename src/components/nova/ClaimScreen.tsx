import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { MessageCircle, Send, Mail, Phone, MessagesSquare, RotateCcw, Copy, Check } from "lucide-react";
import type { Prize } from "@/lib/prizes";
import { makeReference } from "@/lib/prizes";
import { Particles } from "./Particles";

const WHATSAPP_NUMBER = "972552491867";
const SUPPORT_EMAIL = "novachaserecovery@gmail.com";
const TELEGRAM_HANDLE = "Tatiana_POPOV12";

function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    });
  };
  return { copied, copy };
}

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

  const verificationMessage = `Hello Nova Chase support,\n\nI would like to request promotional verification for my reward.\n\nPrize: ${prize.name}\nReference: ${reference}\nDate: ${stamp}\n\nPlease assist me with the next steps.`;

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(verificationMessage)}`;
  const telegramLink = `https://telegram.me/${TELEGRAM_HANDLE}`;
  const mailtoLink = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`Nova Chase Reward Verification — ${reference}`)}&body=${encodeURIComponent(verificationMessage)}`;

  const refCopy = useCopy();
  const msgCopy = useCopy();

  const contactOptions = [
    {
      label: "WhatsApp",
      note: "Chat on WhatsApp",
      icon: MessageCircle,
      href: waLink,
      color: "from-green-500/20 to-green-600/10",
      border: "border-green-500/30",
      glow: "hover:shadow-[0_0_24px_oklch(0.72_0.19_150/0.3)]",
    },
    {
      label: "Telegram",
      note: "Message on Telegram",
      icon: Send,
      href: telegramLink,
      color: "from-sky-500/20 to-sky-600/10",
      border: "border-sky-500/30",
      glow: "hover:shadow-[0_0_24px_oklch(0.72_0.14_220/0.3)]",
    },
    {
      label: "Email Support",
      note: SUPPORT_EMAIL,
      icon: Mail,
      href: mailtoLink,
      color: "from-primary/20 to-primary/10",
      border: "border-primary/30",
      glow: "hover:shadow-[0_0_24px_oklch(0.62_0.24_27/0.3)]",
    },
    {
      label: "Live Chat",
      note: "Available 24/7",
      icon: MessagesSquare,
      href: waLink,
      color: "from-violet-500/20 to-violet-600/10",
      border: "border-violet-500/30",
      glow: "hover:shadow-[0_0_24px_oklch(0.72_0.18_280/0.3)]",
    },
    {
      label: "Phone Support",
      note: "Call our support team",
      icon: Phone,
      href: waLink,
      color: "from-amber-500/20 to-amber-600/10",
      border: "border-amber-500/30",
      glow: "hover:shadow-[0_0_24px_oklch(0.82_0.18_70/0.3)]",
    },
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

        {/* Prize card */}
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
                  <dd className="flex items-center gap-2 font-display text-primary">
                    <span>{reference}</span>
                    <button
                      onClick={() => refCopy.copy(reference)}
                      title="Copy reference"
                      className="rounded-md border border-primary/25 bg-primary/10 p-1 text-primary transition-colors hover:bg-primary/20"
                    >
                      {refCopy.copied ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </dd>
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

        {/* Copy verification message */}
        <div className="glass mx-auto mt-8 max-w-2xl rounded-2xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.24em] text-primary">
              Verification Message
            </p>
            <motion.button
              onClick={() => msgCopy.copy(verificationMessage)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/20"
            >
              {msgCopy.copied ? (
                <>
                  <Check className="h-3 w-3" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copy Message
                </>
              )}
            </motion.button>
          </div>
          <pre className="whitespace-pre-wrap rounded-xl bg-background/50 p-4 text-xs leading-relaxed text-muted-foreground">
            {verificationMessage}
          </pre>
        </div>

        {/* Contact options */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactOptions.map((o, i) => (
            <motion.a
              key={o.label}
              href={o.href}
              target={o.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border bg-gradient-to-br p-5 backdrop-blur-md transition-all ${o.color} ${o.border} ${o.glow}`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 transition-transform duration-500 group-hover:scale-110">
                <o.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-base">{o.label}</span>
                <span className="block text-xs text-muted-foreground">{o.note}</span>
              </span>
              {/* Ripple */}
              <span className="pointer-events-none absolute inset-0 scale-0 rounded-2xl bg-white/5 opacity-0 transition-all duration-700 group-hover:scale-150 group-hover:opacity-100" />
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

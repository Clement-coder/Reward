import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Landing } from "@/components/nova/Landing";
import { SpinStage } from "@/components/nova/SpinStage";
import { WinScreen } from "@/components/nova/WinScreen";
import { ClaimScreen } from "@/components/nova/ClaimScreen";
import type { Prize } from "@/lib/prizes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nova Chase — Premium Prize Challenge Experience" },
      {
        name: "description",
        content:
          "Spin for a chance to unlock cash prizes or luxury vehicles in Nova Chase, a premium interactive promotional experience.",
      },
      { property: "og:title", content: "Nova Chase — Chase Luxury. Unlock Incredible Rewards." },
      {
        property: "og:description",
        content:
          "A cinematic promotional experience featuring cash rewards up to $100,000 and luxury electric vehicles.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
  }),
  component: Index,
});

type Stage = "loading" | "landing" | "spinning" | "won" | "claim";

function Index() {
  const [stage, setStage] = useState<Stage>("loading");
  const [prize, setPrize] = useState<Prize | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setStage("landing"), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleComplete = useCallback((p: Prize) => {
    setPrize(p);
    setStage("won");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }, [stage]);

  return (
    <main className="relative min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {stage === "loading" && <Loader key="loader" />}
        {stage === "landing" && <Landing key="landing" onStart={() => setStage("spinning")} />}
        {stage === "spinning" && <SpinStage key="spin" onComplete={handleComplete} />}
        {stage === "won" && prize && (
          <WinScreen key="won" prize={prize} onClaim={() => setStage("claim")} />
        )}
        {stage === "claim" && prize && (
          <ClaimScreen key="claim" prize={prize} onRestart={() => setStage("landing")} />
        )}
      </AnimatePresence>
    </main>
  );
}

function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.6 }}
      className="surface-hero fixed inset-0 z-50 grid place-items-center bg-background"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          className="mx-auto h-14 w-14 rounded-full border-2 border-border border-t-primary"
        />
        <p className="mt-6 font-display text-xs uppercase tracking-[0.42em] text-muted-foreground">
          Nova Chase
        </p>
      </div>
    </motion.div>
  );
}

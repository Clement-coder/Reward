export async function celebrate() {
  if (typeof window === "undefined") return;
  const confetti = (await import("canvas-confetti")).default;

  const burst = (opts: Record<string, unknown>) =>
    confetti({
      colors: ["#E11D2E", "#FFFFFF", "#F5C451", "#111111"],
      disableForReducedMotion: true,
      ...opts,
    });

  burst({ particleCount: 160, spread: 80, startVelocity: 55, origin: { y: 0.6 } });
  setTimeout(() => burst({ particleCount: 90, angle: 60, spread: 70, origin: { x: 0, y: 0.7 } }), 220);
  setTimeout(() => burst({ particleCount: 90, angle: 120, spread: 70, origin: { x: 1, y: 0.7 } }), 340);

  // fireworks
  const end = Date.now() + 2600;
  const loop = () => {
    if (Date.now() > end) return;
    burst({
      particleCount: 34,
      startVelocity: 28,
      spread: 360,
      ticks: 70,
      gravity: 0.6,
      scalar: 0.9,
      origin: { x: 0.15 + Math.random() * 0.7, y: Math.random() * 0.5 },
    });
    setTimeout(loop, 420);
  };
  setTimeout(loop, 500);
}

let ctx: AudioContext | null = null;
function audio() {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  return ctx;
}

export function tick(freq = 880, dur = 0.05, gain = 0.05) {
  const ac = audio();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
  osc.connect(g).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + dur);
}

export function fanfare() {
  [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => tick(f, 0.5, 0.08), i * 130));
}

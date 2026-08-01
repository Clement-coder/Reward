import { useEffect, useRef } from "react";

type Props = { density?: number; className?: string };

export function Particles({ density = 60, className = "" }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const dots = Array.from({ length: density }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.4,
      vy: -(Math.random() * 0.12 + 0.03),
      vx: (Math.random() - 0.5) * 0.05,
      a: Math.random() * 0.6 + 0.2,
      red: Math.random() > 0.55,
    }));

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y += d.vy / 100;
        d.x += d.vx / 100;
        if (d.y < -0.05) {
          d.y = 1.05;
          d.x = Math.random();
        }
        if (d.x < -0.05) d.x = 1.05;
        if (d.x > 1.05) d.x = -0.05;
        const px = d.x * w;
        const py = d.y * h;
        ctx.beginPath();
        ctx.arc(px, py, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.red
          ? `rgba(225,29,46,${d.a})`
          : `rgba(255,255,255,${d.a * 0.7})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = d.red ? "rgba(225,29,46,0.9)" : "rgba(255,255,255,0.5)";
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

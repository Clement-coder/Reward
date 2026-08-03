import cash from "@/assets/cash.jpg";
import modelS from "@/assets/model-s.jpg";
import modelX from "@/assets/model-x.jpg";
import cybertruck from "@/assets/cybertruck.jpg";
import powerBike from "@/assets/power-bike.jpg";
import superbike from "@/assets/superbike.jpg";
import superbikePro from "@/assets/superbike-pro.jpg";

export type Prize = {
  id: string;
  name: string;
  kind: "cash" | "vehicle";
  tagline: string;
  description: string;
  image: string;
};

export const cashPrizes: Prize[] = [
  {
    id: "cash-35k",
    name: "$35,000 USD",
    kind: "cash",
    tagline: "Momentum Tier",
    description:
      "Imagine waking up tomorrow with $35,000 in your account. Pay off what's holding you back, bet on yourself, or finally start the business you've been dreaming about. This is the spark that changes everything.",
    image: cash,
  },
  {
    id: "cash-50k",
    name: "$50,000 USD",
    kind: "cash",
    tagline: "Signature Tier",
    description:
      "Fifty thousand dollars. No strings. No limits. Travel the world first-class, buy the car, invest in real estate, or simply give your family a life they never expected. This is what a turning point looks like.",
    image: cash,
  },
  {
    id: "cash-75k",
    name: "$75,000 USD",
    kind: "cash",
    tagline: "Apex Tier",
    description:
      "This isn't just money — it's momentum, freedom, and power handed to you at once. $75,000 to rewrite your story, silence the doubts, and step into the version of your life you always knew was possible.",
    image: cash,
  },
];

export const vehiclePrizes: Prize[] = [
  {
    id: "model-s",
    name: "Tesla Model S",
    kind: "vehicle",
    tagline: "All-Electric Sedan",
    description:
      "0 to 60 in under 2 seconds. A cabin that feels like a private jet. The Tesla Model S doesn't just turn heads — it stops traffic. This is what it feels like to drive the future, every single day.",
    image: modelS,
  },
  {
    id: "model-x",
    name: "Tesla Model X",
    kind: "vehicle",
    tagline: "Falcon Wing SUV",
    description:
      "The doors open like wings. Literally. The Tesla Model X is the SUV that makes every arrival feel like an entrance — space for your crew, power for the road, and tech that makes everything else feel outdated.",
    image: modelX,
  },
  {
    id: "cybertruck",
    name: "Tesla Cybertruck",
    kind: "vehicle",
    tagline: "Exoskeleton Pickup",
    description:
      "It looks like it drove straight out of a sci-fi film — because nothing on the road compares. Bulletproof stainless steel body, insane towing power, and zero emissions. The Cybertruck doesn't follow trends. It creates them.",
    image: cybertruck,
  },
];

export const bikePrizes: Prize[] = [
  {
    id: "power-bike",
    name: "$20,000 Power Bike",
    kind: "vehicle",
    tagline: "Electric Performance",
    description:
      "Silent. Fast. Unstoppable. This electric power bike hits with instant full torque the moment you twist the throttle — no revving, no waiting, just pure raw acceleration that pins you to the seat and grins back at you.",
    image: powerBike,
  },
  {
    id: "superbike",
    name: "$35,000 Superbike",
    kind: "vehicle",
    tagline: "Track-Ready Speed",
    description:
      "Every curve is a conversation. Every straight is a statement. This superbike was built for riders who don't slow down — race-tuned suspension, precision aerodynamics, and a roar that announces you before you even arrive.",
    image: superbike,
  },
  {
    id: "superbike-pro",
    name: "$40,000 Superbike Pro",
    kind: "vehicle",
    tagline: "Race-Grade Engineering",
    description:
      "This is the machine that pros dream about and legends are made on. Carbon fiber everywhere, championship-grade electronics, and a powerband so savage it demands respect. Not for the faint-hearted. Built for the bold.",
    image: superbikePro,
  },
];

export const allPrizes: Prize[] = [...cashPrizes, ...vehiclePrizes, ...bikePrizes];

export function makeReference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `NC-${out}`;
}

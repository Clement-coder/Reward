import cash from "@/assets/cash.jpg";
import modelS from "@/assets/model-s.jpg";
import modelX from "@/assets/model-x.jpg";
import cybertruck from "@/assets/cybertruck.jpg";
import powerBike from "@/assets/power-bike.jpg";
import superbike from "@/assets/superbike.jpg";

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
      "Perfect for investing in your future, launching a business, or achieving your biggest financial goals.",
    image: cash,
  },
  {
    id: "cash-50k",
    name: "$50,000 USD",
    kind: "cash",
    tagline: "Signature Tier",
    description:
      "A life-changing cash reward that can help fund your dream lifestyle or major personal ambitions.",
    image: cash,
  },
  {
    id: "cash-100k",
    name: "$100,000 USD",
    kind: "cash",
    tagline: "Apex Tier",
    description:
      "Our ultimate cash prize, designed to transform your future and open the door to extraordinary opportunities.",
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
      "A luxury all-electric sedan with exceptional acceleration, advanced technology, premium interior, and impressive long-range performance.",
    image: modelS,
  },
  {
    id: "model-x",
    name: "Tesla Model X",
    kind: "vehicle",
    tagline: "Falcon Wing SUV",
    description:
      "A premium electric SUV featuring Falcon Wing doors, spacious seating, cutting-edge safety features, and outstanding performance.",
    image: modelX,
  },
  {
    id: "cybertruck",
    name: "Tesla Cybertruck",
    kind: "vehicle",
    tagline: "Exoskeleton Pickup",
    description:
      "A bold, futuristic electric pickup with a durable stainless-steel exterior, powerful performance, and innovative design.",
    image: cybertruck,
  },
];

export const allPrizes: Prize[] = [...cashPrizes, ...vehiclePrizes];

export function makeReference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `NC-${out}`;
}

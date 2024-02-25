import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = [
  "#EE4266",
  "#FBA834",
  "#0C359E",
  "#344955",
  "#50C4ED",
  "#9BCF53",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function connectionIdColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

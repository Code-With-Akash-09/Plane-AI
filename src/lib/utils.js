import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getType = (val) =>
  Object.prototype.toString.call(val).slice(8, -1);
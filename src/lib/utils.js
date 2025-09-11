import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getType = (val) =>
  Object.prototype.toString.call(val).slice(8, -1);

let voicesReady = false;

export const initVoices = () => {
  if (typeof window === "undefined") return;
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    if (voices.length > 0) {
      voicesReady = true;
      resolve(voices);
    } else {
      synth.onvoiceschanged = () => {
        voices = synth.getVoices();
        voicesReady = true;
        resolve(voices);
      };
    }
  });
};

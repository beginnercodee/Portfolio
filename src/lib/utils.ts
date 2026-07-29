import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges conditional Tailwind CSS class names using `clsx` and `tailwind-merge`.
 * Eliminates conflicting or duplicate utility classes efficiently.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

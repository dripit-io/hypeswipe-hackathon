import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (
  amount: number | string,
  fractioningDigits: number = 2
): string =>
  (typeof amount === "string" ? Number(amount) : amount).toLocaleString(
    "en-US",
    {
      minimumFractionDigits: fractioningDigits,
      maximumFractionDigits: fractioningDigits,
    }
  );

export const formatBalance = (amount: number) => {
  // Handle millions
  if (amount >= 1000000) {
    return (Math.round(amount / 100000) / 10).toFixed(1) + "M";
  }

  // Handle thousands
  if (amount >= 1000) {
    return (Math.round(amount / 100) / 10).toFixed(1) + "K";
  }

  // Handle numbers less than 1000
  return Math.round(amount).toString();
};

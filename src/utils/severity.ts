import type { Severity } from "@/types/discharge";

export function getSeverityColor(severity: Severity) {
  switch (severity) {
    case "high":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
        dot: "bg-red-500",
        badge: "bg-red-600 text-white",
      };
    case "medium":
      return {
        bg: "bg-amber-100",
        text: "text-amber-800",
        border: "border-amber-200",
        dot: "bg-amber-500",
        badge: "bg-amber-500 text-white",
      };
    case "low":
      return {
        bg: "bg-emerald-100",
        text: "text-emerald-800",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
        badge: "bg-emerald-600 text-white",
      };
  }
}

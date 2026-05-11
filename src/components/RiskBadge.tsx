import type { Severity } from "@/types/discharge";
import { getSeverityColor } from "@/utils/severity";

export default function RiskBadge({
  severity,
  label,
}: {
  severity: Severity;
  label?: string;
}) {
  const colors = getSeverityColor(severity);
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors.badge}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          severity === "high"
            ? "bg-red-200"
            : severity === "medium"
            ? "bg-amber-200"
            : "bg-emerald-200"
        }`}
      />
      {label ?? severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}

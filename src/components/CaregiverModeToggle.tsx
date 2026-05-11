"use client";

export default function CaregiverModeToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`relative h-7 w-[52px] rounded-full transition-colors ${
        enabled ? "bg-emerald-500" : "bg-slate-600"
      }`}
      aria-label="Toggle caregiver mode"
    >
      <span
        className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition-transform ${
          enabled ? "translate-x-[24px]" : ""
        }`}
      />
    </button>
  );
}

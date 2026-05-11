"use client";

import { Sun, Cloud, Sunset, Moon } from "lucide-react";
import type { MedicinePlan } from "@/types/discharge";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/locales";

const timeBlocks = [
  { key: "morning" as const, labelKey: "morning" as TranslationKey, icon: Sun, color: "bg-amber-50 border-amber-200 text-amber-800" },
  { key: "afternoon" as const, labelKey: "afternoon" as TranslationKey, icon: Cloud, color: "bg-orange-50 border-orange-200 text-orange-800" },
  { key: "evening" as const, labelKey: "evening" as TranslationKey, icon: Sunset, color: "bg-indigo-50 border-indigo-200 text-indigo-800" },
  { key: "before_sleep" as const, labelKey: "beforeSleep" as TranslationKey, icon: Moon, color: "bg-slate-50 border-slate-200 text-slate-700" },
];

export default function MedicationTimeline({ plan }: { plan: MedicinePlan }) {
  const { t } = useLanguage();
  const activeBlocks = timeBlocks.filter((b) => plan[b.key].length > 0);

  if (activeBlocks.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-700 mb-3">{t("medicineSchedule")}</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 hidden sm:block" />
        <div className="space-y-3">
          {activeBlocks.map((block) => {
            const Icon = block.icon;
            return (
              <div key={block.key} className="relative sm:pl-10">
                <div className="hidden sm:flex absolute left-2.5 top-3 w-3 h-3 rounded-full bg-white border-2 border-slate-300 z-10" />
                <div className={`rounded-lg border p-3 ${block.color}`}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {t(block.labelKey)}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {plan[block.key].map((med, i) => (
                      <li key={i} className="text-sm">{med}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

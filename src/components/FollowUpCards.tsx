"use client";

import { CalendarCheck, FlaskConical, Scale } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function FollowUpCards({ items }: { items: string[] }) {
  const { t } = useLanguage();

  const cards = items.map((item) => {
    if (item.toLowerCase().includes("electrolyte") || item.toLowerCase().includes("blood test")) {
      return { icon: FlaskConical, title: t("labWork"), detail: item, time: "72 hrs", color: "text-cyan-600 bg-cyan-50 border-cyan-200" };
    }
    if (item.toLowerCase().includes("cardiology") || item.toLowerCase().includes("follow-up") || item.toLowerCase().includes("check-up")) {
      return { icon: CalendarCheck, title: t("followUpVisit"), detail: item, time: "7 days", color: "text-violet-600 bg-violet-50 border-violet-200" };
    }
    return { icon: Scale, title: t("monitoring"), detail: item, time: t("daily"), color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={i} className={`rounded-lg border p-3 ${card.color}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Icon className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">{card.title}</span>
              </div>
              <span className="text-xs font-bold bg-white/80 px-2 py-0.5 rounded-full">{card.time}</span>
            </div>
            <p className="text-sm">{card.detail}</p>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { AlertOctagon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function CriticalSafetyAlerts({ alerts }: { alerts: string[] }) {
  const { t } = useLanguage();
  if (alerts.length === 0) return null;
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-5">
      <h2 className="flex items-center gap-2 text-base font-bold text-red-800 mb-3">
        <AlertOctagon className="w-5 h-5" />
        {t("criticalSafetyAlerts")}
        <span className="ml-auto bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {alerts.length}
        </span>
      </h2>
      <ul className="space-y-2">
        {alerts.map((alert, i) => (
          <li
            key={i}
            className="flex items-start gap-2 bg-white border border-red-100 rounded-lg p-3 text-sm text-red-800"
          >
            <span className="shrink-0 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold mt-0.5">
              {i + 1}
            </span>
            {alert}
          </li>
        ))}
      </ul>
    </div>
  );
}

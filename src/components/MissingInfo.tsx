"use client";

import { FileQuestion } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function MissingInfo({ items }: { items: string[] }) {
  const { t } = useLanguage();
  if (items.length === 0) return null;
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
      <h2 className="flex items-center gap-2 text-base font-bold text-amber-800 mb-3">
        <FileQuestion className="w-5 h-5" />
        {t("missingInformation")}
      </h2>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-amber-800 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-amber-400">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

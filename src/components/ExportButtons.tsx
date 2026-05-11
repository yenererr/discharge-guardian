"use client";

import { Printer, Download } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ExportButtons() {
  const { t } = useLanguage();
  return (
    <div className="flex gap-2">
      <button
        onClick={() => window.print()}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors"
      >
        <Printer className="w-4 h-4" />
        {t("print")}
      </button>
      <button
        onClick={() => alert("PDF export coming soon")}
        className="flex items-center gap-1.5 text-sm font-medium text-white bg-emerald-600 rounded-lg px-3 py-2 hover:bg-emerald-700 transition-colors"
      >
        <Download className="w-4 h-4" />
        {t("exportPdf")}
      </button>
    </div>
  );
}

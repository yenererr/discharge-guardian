"use client";

import { BrainCircuit, Info, AlertTriangle } from "lucide-react";
import RiskBadge from "./RiskBadge";
import { useLanguage } from "@/i18n/LanguageContext";

const riskReasons = [
  { factor: "Furosemide dose doubled (40mg → 80mg BID)", risk: "Hypokalemia & dehydration", severity: "high" as const },
  { factor: "Potassium 3.8 mmol/L (borderline low)", risk: "Electrolyte imbalance", severity: "high" as const },
  { factor: "Patient lives alone, low health literacy", risk: "Medication non-adherence", severity: "high" as const },
  { factor: "CKD stage 3 with creatinine 1.2", risk: "Renal function deterioration", severity: "medium" as const },
  { factor: "Orthostatic hypotension risk", risk: "Falls & syncope", severity: "high" as const },
];

export default function AIExplainability() {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
      <h2 className="flex items-center gap-2 text-base font-bold text-slate-800 mb-4">
        <BrainCircuit className="w-5 h-5 text-violet-500" />
        {t("aiExplainability")}
      </h2>

      <div className="space-y-2 mb-4">
        {riskReasons.map((r, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white rounded-lg border border-slate-100 p-3">
            <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-sm text-slate-700 flex-1">{r.factor}</span>
            <span className="text-sm text-slate-500 shrink-0">{r.risk}</span>
            <RiskBadge severity={r.severity} />
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm text-slate-600">
        <div className="flex items-start gap-2 bg-white rounded-lg border border-slate-100 p-3">
          <Info className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
          <p>{t("aiMethodology")}</p>
        </div>
        <div className="flex items-start gap-2 bg-white rounded-lg border border-slate-100 p-3">
          <Info className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <p><span className="font-semibold text-amber-700">Disclaimer:</span> {t("aiDisclaimer")}</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  Heart, Pill, FlaskConical, AlertTriangle, ShieldAlert, FileSearch,
} from "lucide-react";
import type { ClinicianSummary as ClinicianSummaryType } from "@/types/discharge";
import SectionCard from "./SectionCard";
import FollowUpCards from "./FollowUpCards";
import { useLanguage } from "@/i18n/LanguageContext";

function Section({
  icon: Icon,
  title,
  items,
  color,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
  color: string;
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <Icon className={`w-4 h-4 ${color}`} />
        {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-slate-600 pl-6 relative before:content-[''] before:absolute before:left-1.5 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-slate-300">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ClinicianSummaryPanel({ data }: { data: ClinicianSummaryType }) {
  const { t } = useLanguage();

  return (
    <SectionCard title={t("clinicianSummary")} icon={<FileSearch className="w-5 h-5 text-blue-500" />}>
      <div className="space-y-5">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Heart className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                {t("primaryDiagnosis")}
              </span>
              <p className="text-sm text-blue-900 font-medium mt-0.5">{data.primary_diagnosis}</p>
            </div>
          </div>
        </div>

        <Section icon={Pill} title={t("medicationChanges")} items={data.medication_changes} color="text-violet-500" />
        <Section icon={FlaskConical} title={t("importantLabs")} items={data.important_labs_and_findings} color="text-cyan-500" />
        <Section icon={AlertTriangle} title={t("redFlagRisks")} items={data.red_flag_risks} color="text-red-500" />

        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">{t("followUpPlan")}</h3>
          <FollowUpCards items={data.follow_up_plan} />
        </div>

        <Section icon={ShieldAlert} title={t("safetyNotes")} items={data.safety_notes} color="text-amber-500" />
      </div>
    </SectionCard>
  );
}

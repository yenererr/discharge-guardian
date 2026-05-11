"use client";

import {
  User, Calendar, Hash, Stethoscope, Building2,
  Heart, BookOpen, Home, Users,
} from "lucide-react";
import type { PatientInfo } from "@/types/discharge";
import RiskBadge from "./RiskBadge";
import { useLanguage } from "@/i18n/LanguageContext";

export default function PatientHeader({ patient }: { patient: PatientInfo }) {
  const { t } = useLanguage();

  const items = [
    { icon: Hash, label: t("mrn"), value: patient.mrn },
    { icon: User, label: t("ageGender"), value: `${patient.age} ${t("yrs")} / ${patient.gender}` },
    { icon: Calendar, label: t("dob"), value: patient.dob },
    { icon: Calendar, label: t("discharged"), value: patient.discharge_date },
    { icon: Stethoscope, label: t("physician"), value: patient.attending_physician },
    { icon: Building2, label: t("dept"), value: patient.department },
    { icon: Heart, label: t("diagnosis"), value: patient.diagnosis },
    { icon: Home, label: t("living"), value: patient.living_situation },
    { icon: Users, label: t("caregiver"), value: patient.caregiver },
  ];

  const riskLabel = `${t(patient.readmission_risk)} ${t("readmissionRisk")}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <h1 className="text-lg font-bold text-slate-900">{patient.name}</h1>
        <RiskBadge severity={patient.readmission_risk} label={riskLabel} />
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
          <BookOpen className="w-3 h-3" />
          {t("lowHealthLiteracy")}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-sm">
            <item.icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500">{item.label}:</span>
            <span className="font-medium text-slate-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

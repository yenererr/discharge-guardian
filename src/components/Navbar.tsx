"use client";

import { ShieldCheck, Activity, AlertTriangle, User, Share2, Globe } from "lucide-react";
import type { PatientInfo } from "@/types/discharge";
import CaregiverModeToggle from "./CaregiverModeToggle";
import { useLanguage } from "@/i18n/LanguageContext";

interface NavbarProps {
  patient: PatientInfo;
  clinicianReviewRequired: boolean;
  caregiverMode: boolean;
  onToggleCaregiverMode: () => void;
}

export default function Navbar({
  patient,
  clinicianReviewRequired,
  caregiverMode,
  onToggleCaregiverMode,
}: NavbarProps) {
  const { t, locale, setLocale } = useLanguage();

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-700">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <ShieldCheck className="w-7 h-7 text-emerald-400" />
          <span className="text-lg font-bold tracking-tight hidden sm:inline">
            DischargeGuardian<span className="text-emerald-400"> AI</span>
          </span>
        </div>

        {/* Patient info */}
        <div className="flex items-center gap-3 text-sm text-slate-300 overflow-hidden">
          <User className="w-4 h-4 shrink-0 text-slate-400" />
          <span className="font-medium text-white truncate">{patient.name}</span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline whitespace-nowrap">
            {t("discharge")}: {patient.discharge_date}
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {clinicianReviewRequired && (
            <span className="flex items-center gap-1.5 bg-amber-500/20 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/30">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t("reviewRequired")}</span>
            </span>
          )}

          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{t("aiReady")}</span>
          </span>

          <button
            onClick={() => alert("Share with caregiver coming soon")}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{t("share")}</span>
          </button>

          {/* Language switcher */}
          <button
            onClick={() => setLocale(locale === "en" ? "tr" : "en")}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-slate-800 px-2 py-1 rounded"
          >
            <Globe className="w-3.5 h-3.5" />
            {locale === "en" ? "TR" : "EN"}
          </button>

          <CaregiverModeToggle enabled={caregiverMode} onToggle={onToggleCaregiverMode} />
          <span className="text-xs text-slate-400 hidden lg:inline">
            {caregiverMode ? t("patientView") : t("clinicianView")}
          </span>
        </div>
      </div>
    </nav>
  );
}

"use client";

import {
  HeartPulse, ListChecks, Phone, CalendarClock, BellRing, ClipboardList,
} from "lucide-react";
import type { PatientHomeCarePlan as PlanType } from "@/types/discharge";
import SectionCard from "./SectionCard";
import MedicationTimeline from "./MedicationTimeline";
import { useLanguage } from "@/i18n/LanguageContext";

function ListSection({
  icon: Icon,
  title,
  items,
  variant = "default",
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
  variant?: "default" | "warning";
}) {
  if (items.length === 0) return null;
  const isWarning = variant === "warning";
  return (
    <div>
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <Icon className={`w-4 h-4 ${isWarning ? "text-red-500" : "text-emerald-500"}`} />
        {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className={`text-sm pl-6 relative before:content-[''] before:absolute before:left-1.5 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full ${
              isWarning
                ? "text-red-700 before:bg-red-400 bg-red-50 rounded-md p-2 pl-6"
                : "text-slate-600 before:bg-emerald-300"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PatientHomeCarePlanPanel({ data }: { data: PlanType }) {
  const { t } = useLanguage();

  return (
    <SectionCard title={t("patientHomeCare")} icon={<ClipboardList className="w-5 h-5 text-emerald-500" />}>
      <div className="space-y-5">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                {t("yourHealthCondition")}
              </span>
              <p className="text-sm text-emerald-900 mt-0.5">{data.main_health_problem_simple}</p>
            </div>
          </div>
        </div>

        <MedicationTimeline plan={data.medicine_plan} />

        <ListSection icon={ListChecks} title={t("dailyTasks")} items={data.daily_tasks} />
        <ListSection icon={Phone} title={t("warningSignsCall")} items={data.warning_signs_call_hospital_if} variant="warning" />
        <ListSection icon={CalendarClock} title={t("appointmentsTests")} items={data.appointments_and_tests} />
        <ListSection icon={BellRing} title={t("importantReminders")} items={data.important_reminders} />
      </div>
    </SectionCard>
  );
}

"use client";

import { useState } from "react";
import { mockDischargeOutput, mockPatientInfo } from "@/data/mockDischargeOutput";
import { generateDischargePlan } from "@/services/dischargeGuardianClient";
import type { DischargeOutput } from "@/types/discharge";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import PatientHeader from "@/components/PatientHeader";
import ClinicianSummaryPanel from "@/components/ClinicianSummary";
import PatientHomeCarePlanPanel from "@/components/PatientHomeCarePlan";
import CriticalSafetyAlerts from "@/components/CriticalSafetyAlerts";
import MissingInfo from "@/components/MissingInfo";
import ExportButtons from "@/components/ExportButtons";
import AIExplainability from "@/components/AIExplainability";
import PatientInputModal from "@/components/PatientInputModal";
import { Loader2, Sparkles } from "lucide-react";

function DashboardContent() {
  const [caregiverMode, setCaregiverMode] = useState(false);
  const [data, setData] = useState<DischargeOutput>(mockDischargeOutput);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const patient = mockPatientInfo;

  const handleGenerate = async (prompt: string) => {
    setLoading(true);
    try {
      const result = await generateDischargePlan(
        `Generate discharge transition plan for the following patient:\n\n${prompt}`
      );
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar
        patient={patient}
        clinicianReviewRequired={data.clinician_review_required}
        caregiverMode={caregiverMode}
        onToggleCaregiverMode={() => setCaregiverMode((v) => !v)}
      />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <PatientHeader patient={patient} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setModalOpen(true)}
              disabled={loading}
              className="flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {loading ? "Generating..." : "Generate with AI"}
            </button>
            <ExportButtons />
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              <p className="text-slate-500 text-sm">AI is analyzing patient data...</p>
            </div>
          </div>
        )}

        {!loading && (
          <>
            <CriticalSafetyAlerts alerts={data.critical_safety_alerts} />
            <MissingInfo items={data.missing_information} />

            {caregiverMode ? (
              <PatientHomeCarePlanPanel data={data.patient_home_care_plan} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ClinicianSummaryPanel data={data.clinician_summary} />
                <PatientHomeCarePlanPanel data={data.patient_home_care_plan} />
              </div>
            )}

            {!caregiverMode && <AIExplainability />}
          </>
        )}
      </main>

      <PatientInputModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleGenerate}
      />
    </div>
  );
}

export default function Dashboard() {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  );
}

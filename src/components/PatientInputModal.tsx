"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface PatientInputModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (prompt: string) => void;
}

const PRESETS = [
  {
    label: "Ayşe Yılmaz — Heart Failure",
    prompt: `72-year-old female, Ayşe Yılmaz
Diagnosis: HFrEF (LVEF 35%) with acute on chronic volume overload
Comorbidities: CKD stage 3, Type 2 diabetes, hypertension, hyperlipidemia
Furosemide: increased from 40mg BID to 80mg BID
Labs: K+ 3.8, Cr 1.2, BNP 450
Social: Lives alone, low health literacy, daughter visits 1-2x/week
Follow-up: Electrolyte panel 72hrs, cardiology 7 days`,
  },
  {
    label: "Mehmet Demir — COPD Exacerbation",
    prompt: `65-year-old male, Mehmet Demir
Diagnosis: Acute COPD exacerbation with respiratory failure
Comorbidities: Type 2 diabetes, hypertension, 40 pack-year smoking history
Medications: Prednisone taper starting 40mg, albuterol nebulizer, tiotropium started
Labs: WBC 12.5, CRP 45, ABG pH 7.35 pCO2 52
Social: Lives with wife, moderate health literacy
Follow-up: Pulmonology in 5 days, PFT in 4 weeks`,
  },
  {
    label: "Fatma Kara — Post-Surgical Discharge",
    prompt: `58-year-old female, Fatma Kara
Diagnosis: Total knee replacement (right), post-operative day 4
Comorbidities: Obesity BMI 34, hypertension, osteoarthritis
Medications: Enoxaparin 40mg daily for DVT prophylaxis 14 days, oxycodone 5mg PRN, ibuprofen 400mg TID
Labs: Hgb 10.2, WBC 8.1, INR 1.0
Social: Lives with husband, uses walker, low fall risk
Follow-up: Orthopedic surgeon in 10 days, PT 3x/week, wound check in 5 days`,
  },
];

export default function PatientInputModal({ open, onClose, onSubmit }: PatientInputModalProps) {
  const [text, setText] = useState(PRESETS[0].prompt);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">Generate Discharge Plan</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Preset buttons */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-2 block">
              Quick Select Patient:
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setText(p.prompt)}
                  className="text-xs px-3 py-1.5 rounded-full border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition-colors text-slate-600"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text area */}
          <div>
            <label className="text-sm font-medium text-slate-600 mb-2 block">
              Patient Details:
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              className="w-full border border-slate-200 rounded-lg p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter patient details..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(text);
              onClose();
            }}
            className="text-sm px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Generate Plan
          </button>
        </div>
      </div>
    </div>
  );
}

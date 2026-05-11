import type { DischargeOutput, PatientInfo } from "@/types/discharge";

export const mockPatientInfo: PatientInfo = {
  name: "Ayşe Yılmaz",
  age: 72,
  gender: "Female",
  dob: "1952-04-16",
  mrn: "MRN-2024-081547",
  diagnosis: "Heart failure with reduced ejection fraction",
  admission_date: "2026-05-03",
  discharge_date: "2026-05-10",
  attending_physician: "Dr. Elif Kaya",
  department: "Cardiology",
  health_literacy: "low",
  living_situation: "Lives alone",
  caregiver: "Daughter visits 1-2 times per week",
  readmission_risk: "high",
};

// Real output from Prompt Opinion AI agent
export const mockDischargeOutput: DischargeOutput = {
  clinician_summary: {
    primary_diagnosis:
      "HFrEF (LVEF 35%) with acute on chronic volume overload.",
    medication_changes: [
      "Furosemide: Increased from 40mg BID to 80mg BID.",
      "Continue lisinopril, metoprolol, atorvastatin, and metformin as previously prescribed.",
    ],
    important_labs_and_findings: [
      "Potassium 3.8 mmol/L (borderline low).",
      "Creatinine 1.2 mg/dL.",
      "BNP 450 pg/mL.",
    ],
    red_flag_risks: [
      "Worsening dyspnea or orthopnea.",
      "Significant weight gain (e.g., >3 lbs in a day or >5 lbs in a week).",
      "Symptomatic hypotension or syncope.",
      "Severe fatigue or signs of electrolyte disturbance (e.g., muscle weakness, palpitations).",
    ],
    follow_up_plan: [
      "Electrolyte panel in 72 hours to assess for hypokalemia.",
      "Cardiology follow-up in 7 days.",
      "Patient instructed on daily morning weight tracking.",
    ],
    safety_notes: [
      "Patient is at significant risk for hypokalemia due to dose increase of loop diuretic.",
      "High risk of falls due to potential orthostatic hypotension from antihypertensive regimen and diuresis.",
      "Requires close monitoring of renal function and electrolytes given underlying CKD stage 3.",
      "Transition care requires high vigilance for signs of volume overload or rapid dehydration.",
    ],
  },
  patient_home_care_plan: {
    main_health_problem_simple:
      "Heart Failure: This means your heart is having a hard time pumping blood effectively, causing fluid to build up in your body.",
    medicine_plan: {
      morning: [
        "Furosemide (Water Pill): 80mg",
        "Take other heart and diabetes medications as previously instructed.",
      ],
      afternoon: [
        "Continue any other scheduled maintenance medications.",
      ],
      evening: [
        "Furosemide (Water Pill): 80mg",
        "Take other maintenance medications as previously instructed.",
      ],
      before_sleep: [
        "No new medications to add here; keep your routine.",
      ],
    },
    daily_tasks: [
      "Weigh yourself every morning before breakfast, after using the bathroom, and wearing similar clothing.",
      "Check your legs and feet daily for new or worsening swelling.",
      "Take your heart and fluid medications exactly as prescribed.",
      "Rise slowly from sitting or lying down to avoid dizziness.",
    ],
    warning_signs_call_hospital_if: [
      "You gain more than 3 pounds in one day or 5 pounds in a week.",
      "You feel very dizzy or lightheaded when standing.",
      "You have a hard time catching your breath, even while resting.",
      "You notice sudden, severe weakness or heart palpitations.",
      "You have swelling in your legs that is getting worse.",
    ],
    appointments_and_tests: [
      "Blood test for electrolytes: In 3 days (72 hours).",
      "Cardiology check-up: In 7 days.",
    ],
    important_reminders: [
      "Keep a log of your daily weights.",
      "Drink only the amount of fluids your doctor recommended.",
      "Watch for dizziness when you stand up quickly.",
      "Do not skip blood tests for your electrolyte levels.",
    ],
  },
  critical_safety_alerts: [
    "High risk of diuretic-induced hypokalemia; serum potassium monitoring is critical in 72 hours.",
    "Increased risk of fall/syncope due to combination of HFrEF medications and increased diuretic dosing.",
    "Patient needs clear guidance on differentiating fluid overload from dehydration symptoms.",
  ],
  missing_information: [
    "Baseline creatinine and potassium levels for comparison.",
    "Specific instructions on what to do if weight fluctuates significantly.",
  ],
  clinician_review_required: true,
};

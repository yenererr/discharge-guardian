export interface ClinicianSummary {
  primary_diagnosis: string;
  medication_changes: string[];
  important_labs_and_findings: string[];
  red_flag_risks: string[];
  follow_up_plan: string[];
  safety_notes: string[];
}

export interface MedicinePlan {
  morning: string[];
  afternoon: string[];
  evening: string[];
  before_sleep: string[];
}

export interface PatientHomeCarePlan {
  main_health_problem_simple: string;
  medicine_plan: MedicinePlan;
  daily_tasks: string[];
  warning_signs_call_hospital_if: string[];
  appointments_and_tests: string[];
  important_reminders: string[];
}

export interface DischargeOutput {
  clinician_summary: ClinicianSummary;
  patient_home_care_plan: PatientHomeCarePlan;
  critical_safety_alerts: string[];
  missing_information: string[];
  clinician_review_required: boolean;
}

export interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  dob: string;
  mrn: string;
  diagnosis: string;
  admission_date: string;
  discharge_date: string;
  attending_physician: string;
  department: string;
  health_literacy: "low" | "medium" | "high";
  living_situation: string;
  caregiver: string;
  readmission_risk: "low" | "medium" | "high";
}

export type Severity = "high" | "medium" | "low";

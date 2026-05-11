import { mockDischargeOutput } from "@/data/mockDischargeOutput";
import type { DischargeOutput } from "@/types/discharge";

export async function getMockDischargeOutput(): Promise<DischargeOutput> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockDischargeOutput;
}

export async function generateDischargePlan(
  patientPrompt: string
): Promise<DischargeOutput> {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: patientPrompt }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      console.error("API error details:", errorBody);
      throw new Error(`API error: ${response.status}`);
    }

    return (await response.json()) as DischargeOutput;
  } catch (error) {
    console.error("API error, falling back to mock:", error);
    return getMockDischargeOutput();
  }
}

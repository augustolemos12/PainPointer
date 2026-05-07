type AnalyzePainPayload = {
  muscle: {
    id: string;
    label: string;
    region: string;
    actions: string[];
  };
  selectedMuscleRaw: string;
  answers: {
    painType: string;
    onset: string;
    trigger: string;
    radiation: string;
    intensity: number;
  };
};

export async function analyzePain(payload: AnalyzePainPayload) {
  const response = await fetch("http://localhost:3001/api/analyze-pain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al analizar molestia");
  }

  return response.json();
}
import { useCallback, useMemo, useState } from "react";
import SketchfabViewer from "./components/SketchfabViewer";
import MuscleContextCard from "./components/MuscleContextCard";
import PainQuestionnaire from "./components/PainQuestionnaire";
import AnalysisResult from "./components/AnalysisResult";
import { muscles } from "./data/muscles";
import { analyzePain } from "./services/painAnalysisService";
import type { PainAnswers } from "./types/pain";

function normalizeMuscleName(name: string): string {
  const normalized = name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const aliases: Record<string, string> = {
    esternocleidomastoideo: "esternocleidomastoideo",
    externocleidomastoideo: "esternocleidomastoideo",
    "pectoral mayor": "pectoral_mayor",
    deltoide: "deltoide",
    biceps: "biceps",
    "biceps braquial": "biceps",
    serratos: "serratos",
    "recto del abdomen": "recto_abdomen",
    "oblicuo externo del abdomen": "oblicuo_externo",
    "extensores de los dedos": "extensores_dedos",
    "flexores de los dedos": "flexores_dedos",
    "cuadriceps femoral": "cuadriceps",
    sartorio: "sartorio",
    trapecio: "trapecio",
    infraespinoso: "infraespinoso",
    "dorsal ancho": "dorsal_ancho",
    triceps: "triceps",
    "gluteo mayor": "gluteo_mayor",
    "biceps femoral": "biceps_femoral",
    gemelos: "gemelos",
    "tibial anterior": "tibial_anterior",
  };

  return aliases[normalized] ?? normalized.replace(/\s+/g, "_");
}

export default function App() {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const muscle = useMemo(() => {
    if (!selectedMuscle) return null;
    const muscleKey = normalizeMuscleName(selectedMuscle);
    return muscles[muscleKey] ?? null;
  }, [selectedMuscle]);

  const handleMuscleSelect = useCallback((muscleName: string) => {
    setSelectedMuscle(muscleName);
    setResult(null);
  }, []);

  async function handleSubmit(answers: PainAnswers) {
    if (!muscle || !selectedMuscle) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await analyzePain({
        muscle,
        selectedMuscleRaw: selectedMuscle,
        answers,
      });

      setResult(response);
    } catch (error) {
      console.error("Error analizando molestia:", error);
      setResult({
        summary: "No se pudo generar la orientación en este momento.",
        possible_causes: [],
        self_care: [],
        red_flags: ["Si el dolor es intenso o empeora, consultá a un profesional."],
        disclaimer:
          "Esta herramienta brinda orientación inicial y no reemplaza la evaluación profesional.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <section className="relative h-full w-1/2 border-r border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,29,29,0.18),transparent_35%)] pointer-events-none" />
        <div className="relative h-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_80px_rgba(0,0,0,0.45)]">
          <SketchfabViewer onMuscleSelect={handleMuscleSelect} />
        </div>
      </section>

      <aside className="h-full w-1/2 overflow-y-auto bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 p-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="mb-3 inline-flex items-center rounded-full border border-red-900/40 bg-red-950/30 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-red-300">
              PointPain
            </div>

            <h1 className="mb-2 text-4xl font-semibold tracking-tight text-zinc-50">
              Orientación muscular guiada
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-zinc-400">
              Seleccioná un músculo en el modelo y completá el cuestionario para generar una
              orientación inicial clara, estructurada y prudente.
            </p>
          </div>

          {!selectedMuscle && (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
              <h2 className="mb-2 text-lg font-semibold text-zinc-100">Esperando selección</h2>
              <p className="text-zinc-400">
                Elegí un músculo en el visor anatómico para comenzar el análisis.
              </p>
            </div>
          )}

          {selectedMuscle && !muscle && (
            <div className="rounded-3xl border border-amber-900/40 bg-amber-950/20 p-6 text-amber-100 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <h2 className="mb-2 text-lg font-semibold">Músculo detectado</h2>
              <p className="text-zinc-200">{selectedMuscle}</p>
              <p className="mt-3 text-sm text-amber-200/80">
                El nombre llegó desde Sketchfab, pero todavía no está mapeado en la base local.
              </p>
            </div>
          )}

          {muscle && (
            <div className="space-y-5">
              <MuscleContextCard muscle={muscle} />

              {!loading && !result && <PainQuestionnaire onSubmit={handleSubmit} />}

              {loading && (
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                  <div className="mb-3 h-2 w-32 animate-pulse rounded-full bg-red-800/60" />
                  <p className="text-sm text-zinc-300">Analizando información clínica orientativa...</p>
                </div>
              )}

              {result && <AnalysisResult result={result} />}

              <div className="rounded-3xl border border-red-900/40 bg-red-950/20 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                <p className="text-sm leading-6 text-red-200">
                  Esta herramienta brinda una orientación inicial y no reemplaza la evaluación de un
                  profesional de la salud.
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </main>
  );
}
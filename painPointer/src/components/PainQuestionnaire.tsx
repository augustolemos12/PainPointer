import { useState } from "react";
import type { PainAnswers } from "../types/pain";

type Props = {
  onSubmit: (answers: PainAnswers) => void;
};

export default function PainQuestionnaire({ onSubmit }: Props) {
  const [answers, setAnswers] = useState<PainAnswers>({
    painType: "tirantez",
    onset: "hoy",
    trigger: "entrenamiento",
    radiation: "no",
    intensity: 5,
  });

  function update<K extends keyof PainAnswers>(field: K, value: PainAnswers[K]) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
      <div className="mb-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-red-300">
          Cuestionario clínico breve
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Describí la molestia
        </h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-zinc-400">
            Tipo de dolor
          </label>
          <select
            value={answers.painType}
            onChange={(e) => update("painType", e.target.value)}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-900/40"
          >
            <option value="tirantez">Tirantez</option>
            <option value="pinchazo">Pinchazo</option>
            <option value="ardor">Ardor</option>
            <option value="rigidez">Rigidez</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-zinc-400">
            Inicio
          </label>
          <select
            value={answers.onset}
            onChange={(e) => update("onset", e.target.value)}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-900/40"
          >
            <option value="hoy">Hoy</option>
            <option value="hace unos días">Hace unos días</option>
            <option value="semanas">Semanas</option>
            <option value="meses">Meses</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-zinc-400">
            Posible desencadenante
          </label>
          <select
            value={answers.trigger}
            onChange={(e) => update("trigger", e.target.value)}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-900/40"
          >
            <option value="entrenamiento">Entrenamiento</option>
            <option value="mala postura">Mala postura</option>
            <option value="golpe">Golpe</option>
            <option value="movimiento repetitivo">Movimiento repetitivo</option>
            <option value="no estoy seguro">No estoy seguro</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-zinc-400">
            Irradiación
          </label>
          <select
            value={answers.radiation}
            onChange={(e) => update("radiation", e.target.value)}
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-900/40"
          >
            <option value="no">No</option>
            <option value="sí, un poco">Sí, un poco</option>
            <option value="sí, bastante">Sí, bastante</option>
          </select>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
          <div className="mb-3 flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-400">
              Intensidad
            </label>
            <span className="rounded-full border border-red-900/50 bg-red-950/30 px-3 py-1 text-sm text-red-200">
              {answers.intensity}/10
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={10}
            value={answers.intensity}
            onChange={(e) => update("intensity", Number(e.target.value))}
            className="w-full accent-red-700"
          />
        </div>

        <button
          onClick={() => onSubmit(answers)}
          className="w-full rounded-2xl bg-gradient-to-r from-red-800 to-red-700 px-5 py-3 font-medium text-white shadow-[0_10px_30px_rgba(127,29,29,0.35)] transition hover:from-red-700 hover:to-red-600"
        >
          Generar orientación
        </button>
      </div>
    </section>
  );
}
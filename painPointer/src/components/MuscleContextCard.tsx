import type { Muscle } from "../data/muscles";

type Props = {
  muscle: Muscle;
};

export default function MuscleContextCard({ muscle }: Props) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-red-300">
            Músculo seleccionado
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
            {muscle.label}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">Región: {muscle.region}</p>
        </div>

        <div className="rounded-2xl border border-red-900/40 bg-red-950/30 px-3 py-2 text-xs text-red-200">
          Contexto anatómico
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
        <p className="mb-3 text-sm font-medium text-zinc-200">Acciones principales</p>
        <ul className="space-y-2 text-sm text-zinc-400">
          {muscle.actions.map((action, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
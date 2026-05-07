type Props = {
  result: {
    summary: string;
    possible_causes: string[];
    self_care: string[];
    red_flags: string[];
    disclaimer?: string;
  };
};

export default function AnalysisResult({ result }: Props) {
  return (
    <section className="space-y-5 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-red-300">
          Resultado orientativo
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Interpretación inicial
        </h2>
        <p className="mt-3 leading-7 text-zinc-300">{result.summary}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
          <h3 className="mb-3 text-lg font-semibold text-zinc-100">Posibles causas</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            {result.possible_causes.map((cause, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>{cause}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
          <h3 className="mb-3 text-lg font-semibold text-zinc-100">Recomendaciones</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            {result.self_care.map((tip, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-5">
        <h3 className="mb-3 text-lg font-semibold text-red-300">Consultar si aparece</h3>
        <ul className="space-y-2 text-sm text-red-100/90">
          {result.red_flags.map((flag, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400" />
              <span>{flag}</span>
            </li>
          ))}
        </ul>
      </div>

      {result.disclaimer && (
        <p className="text-xs leading-6 text-zinc-500">{result.disclaimer}</p>
      )}
    </section>
  );
}
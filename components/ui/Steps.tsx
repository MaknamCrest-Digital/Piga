export function Steps({ steps, tone = "dark" }: { steps: { title: string; body: string }[]; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <ol className="relative space-y-3">
      {steps.map((s, i) => (
        <li key={s.title} className={`relative flex gap-5 rounded-2xl p-5 ${light ? "border border-white/10 bg-white/[.04]" : "border border-line bg-paper shadow-soft"}`}>
          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ${i === 0 ? "bg-gold text-forest-950" : light ? "bg-white/10 text-mint-50" : "bg-mint-100 text-forest-800"}`}>
            {i + 1}
          </span>
          <div>
            <h3 className={`text-lg font-semibold ${light ? "text-mint-50" : ""}`}>{s.title}</h3>
            <p className={`mt-1 text-[15px] leading-6 ${light ? "text-mint-100/65" : "text-muted"}`}>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

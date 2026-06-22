function colorFor(score: number): { bg: string; ring: string; text: string } {
  if (score >= 70) return { bg: "bg-olive/15", ring: "stroke-olive", text: "text-olive" };
  if (score >= 40) return { bg: "bg-gold/15", ring: "stroke-gold", text: "text-[#a07d20]" };
  return { bg: "bg-muted/15", ring: "stroke-muted", text: "text-muted" };
}

export default function ScoreBadge({
  score,
  size = 44,
}: {
  score: number;
  size?: number;
}) {
  const c = colorFor(score);
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - score / 100);
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" className="text-border" strokeWidth={3} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className={c.ring}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={off}
        />
      </svg>
      <span className={`absolute font-semibold ${c.text}`} style={{ fontSize: size * 0.3 }}>
        {score}
      </span>
    </div>
  );
}

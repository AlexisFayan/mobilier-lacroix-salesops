import { SOURCES, srcIndex } from "@/lib/rendu";

/** Référence de source en exposant, cliquable. <Src ids={["insee-561"]} /> */
export function Src({ ids }: { ids: readonly string[] }) {
  if (!ids || ids.length === 0) return null;
  return (
    <sup className="ml-0.5 inline-flex gap-0.5">
      {ids.map((id) => {
        const i = srcIndex(id);
        const s = SOURCES[i - 1];
        if (!s) return null;
        return (
          <a
            key={id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${s.org} — ${s.title}`}
            className="font-semibold text-terracotta-dark hover:underline"
          >
            [{i}]
          </a>
        );
      })}
    </sup>
  );
}

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { euro } from "@/lib/types";

/**
 * Estimateur de budget, aimant marketing (lead magnet) rendu jouable.
 * Calcul déterministe et transparent (somme de postes × gamme), donc fiable en démo
 * sans dépendre d'une clé IA. Matérialise le pont marketing -> commercial.
 */

type Poste = { key: string; label: string; unit: string; low: number; high: number };

const POSTES: Poste[] = [
  { key: "comptoir", label: "Comptoir / bar sur mesure", unit: "unité", low: 2500, high: 6000 },
  { key: "banquette", label: "Banquettes", unit: "mètre", low: 350, high: 650 },
  { key: "couvert", label: "Tables + chaises", unit: "couvert", low: 250, high: 500 },
  { key: "tetelit", label: "Têtes de lit", unit: "chambre", low: 300, high: 700 },
  { key: "accueil", label: "Mobilier d'accueil / hall", unit: "ensemble", low: 2000, high: 5000 },
];

const GAMMES = [
  { key: "essentiel", label: "Essentiel", mult: 0.85, desc: "lignes sobres, essences courantes" },
  { key: "signature", label: "Signature", mult: 1, desc: "le cœur du sur-mesure Lacroix" },
  { key: "exception", label: "Pièce d'exception", mult: 1.4, desc: "essences rares, finitions à la main" },
] as const;

function round100(n: number): number {
  return Math.round(n / 100) * 100;
}

export default function EstimateurPage() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [gamme, setGamme] = useState<(typeof GAMMES)[number]["key"]>("signature");
  const [sent, setSent] = useState(false);

  const mult = GAMMES.find((g) => g.key === gamme)!.mult;
  const low = round100(POSTES.reduce((s, p) => s + (qty[p.key] || 0) * p.low, 0) * mult);
  const high = round100(POSTES.reduce((s, p) => s + (qty[p.key] || 0) * p.high, 0) * mult);
  const total = low + high;
  const mid = (low + high) / 2;

  let verdict = "";
  if (total > 0) {
    if (mid < 5000) verdict = "Projet ciblé : parlons-en pour aller à l'essentiel sans rogner sur la matière.";
    else if (mid <= 15000) verdict = "Projet cohérent avec nos réalisations sur-mesure. Une visite d'atelier serait la prochaine étape.";
    else verdict = "Beau projet d'envergure : idéal pour un accompagnement complet et des pièces signature.";
  }

  function setN(key: string, v: string) {
    setQty((q) => ({ ...q, [key]: Math.max(0, Math.round(Number(v) || 0)) }));
    setSent(false);
  }

  const inputCls =
    "w-20 rounded-lg border border-border bg-cream px-2 py-1.5 text-[13px] text-ink outline-none focus:border-clay/60";

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10">
        <div className="text-center">
          <span className="inline-block rounded-full border border-border bg-paper px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted">
            Aimant marketing · estimateur
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-bois-dark sm:text-4xl">Estimer votre projet sur-mesure</h1>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-ink/80">
            Une fourchette indicative en deux minutes. Renseignez vos postes, nous affinerons ensemble lors
            d'une visite d'atelier.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Formulaire */}
          <div className="rounded-2xl border border-border bg-paper p-5">
            <h2 className="font-serif text-lg font-semibold text-bois-dark">Vos postes</h2>
            <div className="mt-3 space-y-2.5">
              {POSTES.map((p) => (
                <div key={p.key} className="flex items-center justify-between gap-3 border-b border-border/60 pb-2.5">
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-medium text-ink">{p.label}</div>
                    <div className="text-[11px] text-muted">
                      {euro(p.low)} à {euro(p.high)} / {p.unit}
                    </div>
                  </div>
                  <input
                    type="number"
                    min={0}
                    value={qty[p.key] ?? ""}
                    onChange={(e) => setN(p.key, e.target.value)}
                    placeholder="0"
                    className={inputCls}
                    aria-label={`Quantité : ${p.label}`}
                  />
                </div>
              ))}
            </div>

            <h2 className="mt-5 font-serif text-lg font-semibold text-bois-dark">Niveau de finition</h2>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {GAMMES.map((g) => (
                <button
                  key={g.key}
                  onClick={() => {
                    setGamme(g.key);
                    setSent(false);
                  }}
                  className={`rounded-xl border p-3 text-left transition ${
                    gamme === g.key ? "border-terracotta bg-terracotta/5" : "border-border bg-cream hover:bg-sand"
                  }`}
                >
                  <div className="text-[13px] font-semibold text-bois-dark">{g.label}</div>
                  <div className="text-[11px] leading-snug text-muted">{g.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Résultat */}
          <div className="rounded-2xl border border-border bg-sand/40 p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">Fourchette indicative</div>
            {total > 0 ? (
              <>
                <div className="mt-2 font-serif text-3xl font-semibold text-bois-dark">
                  {euro(low)} <span className="text-muted">–</span> {euro(high)}
                </div>
                <p className="mt-3 text-[12.5px] leading-relaxed text-ink/85">{verdict}</p>

                {!sent ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="mt-4 space-y-2"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Votre courriel"
                      className="w-full rounded-lg border border-border bg-paper px-3 py-2 text-[13px] text-ink outline-none focus:border-clay/60"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-terracotta py-2 text-[13px] font-medium text-paper transition hover:bg-terracotta-dark"
                    >
                      Recevoir l'estimation détaillée
                    </button>
                  </form>
                ) : (
                  <div className="mt-4 rounded-lg border border-olive/30 bg-olive/5 p-3 text-[12.5px] text-olive">
                    Demande enregistrée. En conditions réelles, elle crée une <strong>fiche qualifiée</strong> dans
                    le CRM, prête pour une visite d'atelier (démonstration).
                  </div>
                )}
              </>
            ) : (
              <p className="mt-2 text-[13px] text-muted">Renseignez au moins un poste pour voir une fourchette.</p>
            )}

            <p className="mt-4 border-t border-border pt-3 text-[10.5px] leading-snug text-muted">
              Estimation indicative, hors pose et options. Le devis final est établi après visite et prise de mesures.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

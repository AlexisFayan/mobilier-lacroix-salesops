import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RenduNav, Section, SubCard } from "@/components/rendu/Section";
import { TamSamSom, SalesFunnel, ImpactEffortMatrix, CompetitorMap } from "@/components/rendu/Viz";
import { Src } from "@/components/rendu/Src";
import { KPIS, AI_USECASES, ROI, SOURCES } from "@/lib/rendu";
import Link from "next/link";

export const metadata = {
  title: "Rendu du projet — Mobilier Lacroix",
};

export default function RenduPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5">
        {/* Intro */}
        <div className="py-10 text-center">
          <span className="inline-block rounded-full border border-border bg-paper px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted">
            Le dossier noté, en un coup d'œil · /100
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-bois-dark sm:text-4xl">Rendu du projet</h1>
          <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-ink/80">
            Les 9 critères du barème, présentés visuellement et <strong>sourcés</strong>. Chiffres marché
            vérifiés (TAM/SAM/SOM, concurrents) — chaque source est cliquable en exposant.
          </p>
        </div>

        <RenduNav />

        {/* ───────── 1. IDENTITÉ DE MARQUE ───────── */}
        <Section id="c1" n={1} pts={10} eyebrow="Identité de marque" title="Le « pourquoi » & l'archétype Créateur">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-terracotta/30 bg-terracotta/5 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">Pourquoi · la mission</div>
              <p className="mt-1.5 font-serif text-lg text-bois-dark">
                Donner une âme aux lieux où les gens se réunissent.
              </p>
              <p className="mt-1 text-[12px] text-muted">Jamais le produit — le changement qu'on apporte.</p>
            </div>
            <div className="rounded-2xl border border-border bg-paper p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-bois">Comment · le moyen</div>
              <p className="mt-1.5 text-[14px] text-ink/90">
                L'artisanat du sur-mesure, le savoir-faire d'atelier, l'accompagnement de bout en bout.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-paper p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Quoi · le produit</div>
              <p className="mt-1.5 text-[14px] text-ink/90">
                Du mobilier sur mesure pour le CHR, conçu pour durer et porter l'identité du lieu.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-sand/40 p-5">
            <h3 className="font-serif text-lg font-semibold text-bois-dark">Archétype : le Créateur</h3>
            <p className="mt-1 text-[13px] text-ink/80">
              Donner forme à une vision, créer de l'unique et du durable (Mark &amp; Pearson, 2001).
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-4">
              {[
                ["Ton", "chaleureux, fier du métier, sans pression"],
                ["Vocabulaire", "la matière : chêne, noyer, frêne, velours"],
                ["Visuels", "atelier, copeaux, finitions, mains"],
                ["Promesse", "« façonné pour durer »"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border bg-paper p-3">
                  <div className="text-[10.5px] font-semibold uppercase tracking-wide text-terracotta-dark">{k}</div>
                  <div className="mt-0.5 text-[12.5px] text-ink/85">{v}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12px] italic text-muted">
              Bonus : cette voix cadre le ton du copilote IA (relances « dans le ton »).
            </p>
          </div>
        </Section>

        {/* ───────── 2. MARCHÉ & ICP ───────── */}
        <Section id="c2" n={2} pts={10} eyebrow="Marché, concurrents & ICP" title="Un marché de niche, ancré en AURA">
          <div className="grid gap-4 lg:grid-cols-2">
            <SubCard title="Client idéal (ICP)">
              <p className="text-[13px] leading-relaxed text-ink/85">
                Restaurateur, cafetier ou hôtelier <strong>indépendant de Lyon / AURA</strong>, en
                <strong> création ou rénovation</strong>, budget <strong>5–15 k€</strong>, attaché au sur-mesure
                local et durable plutôt qu'au prix. Cible miroir : <strong>agenceurs &amp; architectes</strong>
                prescripteurs cherchant un fabricant fiable en marque blanche.
              </p>
              <ul className="mt-3 space-y-1.5 text-[12.5px] text-ink/80">
                <li>• Restaurants &amp; cafés indé. (Métropole de Lyon : ~5 280 restaurants<Src ids={["onlylyon-resto"]} />)</li>
                <li>• Hôtels 3-4★ en montée en gamme (384 hôtels 4-5★ en AURA<Src ids={["aura-hotel"]} />)</li>
                <li>• Agenceurs / architectes (sous-traitance marque blanche)</li>
                <li>• Clients existants : réfection de banquettes (récurrent)</li>
              </ul>
            </SubCard>
            <SubCard title="Dimensionnement — TAM / SAM / SOM">
              <TamSamSom />
            </SubCard>
          </div>

          <h3 className="mb-3 mt-8 font-serif text-lg font-semibold text-bois-dark">Cartographie concurrentielle</h3>
          <CompetitorMap />

          <h3 className="mb-3 mt-8 font-serif text-lg font-semibold text-bois-dark">Tendances porteuses</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-paper p-4 text-[12.5px] text-ink/85">
              📈 <strong>Premiumisation hôtelière</strong> : 28 % du parc en 4-5★ (vs ~10 % en 2010)<Src ids={["coach-omnium"]} /> → demande de mobilier sur-mesure de qualité.
            </div>
            <div className="rounded-xl border border-border bg-paper p-4 text-[12.5px] text-ink/85">
              🪵 <strong>Sur-mesure, made in France &amp; éco-conception</strong> : ~1 meuble sur 4 d'occasion<Src ids={["fevad-circulaire"]} /> → argument réfection/réemploi.
            </div>
            <div className="rounded-xl border border-border bg-paper p-4 text-[12.5px] text-ink/85">
              🔁 <strong>Roulement du parc CHR</strong> : défaillances resto +21 %<Src ids={["altares-umih"]} /> mais créations AURA +15,7 %<Src ids={["insee-aura-creations"]} /> → flux continu de projets.
            </div>
            <div className="rounded-xl border border-border bg-paper p-4 text-[12.5px] text-ink/85">
              📍 <strong>AURA, bassin majeur</strong> : 2e région CHR (16 679 ét.)<Src ids={["umih-hcr"]} />, Lyon 2e parc hôtelier<Src ids={["onlylyon-tourisme"]} /> → la proximité est un avantage.
            </div>
          </div>
        </Section>

        {/* ───────── 3. DIAGNOSTIC FUNNEL & IRRITANTS ───────── */}
        <Section id="c3" n={3} pts={13} eyebrow="Diagnostic" title="Le funnel reconstruit & les fuites">
          <div className="grid gap-8 lg:grid-cols-2">
            <SubCard title="Funnel commercial (par mois)">
              <SalesFunnel />
              <p className="mt-4 text-[12px] text-muted">
                Vente « à l'instinct » : le funnel n'était pas mesuré — reconstitué à partir des ordres de
                grandeur de l'entreprise (15-20 demandes → 3-5 signés).
              </p>
            </SubCard>
            <SubCard title="Irritants priorisés (impact / effort)">
              <ImpactEffortMatrix />
            </SubCard>
          </div>
          <div className="mt-4 rounded-xl border border-rouille/40 bg-rouille/5 p-4 text-[13px] text-ink/85">
            <strong className="text-rouille">La fuite n°1 :</strong> des devis envoyés puis jamais relancés
            partent chez un concurrent. C'est exactement ce que le prototype détecte et corrige (alerte
            « à relancer » + copilote).
          </div>
        </Section>

        {/* ───────── 4. PLAN D'ACTION SALESOPS ───────── */}
        <Section id="c4" n={4} pts={15} eyebrow="Plan d'action" title="Process · Outils · Gouvernance">
          <div className="grid gap-4 lg:grid-cols-3">
            <SubCard title="⚙️ Process">
              <ul className="space-y-2 text-[12.5px] text-ink/85">
                <li>• Pipeline standardisé (7 étapes claires)</li>
                <li>• Qualification systématique des demandes entrantes</li>
                <li>• <strong>Relance des devis sous 72 h</strong> (fin de la fuite)</li>
                <li>• Suivi dédié des prescripteurs (agenceurs)</li>
              </ul>
            </SubCard>
            <SubCard title="🧰 Outils">
              <ul className="space-y-2 text-[12.5px] text-ink/85">
                <li>• <strong>CRM = le prototype</strong> (pipeline + IA)</li>
                <li>• Automatisation des rappels de relance</li>
                <li>• Tableau de bord KPI (Looker Studio)</li>
                <li>• 100 % gratuit &amp; conforme RGPD (UE)</li>
              </ul>
            </SubCard>
            <SubCard title="👥 Gouvernance">
              <ul className="space-y-2 text-[12.5px] text-ink/85">
                <li>• Point quotidien 5 min (pipeline du jour)</li>
                <li>• Revue hebdo des relances &amp; devis</li>
                <li>• Bilan mensuel chiffré (KPI)</li>
                <li>• RACI : qui Fait / Approuve / Consulté / Informé</li>
              </ul>
            </SubCard>
          </div>
        </Section>

        {/* ───────── 5. KPI ───────── */}
        <Section id="c5" n={5} pts={9} eyebrow="Indicateurs & dimensionnement" title="Des KPI qui mènent à une décision">
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-sand text-bois-dark">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Indicateur</th>
                  <th className="px-4 py-2.5 font-semibold">Aujourd'hui</th>
                  <th className="px-4 py-2.5 font-semibold">Cible</th>
                  <th className="hidden px-4 py-2.5 font-semibold sm:table-cell">Détail</th>
                </tr>
              </thead>
              <tbody>
                {KPIS.map((k, i) => (
                  <tr key={k.kpi} className={i % 2 ? "bg-paper" : "bg-cream/60"}>
                    <td className="px-4 py-2.5 font-medium text-ink">{k.kpi}</td>
                    <td className="px-4 py-2.5 text-muted">{k.actuel}</td>
                    <td className="px-4 py-2.5 font-semibold text-olive">{k.cible}</td>
                    <td className="hidden px-4 py-2.5 text-muted sm:table-cell">{k.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12.5px] text-muted">
            Cible business (SOM) : <strong className="text-bois-dark">≈ 0,55 M€/an</strong>, atteinte surtout par un
            <strong> meilleur taux de conversion</strong> (relances) plutôt que par plus de leads payants.
          </p>
        </Section>

        {/* ───────── 6. IA — CAS D'USAGE ───────── */}
        <Section id="c6" n={6} pts={18} eyebrow="Pertinence & profondeur de l'IA" title="3 cas d'usage ancrés dans le funnel">
          <div className="grid gap-4 lg:grid-cols-3">
            {AI_USECASES.map((u) => (
              <div key={u.titre} className="rounded-2xl border border-border bg-paper p-5">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{u.icon}</span>
                  <span className="rounded-full bg-sand px-2 py-0.5 text-[10px] font-medium text-bois-dark">{u.etape}</span>
                </div>
                <h3 className="mt-2 font-serif text-lg font-semibold text-bois-dark">{u.titre}</h3>
                <div className="mt-3 space-y-2 text-[12px]">
                  <p><span className="font-semibold text-rouille">Irritant :</span> <span className="text-ink/80">{u.irritant}</span></p>
                  <p><span className="font-semibold text-bois">Cas d'usage :</span> <span className="text-ink/80">{u.cas}</span></p>
                  <p><span className="font-semibold text-olive">Indicateur :</span> <span className="text-ink/80">{u.indicateur}</span></p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-olive/30 bg-olive/5 p-4 text-[12.5px]">
              <strong className="text-olive">✅ IA utile</strong> — résout un irritant précis, ancrée dans une étape du funnel, avec un indicateur mesurable.
            </div>
            <div className="rounded-xl border border-border bg-paper p-4 text-[12.5px]">
              <strong className="text-muted">❌ IA gadget (évitée)</strong> — « on a mis ChatGPT quelque part », sans problème réel ni mesure.
            </div>
          </div>
        </Section>

        {/* ───────── 7. GARDE-FOUS & ROI ───────── */}
        <Section id="c7" n={7} pts={10} eyebrow="Garde-fous & ROI de l'IA" title="Une IA gratuite, responsable et rentable">
          <div className="grid gap-4 lg:grid-cols-2">
            <SubCard title="🛡️ Garde-fous (RGPD)">
              <ul className="space-y-2.5 text-[12.5px] text-ink/85">
                <li>🇫🇷 <strong>Mistral AI</strong> — éditeur français, hébergement UE. L'API n'entraîne pas les modèles sur les données par défaut<Src ids={["mistral-privacy"]} />.</li>
                <li>👤 <strong>Contrôle humain</strong> — l'IA propose, l'humain valide : chaque relance est relue avant envoi.</li>
                <li>🔐 <strong>Minimisation</strong> — seules les infos utiles sont envoyées ; repli auto (Groq<Src ids={["groq-limits"]} />) puis simulé si besoin.</li>
              </ul>
            </SubCard>
            <SubCard title="💶 ROI">
              <ul className="space-y-1.5 text-[12.5px] text-ink/85">
                {ROI.hypotheses.map((h) => (
                  <li key={h}>• {h}</li>
                ))}
              </ul>
              <div className="mt-3 space-y-2">
                <div className="rounded-lg bg-cream px-3 py-2 text-[12.5px]">
                  ⏱️ <strong className="text-bois-dark">{ROI.gainMensuel}</strong>
                </div>
                <div className="rounded-lg bg-cream px-3 py-2 text-[12.5px]">
                  💰 <strong className="text-bois-dark">{ROI.gainConversion}</strong>
                </div>
                <div className="rounded-lg border border-olive/30 bg-olive/5 px-3 py-2 text-[12.5px] text-olive">
                  {ROI.conclusion}
                </div>
              </div>
            </SubCard>
          </div>
        </Section>

        {/* ───────── 8. PROTOTYPE ───────── */}
        <Section id="c8" n={8} pts={10} eyebrow="Prototype qui marche" title="Le copilote SalesOps, jouable en direct">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-paper to-sand/40 p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-[13.5px] leading-relaxed text-ink/85">
                  Un vrai outil qui tourne : pipeline des 16 projets, <strong>scoring IA des devis</strong>,
                  <strong> copilote de relance</strong> et <strong>résumé d'échanges</strong>. L'IA est visible
                  et démontrable — vrais appels à Mistral, avec repli pour ne jamais tomber en panne.
                </p>
                <Link
                  href="/crm"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-[13px] font-medium text-paper transition hover:bg-terracotta-dark"
                >
                  🛠️ Ouvrir le prototype →
                </Link>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-[12px]">
                {["📊 Pipeline", "🎯 Scoring IA", "✍️ Relance", "🧾 Résumé", "📈 KPI live", "⚠️ Alerte fuite"].map((f) => (
                  <li key={f} className="rounded-lg border border-border bg-paper px-3 py-2 text-ink/85">{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ───────── 9. POSTURE & SOURCES ───────── */}
        <Section id="c9" n={9} pts={5} eyebrow="Posture conseil & rigueur" title="Méthode & sources">
          <div className="rounded-2xl border border-border bg-paper p-5">
            <h3 className="font-serif text-lg font-semibold text-bois-dark">Honnêteté intellectuelle</h3>
            <p className="mt-1 text-[13px] text-ink/80">
              Le <strong>TAM (675 M€)</strong> est un chiffre de filière vérifié. Le <strong>SAM</strong> et le
              <strong> SOM</strong> sont des <strong>estimations d'expert</strong> présentées en fourchettes, avec
              hypothèses explicites — un chiffre défendable vaut mieux qu'un chiffre énorme et faux. Les données
              ont été recoupées sur sources primaires (INSEE, UMIH, filière) puis relues de façon critique.
            </p>
          </div>

          <h3 className="mb-3 mt-6 font-serif text-lg font-semibold text-bois-dark">Sources ({SOURCES.length})</h3>
          <ol className="grid gap-1.5 sm:grid-cols-2">
            {SOURCES.map((s, i) => (
              <li key={s.id} className="flex gap-2 text-[11.5px] leading-snug">
                <span className="font-semibold text-terracotta-dark">[{i + 1}]</span>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-ink/80 hover:text-terracotta-dark hover:underline">
                  <strong className="text-ink">{s.org}</strong> — {s.title}
                </a>
              </li>
            ))}
          </ol>
        </Section>
      </main>
      <Footer />
    </>
  );
}

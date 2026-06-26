import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RenduNav, Section, SubCard, PhaseHeader, PHASES } from "@/components/rendu/Section";
import { TamSamSom, SalesFunnel, ImpactEffortMatrix, CompetitorMap, N8nWorkflow, InstagramPost } from "@/components/rendu/Viz";
import { Src } from "@/components/rendu/Src";
import { KPIS, AI_USECASES, ROI, SOURCES, ICP, SOURCE_THEMES, LEAD_MAGNETS, CONTENU, PLAN_BALANCE, STACK, FICHE, AUTOMATION, BENCHMARK_IA, PERSONAS, INCERTITUDES, srcIndex } from "@/lib/rendu";
import Link from "next/link";

export const metadata = {
  title: "Le dossier · Mobilier Lacroix",
  description: "Les 9 critères du dossier noté, en 4 temps, avec sources vérifiées : marché, tunnel de vente, plan SalesOps, IA et garde-fous.",
};

export default function RenduPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5">
        {/* Intro */}
        <div className="py-10 text-center">
          <span className="inline-block rounded-full border border-border bg-paper px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted">
            Le dossier noté · /100
          </span>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-bois-dark sm:text-4xl">Le dossier, pas à pas</h1>
          <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-ink/80">
            Ce dossier suit la démarche d'un cabinet de conseil, en 4 temps. Les 9 critères du barème
            y sont rattachés, et chaque chiffre du marché est sourcé (cliquable en exposant).
          </p>
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4">
            {PHASES.map((ph) => (
              <a key={ph.key} href={`#${ph.key}`} className="rounded-xl border border-border bg-paper px-3 py-2.5 text-left transition hover:border-clay/50 hover:bg-sand">
                <div className="font-serif text-lg font-semibold text-terracotta-dark">{ph.n}</div>
                <div className="text-[12.5px] font-medium text-bois-dark">{ph.title}</div>
              </a>
            ))}
          </div>
        </div>

        <RenduNav />

        {/* =================== 01 COMPRENDRE =================== */}
        <PhaseHeader n={PHASES[0].n} id={PHASES[0].key} title={PHASES[0].title} desc={PHASES[0].desc} />

        {/* Carte d'identité de l'entreprise */}
        <div className="mt-2 rounded-2xl border border-border bg-paper p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-serif text-lg font-semibold text-bois-dark">Carte d'identité : {FICHE.nom}</h3>
            <span className="rounded-full bg-sand px-2.5 py-0.5 text-[11px] font-medium text-bois-dark">Fiche d'entreprise</span>
          </div>
          <p className="mt-1 text-[13px] text-ink/80">{FICHE.activite}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {FICHE.faits.map((f) => (
              <div key={f.k} className="rounded-xl border border-border bg-cream/60 p-2.5">
                <div className="text-[10px] uppercase tracking-wide text-muted">{f.k}</div>
                <div className="mt-0.5 text-[12.5px] font-medium text-bois-dark">{f.v}</div>
              </div>
            ))}
          </div>
        </div>

        <Section id="c1" n={1} pts={10} eyebrow="Identité de marque" title="Le « pourquoi » & les archétypes">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-terracotta/30 bg-terracotta/5 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">Pourquoi · la mission</div>
              <p className="mt-1.5 font-serif text-lg text-bois-dark">Offrir à chaque lieu de rencontre un morceau d'histoire française.</p>
              <p className="mt-1 text-[12px] text-muted">Jamais le produit : le changement qu'on apporte.</p>
            </div>
            <div className="rounded-2xl border border-border bg-paper p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-bois">Comment · le moyen</div>
              <p className="mt-1.5 text-[14px] text-ink/90">Un savoir-faire artisanal français, à Lyon : la matière, le raffinement et l'accompagnement qui font qu'on se sent chez soi.</p>
            </div>
            <div className="rounded-2xl border border-border bg-paper p-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Quoi · le produit</div>
              <p className="mt-1.5 text-[14px] text-ink/90">Du mobilier sur mesure pour le CHR, conçu pour durer et porter l'histoire du lieu.</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-border bg-sand/40 p-5">
            <h3 className="font-serif text-lg font-semibold text-bois-dark">Archétypes : le Créateur + l'Amant</h3>
            <p className="mt-1 text-[13px] text-ink/80">
              Principal, <strong className="text-bois-dark">le Créateur</strong> : donner forme à une vision, créer de l'unique et du durable. Secondaire, <strong className="text-bois-dark">l'Amant</strong> (famille de l'appartenance) : le raffinement, l'émotion et le sentiment d'être chez soi (Mark &amp; Pearson, 2001).
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-4">
              {[
                ["Ton", "chaleureux et raffiné, fier du savoir-faire français"],
                ["Vocabulaire", "la matière et l'émotion : chêne, noyer, velours, patine"],
                ["Visuels", "atelier lyonnais, mains, finitions, lumière chaude"],
                ["Promesse", "« un morceau d'histoire, façonné pour durer »"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border bg-paper p-3">
                  <div className="text-[10.5px] font-semibold uppercase tracking-wide text-terracotta-dark">{k}</div>
                  <div className="mt-0.5 text-[12.5px] text-ink/85">{v}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12px] italic text-muted">Cette voix cadre aussi le ton du copilote IA (relances « dans le ton »).</p>
          </div>
        </Section>

        <Section id="c2" n={2} pts={10} eyebrow="Marché, concurrents & ICP" title="Un marché de niche, ancré en AURA">
          {/* ICP pleine largeur */}
          <div className="rounded-2xl border border-border bg-sand/40 p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="lg:w-2/5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">Client idéal (ICP)</div>
                <p className="mt-2 font-serif text-[17px] leading-snug text-bois-dark">{ICP.oneLiner}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ICP.attributs.map((a) => (
                    <span key={a.k} className="rounded-full border border-border bg-paper px-3 py-1 text-[11.5px]">
                      <span className="text-muted">{a.k} : </span>
                      <strong className="text-bois-dark">{a.v}</strong>
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:flex-1">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">Segments cibles</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {ICP.segments.map((s) => (
                    <div key={s.label} className="rounded-xl border border-border bg-paper p-3">
                      <div className="text-[12.5px] font-semibold text-bois-dark">{s.label}</div>
                      <p className="mt-0.5 text-[11.5px] leading-snug text-ink/75">
                        {s.desc}
                        <Src ids={s.src} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Personas */}
          <h3 className="mb-3 mt-8 font-serif text-lg font-semibold text-bois-dark">Deux clients types</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {PERSONAS.map((p) => (
              <div key={p.nom} className="rounded-2xl border border-border bg-paper p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-serif text-base font-semibold text-bois-dark">{p.nom}</div>
                  <span className="shrink-0 rounded-full bg-sand px-2 py-0.5 text-[10px] text-bois-dark">{p.budget}</span>
                </div>
                <div className="text-[11.5px] text-muted">{p.role}</div>
                <p className="mt-2 text-[12px] leading-snug text-ink/80">{p.trait}</p>
              </div>
            ))}
          </div>

          {/* TAM / SAM / SOM */}
          <h3 className="mb-3 mt-8 font-serif text-lg font-semibold text-bois-dark">Dimensionnement du marché</h3>
          <TamSamSom />

          {/* Concurrents */}
          <h3 className="mb-1 mt-8 font-serif text-lg font-semibold text-bois-dark">Carte de positionnement concurrentiel</h3>
          <p className="mb-3 text-[12.5px] text-muted">Gamme (série → sur-mesure) selon l'ancrage (national → local). 14 acteurs réels recensés, profils recoupés via Pappers / Societe.com (ex. City Mobilier, Oullins : effectif &lt; 10, comptes confidentiels)<Src ids={["pappers-city"]} />.</p>
          <CompetitorMap />

          {/* Tendances */}
          <h3 className="mb-3 mt-8 font-serif text-lg font-semibold text-bois-dark">Tendances porteuses</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-paper p-4 text-[12.5px] text-ink/85">
              <strong>Premiumisation hôtelière</strong> : 28 % du parc classé en 4-5 étoiles<Src ids={["umih-hcr"]} />, part haut de gamme en forte hausse (19 % en 2024 contre 5 % en 2010)<Src ids={["coach-omnium"]} />, donc une demande de mobilier sur-mesure de qualité.
            </div>
            <div className="rounded-xl border border-border bg-paper p-4 text-[12.5px] text-ink/85">
              <strong>Sur-mesure, fabrication française &amp; éco-conception</strong> : la seconde main monte en puissance dans l'ameublement<Src ids={["fevad-circulaire"]} />, un argument réfection et réemploi.
            </div>
            <div className="rounded-xl border border-border bg-paper p-4 text-[12.5px] text-ink/85">
              <strong>Roulement du parc CHR</strong> : défaillances resto +21 %<Src ids={["altares-umih"]} /> mais le tertiaire marchand AURA reste créateur (+15,7 %)<Src ids={["insee-aura-creations"]} />, un flux continu de projets.
            </div>
            <div className="rounded-xl border border-border bg-paper p-4 text-[12.5px] text-ink/85">
              <strong>AURA, bassin majeur</strong> : 2e région CHR (16 679 ét.)<Src ids={["umih-hcr"]} />, Lyon 2e parc hôtelier<Src ids={["onlylyon-tourisme"]} />, la proximité devient un avantage.
            </div>
          </div>
        </Section>

        {/* =================== 02 DIAGNOSTIQUER =================== */}
        <PhaseHeader n={PHASES[1].n} id={PHASES[1].key} title={PHASES[1].title} desc={PHASES[1].desc} />

        <Section id="c3" n={3} pts={13} eyebrow="Diagnostic" title="Le tunnel de vente reconstruit & les fuites">
          <div className="grid gap-8 lg:grid-cols-2">
            <SubCard title="Tunnel commercial (par mois)">
              <SalesFunnel />
              <p className="mt-4 text-[12px] text-muted">
                Vente « à l'instinct » : le tunnel n'était pas mesuré, reconstitué à partir des ordres de
                grandeur de l'entreprise (15-20 demandes, 3-5 signés).
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

        {/* =================== 03 RECOMMANDER =================== */}
        <PhaseHeader n={PHASES[2].n} id={PHASES[2].key} title={PHASES[2].title} desc={PHASES[2].desc} />

        <Section id="c4" n={4} pts={15} eyebrow="Plan d'action" title="Attirer, convertir, piloter">
          <p className="mb-5 max-w-3xl text-[13.5px] leading-relaxed text-ink/80">
            Un plan complet ne fait pas que conclure. Il faut d'abord <strong>attirer et capter</strong>
            (marketing de contenu à bas coût, cohérent avec un budget d'environ 250 €/mois), puis
            <strong> qualifier et convertir</strong> (commercial). L'IA fait le pont entre les deux.
          </p>

          <div className="grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="rounded-2xl border border-gold/40 bg-gold/5 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-[#8a6d1d]">{PLAN_BALANCE.marketing.titre}</div>
              <ul className="mt-2 space-y-1 text-[12px] text-ink/85">
                {PLAN_BALANCE.marketing.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className="hidden items-center font-serif text-xl text-clay sm:flex" aria-hidden>→</div>
            <div className="rounded-2xl border border-terracotta/40 bg-terracotta/5 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">{PLAN_BALANCE.ia.titre}</div>
              <ul className="mt-2 space-y-1 text-[12px] text-ink/85">
                {PLAN_BALANCE.ia.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className="hidden items-center font-serif text-xl text-clay sm:flex" aria-hidden>→</div>
            <div className="rounded-2xl border border-olive/40 bg-olive/5 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-olive">{PLAN_BALANCE.commercial.titre}</div>
              <ul className="mt-2 space-y-1 text-[12px] text-ink/85">
                {PLAN_BALANCE.commercial.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          </div>

          <h3 className="mb-1 mt-8 font-serif text-lg font-semibold text-bois-dark">Les aimants à prospects (lead magnets)</h3>
          <p className="mb-3 text-[12.5px] text-muted">Cinq aimants à bas coût pour re-remplir le haut du tunnel chaque mois, en visant la qualité des demandes et le panier (hôtels, prescripteurs) plutôt que le volume, borné par la capacité de l'atelier.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LEAD_MAGNETS.map((m) => (
              <div key={m.titre} className="rounded-2xl border border-border bg-paper p-4">
                <div className="font-serif text-[15px] font-semibold text-bois-dark">{m.titre}</div>
                <p className="mt-1 text-[12px] leading-snug text-ink/80">{m.aimant}</p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[10.5px]">
                  <span className="rounded-full bg-sand px-2 py-0.5 text-bois-dark">{m.cible}</span>
                  <span className="rounded-full border border-border px-2 py-0.5 text-muted">{m.canal}</span>
                </div>
                <div className="mt-2 border-t border-border pt-2 text-[11px]">
                  <span className="font-semibold text-olive">KPI :</span> <span className="text-ink/80">{m.kpi}</span>
                </div>
                {m.href && (
                  <Link href={m.href} className="mt-2 inline-block text-[11.5px] font-medium text-terracotta-dark hover:underline">
                    Essayer →
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Capter par le contenu : SEO local, blog, Instagram */}
          <h3 className="mb-1 mt-8 font-serif text-lg font-semibold text-bois-dark">Capter par le contenu : le moteur d'acquisition</h3>
          <p className="mb-3 max-w-3xl text-[12.5px] text-muted">{CONTENU.intro}</p>

          <div className="mb-5 flex flex-wrap items-center gap-2">
            {CONTENU.flow.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className="rounded-xl border border-border bg-paper px-3 py-2 text-[12px] font-medium text-bois-dark">{s}</div>
                {i < CONTENU.flow.length - 1 && <span className="font-serif text-lg text-clay" aria-hidden>→</span>}
              </div>
            ))}
          </div>

          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_360px]">
            <div className="flex flex-col">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Des articles utiles, calés sur la recherche locale (SEO)</div>
              <div className="mt-2 flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-paper">
                {CONTENU.articles.map((a, i) => (
                  <div key={a.titre} className={`flex flex-1 items-center gap-3 px-4 py-3 ${i ? "border-t border-border" : ""}`}>
                    <div className="grow">
                      <div className="text-[12.5px] font-semibold leading-snug text-bois-dark">{a.titre}</div>
                      <div className="mt-0.5 text-[11px] leading-snug text-muted">{a.intent}</div>
                    </div>
                    <span className="shrink-0 rounded-full bg-olive/15 px-2.5 py-1 text-[10.5px] font-medium text-olive">→ {a.aimant}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 rounded-2xl border border-border bg-sand/40 px-4 py-3 sm:grid-cols-2">
                {CONTENU.cadence.map((c) => (
                  <div key={c.l} className="text-[12px]">
                    <span className="font-semibold text-bois-dark">{c.l} : </span>
                    <span className="text-ink/80">{c.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Instagram : la preuve par l'image (exemple)</div>
              <div className="mt-2"><InstagramPost /></div>
              <p className="mt-2 text-[11px] italic leading-snug text-muted">Le visuel montre le savoir-faire, la légende raconte l'histoire et ramène vers l'estimateur. On ne force jamais la vente.</p>
            </div>
          </div>

          <h3 className="mb-3 mt-8 font-serif text-lg font-semibold text-bois-dark">Process &amp; gouvernance</h3>
          <div className="grid gap-4 lg:grid-cols-2">
            <SubCard title="Process">
              <ul className="space-y-2 text-[12.5px] text-ink/85">
                <li>Pipeline standardisé (7 étapes claires)</li>
                <li>Qualification systématique des demandes entrantes</li>
                <li><strong>Relance des devis sous 72 h</strong> (fin de la fuite)</li>
                <li>Suivi dédié des prescripteurs (agenceurs)</li>
              </ul>
            </SubCard>
            <SubCard title="Gouvernance">
              <ul className="space-y-2 text-[12.5px] text-ink/85">
                <li>Point quotidien 5 min (pipeline du jour)</li>
                <li>Revue hebdo des relances &amp; devis</li>
                <li>Bilan mensuel chiffré (KPI)</li>
                <li>RACI par tâche (détaillé ci-dessous)</li>
              </ul>
            </SubCard>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-border">
            <div className="bg-sand px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-bois-dark">
              RACI, qui fait quoi
            </div>
            <table className="w-full text-left text-[12.5px]">
              <thead className="bg-cream/60 text-bois-dark">
                <tr>
                  <th className="px-4 py-2 font-semibold">Tâche</th>
                  <th className="px-3 py-2 text-center font-semibold">Gérant</th>
                  <th className="px-3 py-2 text-center font-semibold">Commercial</th>
                  <th className="px-3 py-2 text-center font-semibold">Atelier</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Qualification des demandes", "A", "R", "I"],
                  ["Acquisition (aimants, prescripteurs)", "R", "C", "I"],
                  ["Relance des devis (sous 72 h)", "A", "R", "I"],
                  ["Supervision IA (relances relues)", "A", "R", "I"],
                  ["Mise à jour du CRM", "C", "R", "C"],
                  ["Chiffrage et devis", "A", "C", "R"],
                  ["Bilan mensuel (KPI)", "R", "C", "I"],
                ].map((row, i) => (
                  <tr key={row[0]} className={i % 2 ? "bg-paper" : "bg-cream/40"}>
                    <td className="px-4 py-2 font-medium text-ink">{row[0]}</td>
                    {row.slice(1).map((v, j) => (
                      <td key={j} className="px-3 py-2 text-center">
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                            v === "R"
                              ? "bg-terracotta text-paper"
                              : v === "A"
                              ? "bg-bois-dark text-paper"
                              : "text-muted"
                          }`}
                        >
                          {v}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t border-border bg-paper px-4 py-2 text-[10.5px] text-muted">
              R = Réalise · A = Garant (décideur) · C = Consulté · I = Informé
            </div>
          </div>

          <h3 className="mb-3 mt-8 font-serif text-lg font-semibold text-bois-dark">Outils retenus (gratuit, RGPD / UE)</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STACK.map((s) => (
              <div key={s.poste} className="rounded-2xl border border-border bg-paper p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">{s.poste}</div>
                <div className="mt-1 text-[12.5px] font-medium text-bois-dark">{s.choix}</div>
                <div className="mt-0.5 text-[11px] text-muted">{s.pourquoi}</div>
                <div className="mt-1 text-[10.5px] text-muted/80">Limite : {s.limite}</div>
              </div>
            ))}
          </div>

          {/* Automatisation de la relance (n8n) */}
          <h3 className="mb-1 mt-8 font-serif text-lg font-semibold text-bois-dark">Automatiser la relance (n8n)</h3>
          <p className="mb-3 text-[12.5px] text-muted">
            {AUTOMATION.pourquoi} Outil : {AUTOMATION.outil}.
          </p>

          {/* Le workflow réel, construit et exécuté en ligne */}
          <N8nWorkflow />
          <p className="mb-4 mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] text-muted">
            <span className="rounded-full bg-olive/15 px-2 py-0.5 text-[10px] font-semibold text-olive">Construit et exécuté en réel</span>
            En ligne sur notre instance n8n Cloud : Mistral (UE) renvoie un courriel prêt à relire, dans la voix de la marque. La relance est relue par un commercial avant l'envoi.
          </p>

          <div className="rounded-2xl border border-border bg-paper p-5">
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {AUTOMATION.etapes.map((e) => (
                <div
                  key={e.n}
                  className={`rounded-xl border p-3 ${
                    e.garde ? "border-terracotta/50 bg-terracotta/5" : "border-border bg-cream/50"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-bois-dark text-[10px] font-semibold text-paper">
                      {e.n}
                    </span>
                    <span className="rounded bg-sand px-1.5 py-0.5 text-[9px] font-medium text-muted">{e.role}</span>
                  </div>
                  <div className="mt-1.5 text-[12.5px] font-semibold text-bois-dark">{e.t}</div>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-ink/75">{e.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg border border-terracotta/30 bg-terracotta/5 px-3 py-2 text-[12px] text-ink/85">
              <strong className="text-terracotta-dark">Garde-fou humain : </strong>
              {AUTOMATION.garde}
            </div>
          </div>
        </Section>

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
            <strong> meilleur taux de conversion</strong> (relances) plutôt que par de l'acquisition payante.
          </p>
        </Section>

        <Section id="c6" n={6} pts={18} eyebrow="Pertinence & profondeur de l'IA" title="3 cas d'usage ancrés dans le tunnel">
          <div className="mb-5 rounded-2xl border border-border bg-paper p-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">Le pipeline IA, commun aux 3 cas</div>
            <div className="grid items-center gap-2 text-center text-[12px] sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
              <div className="rounded-xl border border-border bg-cream p-3">
                <div className="font-semibold text-bois-dark">Données du dossier</div>
                <div className="text-[11px] text-muted">étape, canal, panier, historique</div>
              </div>
              <div className="hidden font-serif text-xl text-clay sm:block" aria-hidden>→</div>
              <div className="rounded-xl border border-terracotta/40 bg-terracotta/5 p-3">
                <div className="font-semibold text-terracotta-dark">Moteur IA</div>
                <div className="text-[11px] text-muted">Mistral UE → Groq → simulé</div>
              </div>
              <div className="hidden font-serif text-xl text-clay sm:block" aria-hidden>→</div>
              <div className="rounded-xl border border-border bg-cream p-3">
                <div className="font-semibold text-bois-dark">Proposition</div>
                <div className="text-[11px] text-muted">score, relance ou fiche</div>
              </div>
              <div className="hidden font-serif text-xl text-clay sm:block" aria-hidden>→</div>
              <div className="rounded-xl border border-olive/40 bg-olive/5 p-3">
                <div className="font-semibold text-olive">Validation humaine</div>
                <div className="text-[11px] text-muted">l'humain décide et envoie</div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {AI_USECASES.map((u) => (
              <div key={u.titre} className="rounded-2xl border border-border bg-paper p-5">
                <span className="rounded-full bg-sand px-2 py-0.5 text-[10px] font-medium text-bois-dark">{u.etape}</span>
                <h3 className="mt-2 font-serif text-lg font-semibold text-bois-dark">{u.titre}</h3>
                <div className="mt-3 space-y-2 text-[12px]">
                  <p><span className="font-semibold text-rouille">Irritant :</span> <span className="text-ink/80">{u.irritant}</span></p>
                  <p><span className="font-semibold text-bois">Cas d'usage :</span> <span className="text-ink/80">{u.cas}</span></p>
                  <p><span className="font-semibold text-clay">Déroulé :</span> <span className="text-ink/80">{u.workflow}</span></p>
                  <p><span className="font-semibold text-muted">Données :</span> <span className="text-ink/80">{u.donnees}</span></p>
                  <p><span className="font-semibold text-muted">Outil :</span> <span className="text-ink/80">{u.outil}</span></p>
                  <p><span className="font-semibold text-olive">Indicateur :</span> <span className="text-ink/80">{u.indicateur}</span></p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-olive/30 bg-olive/5 p-4 text-[12.5px]">
              <strong className="text-olive">IA utile</strong> : résout un irritant précis, ancrée dans une étape du tunnel, avec un indicateur mesurable.
            </div>
            <div className="rounded-xl border border-border bg-paper p-4 text-[12.5px]">
              <strong className="text-muted">IA gadget (évitée)</strong> : « on a mis ChatGPT quelque part », sans problème réel ni mesure.
            </div>
          </div>
        </Section>

        <Section id="c7" n={7} pts={10} eyebrow="Garde-fous & ROI de l'IA" title="Une IA gratuite, responsable et rentable">
          <div className="grid gap-4 lg:grid-cols-2">
            <SubCard title="Garde-fous (RGPD)">
              <ul className="space-y-2.5 text-[12.5px] text-ink/85">
                <li><strong>Mistral AI</strong> : éditeur français, hébergement UE. L'API n'entraîne pas les modèles sur les données par défaut<Src ids={["mistral-privacy"]} />.</li>
                <li><strong>Contrôle humain</strong> : l'IA propose, l'humain valide ; chaque relance est relue avant envoi.</li>
                <li><strong>Minimisation</strong> : seules les infos utiles sont envoyées ; repli auto (Groq<Src ids={["groq-limits"]} />) puis simulé si besoin.</li>
                <li><strong>Base légale &amp; conservation</strong> : intérêt légitime (prospection B2B), données conservées le temps du projet puis archivées, prospect informé.</li>
              </ul>
            </SubCard>
            <SubCard title="ROI">
              <ul className="space-y-1.5 text-[12.5px] text-ink/85">
                {ROI.hypotheses.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="mt-3 space-y-2">
                <div className="rounded-lg bg-cream px-3 py-2 text-[12.5px]"><strong className="text-bois-dark">{ROI.gainMensuel}</strong></div>
                <div className="rounded-lg bg-cream px-3 py-2 text-[12.5px]"><strong className="text-bois-dark">{ROI.gainConversion}</strong></div>
                <div className="rounded-lg border border-olive/30 bg-olive/5 px-3 py-2 text-[12.5px] text-olive">{ROI.conclusion}</div>
              </div>
            </SubCard>
          </div>

          {/* Benchmark des fournisseurs d'IA */}
          <h3 className="mb-1 mt-8 font-serif text-lg font-semibold text-bois-dark">Pourquoi Mistral ? (benchmark des IA gratuites)</h3>
          <p className="mb-3 text-[12.5px] text-muted">5 fournisseurs comparés sur le gratuit, l'hébergement et l'usage des données.</p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[540px] text-left text-[12px]">
              <thead className="bg-sand text-bois-dark">
                <tr>
                  <th className="px-3 py-2 font-semibold">Fournisseur</th>
                  <th className="px-3 py-2 font-semibold">Gratuit</th>
                  <th className="px-3 py-2 font-semibold">Hébergement</th>
                  <th className="px-3 py-2 font-semibold">Entraîne sur vos données ?</th>
                  <th className="px-3 py-2 font-semibold">Note</th>
                  <th className="px-3 py-2 font-semibold">Rôle</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARK_IA.map((b, i) => (
                  <tr key={b.f} className={b.retenu === "Principal" ? "bg-terracotta/5" : i % 2 ? "bg-paper" : "bg-cream/50"}>
                    <td className="px-3 py-2 font-medium text-bois-dark">{b.f}</td>
                    <td className="px-3 py-2 text-ink/80">{b.gratuit}</td>
                    <td className="px-3 py-2 text-ink/80">{b.zone}</td>
                    <td className="px-3 py-2 text-ink/80">{b.training}</td>
                    <td className="px-3 py-2 font-semibold text-bois-dark">{b.note}</td>
                    <td className={`px-3 py-2 font-medium ${b.retenu === "Principal" ? "text-terracotta-dark" : b.retenu === "Repli" ? "text-olive" : "text-muted"}`}>{b.retenu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* =================== 04 DÉMONTRER =================== */}
        <PhaseHeader n={PHASES[3].n} id={PHASES[3].key} title={PHASES[3].title} desc={PHASES[3].desc} />

        <Section id="c8" n={8} pts={10} eyebrow="Prototype qui marche" title="Le copilote SalesOps, jouable en direct">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-paper to-sand/40 p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-[13.5px] leading-relaxed text-ink/85">
                  Un vrai outil qui tourne : pipeline des projets, <strong>scoring IA des devis</strong>,
                  <strong> copilote de relance</strong> et <strong>résumé d'échanges</strong>. L'IA est visible
                  et démontrable : vrais appels à Mistral, avec repli pour ne jamais tomber en panne.
                </p>
                <Link
                  href="/crm"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-[13px] font-medium text-paper transition hover:bg-terracotta-dark"
                >
                  Ouvrir le prototype →
                </Link>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-[12px]">
                {["Pipeline", "Scoring IA", "Relance", "Résumé", "Création de fiche", "Alerte fuite"].map((f) => (
                  <li key={f} className="rounded-lg border border-border bg-paper px-3 py-2 text-ink/85">{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="c9" n={9} pts={5} eyebrow="Posture conseil & rigueur" title="Méthode & sources">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-paper p-4">
              <div className="font-serif text-base font-semibold text-bois-dark">Sourcer</div>
              <p className="mt-1 text-[12.5px] text-ink/75">Chaque chiffre du marché renvoie à une source primaire (INSEE, UMIH, filière), citée et datée.</p>
            </div>
            <div className="rounded-2xl border border-border bg-paper p-4">
              <div className="font-serif text-base font-semibold text-bois-dark">Estimer honnêtement</div>
              <p className="mt-1 text-[12.5px] text-ink/75">TAM = chiffre dur. SAM et SOM = estimations en fourchettes, avec hypothèses explicites.</p>
            </div>
            <div className="rounded-2xl border border-border bg-paper p-4">
              <div className="font-serif text-base font-semibold text-bois-dark">Vérifier</div>
              <p className="mt-1 text-[12.5px] text-ink/75">Données recoupées et relues de façon critique : un chiffre défendable vaut mieux qu'un chiffre énorme et faux.</p>
            </div>
          </div>

          <p className="mt-4 rounded-xl border border-border bg-sand/40 p-4 text-[12.5px] text-ink/80">
            <strong>Recoupement multi-sources</strong> : données légales des sociétés via Pappers / Societe.com<Src ids={["pappers-city"]} />, demande et saisonnalité via Google Trends<Src ids={["google-trends"]} />, empreinte numérique des concurrents via Similarweb<Src ids={["similarweb"]} />, en complément des sources primaires (INSEE, UMIH, filière).
          </p>

          <div className="mt-4 rounded-xl border border-gold/40 bg-gold/5 p-4">
            <h4 className="font-serif text-[15px] font-semibold text-[#8a6d1d]">Ce que nous assumons (fourchettes &amp; limites)</h4>
            <ul className="mt-2 space-y-1 text-[12px] text-ink/80">
              {INCERTITUDES.map((x) => (
                <li key={x} className="flex gap-2"><span className="text-[#8a6d1d]">•</span><span>{x}</span></li>
              ))}
            </ul>
          </div>

          <h3 className="mb-1 mt-8 font-serif text-lg font-semibold text-bois-dark">Sources ({SOURCES.length})</h3>
          <p className="mb-3 text-[11.5px] text-muted">Liens et dates cliquables, consultés en juin 2026.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {SOURCE_THEMES.map((theme) => {
              const list = SOURCES.filter((s) => s.theme === theme);
              if (list.length === 0) return null;
              return (
                <div key={theme} className="rounded-2xl border border-border bg-paper p-4">
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-terracotta-dark">{theme}</div>
                  <ul className="space-y-1.5">
                    {list.map((s) => (
                      <li key={s.id} className="flex flex-wrap gap-x-1.5 text-[11.5px] leading-snug">
                        <span className="font-semibold text-muted">[{srcIndex(s.id)}]</span>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-ink/80 hover:text-terracotta-dark hover:underline">
                          <strong className="text-ink">{s.org}</strong> : {s.title}
                        </a>
                        <span className="text-muted">· {s.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

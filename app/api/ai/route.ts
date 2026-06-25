import { NextResponse } from "next/server";
import type { Project } from "@/lib/types";
import {
  scoreProject,
  generateRelance,
  summarizeExchanges,
  generateDevisReply,
  type DevisLeadInput,
} from "@/lib/ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { task, project, lead } = await req.json();

    // Première réponse à une demande de devis entrante (table devis_leads).
    if (task === "devis-reply") {
      if (!lead) {
        return NextResponse.json({ error: "Demande manquante" }, { status: 400 });
      }
      return NextResponse.json(await generateDevisReply(lead as DevisLeadInput));
    }

    if (!project) {
      return NextResponse.json({ error: "Projet manquant" }, { status: 400 });
    }
    const p = project as Project;
    switch (task) {
      case "score":
        return NextResponse.json(await scoreProject(p));
      case "relance":
        return NextResponse.json(await generateRelance(p));
      case "resume":
        return NextResponse.json(await summarizeExchanges(p));
      default:
        return NextResponse.json({ error: "Tâche inconnue" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

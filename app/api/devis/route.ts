import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Envoi d'un courriel au prospect via Resend, CÔTÉ SERVEUR uniquement.
 * La clé Resend reste secrète (variable d'environnement RESEND_API_KEY), jamais exposée au client.
 * Body attendu : { to, subject, message }.
 */
export async function POST(req: Request) {
  try {
    const { to, subject, message } = await req.json();
    if (!to || !message) {
      return NextResponse.json({ error: "Destinataire ou message manquant" }, { status: 400 });
    }
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Envoi indisponible : clé Resend non configurée côté serveur." },
        { status: 503 }
      );
    }

    const html = `<div style="font-family:Georgia,serif;color:#2a2320;line-height:1.6;white-space:pre-wrap;">${escapeHtml(
      String(message)
    )}</div>`;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Mobilier Lacroix <onboarding@resend.dev>",
        to: [to],
        subject: subject || "Votre projet sur mesure, Mobilier Lacroix",
        html,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      return NextResponse.json(
        { error: "Resend a refusé l'envoi", detail }, // ex. domaine non vérifié pour un destinataire externe
        { status: 502 }
      );
    }
    const j = await r.json();
    return NextResponse.json({ ok: true, id: j?.id ?? null });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

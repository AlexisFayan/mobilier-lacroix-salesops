import type { Project } from "./types";
import type { ScoreResult, RelanceResult, ResumeResult } from "./ai";

type Task = "score" | "relance" | "resume";

async function aiCall<T>(task: Task, project: Project): Promise<T> {
  const r = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, project }),
  });
  if (!r.ok) throw new Error("ai-failed");
  return (await r.json()) as T;
}

export const aiScore = (p: Project) => aiCall<ScoreResult>("score", p);
export const aiRelance = (p: Project) => aiCall<RelanceResult>("relance", p);
export const aiResume = (p: Project) => aiCall<ResumeResult>("resume", p);

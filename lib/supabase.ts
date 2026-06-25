import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase du prototype CRM.
 * URL + clé « publishable » (anon) : destinées au client, exposables par nature
 * (elles partent dans le bundle navigateur). La clé « secret » reste, elle,
 * uniquement côté n8n et n'apparaît jamais ici. Voir docs/automation.
 * On lit d'abord les variables d'environnement, avec repli sur les valeurs du projet
 * pour que le prototype fonctionne en ligne sans configuration supplémentaire.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://jqtrytvqxrufsuickgxz.supabase.co";
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_D9LAR6wEyuHFyek6SVcZKA_ItKQVTqK";

export const supabase = createClient(url, anonKey);

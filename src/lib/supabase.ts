import { createClient } from "@supabase/supabase-js";

// Lê das variáveis do Vite (.env na raiz) e faz fallback para process.env
const supabaseUrl =
  import.meta.env?.VITE_SUPABASE_URL ||
  (typeof process !== "undefined" ? process.env?.VITE_SUPABASE_URL : undefined);

const supabaseAnonKey =
  import.meta.env?.VITE_SUPABASE_ANON_KEY ||
  (typeof process !== "undefined" ? process.env?.VITE_SUPABASE_ANON_KEY : undefined);

if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [];
  if (!supabaseUrl) missing.push("VITE_SUPABASE_URL");
  if (!supabaseAnonKey) missing.push("VITE_SUPABASE_ANON_KEY");
  throw new Error(
    `Variáveis ausentes (${missing.join(
      ", "
    )}). Confirme o arquivo .env na raiz e reinicie o servidor (npm run dev).`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


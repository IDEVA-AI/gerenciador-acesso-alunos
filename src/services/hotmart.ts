import { supabase } from "@/lib/supabase";
import { HotmartPurchase, PurchaseStatus } from "@/types/domain";
import { cleanCPF } from "@/utils/cpf";

export type HotmartSearchType = "cpf" | "email" | "name";

const mapHotmartRow = (row: any): HotmartPurchase => {
  const status: PurchaseStatus =
    typeof row.status === "string" ? row.status.trim() : "desconhecido";
  return {
    id: row.id,
    buyerName: row.comprador_nome_completo,
    buyerEmail: row.comprador_email,
    buyerDocument: row.comprador_documento,
    productName: row.nome_do_produto,
    orderId: row.numero_pedido,
    status,
    purchaseDate: row.created_at,
  };
};

export const fetchHotmartPurchases = async (
  searchType: HotmartSearchType,
  rawValue: string
): Promise<HotmartPurchase[]> => {
  const value = rawValue.trim();

  if (!value) {
    throw new Error("Campo de busca não pode ser vazio.");
  }

  let query = supabase
    .from("hotmart")
    .select(
      "id,comprador_nome_completo,comprador_email,comprador_documento,nome_do_produto,numero_pedido,status,created_at"
    );

  if (searchType === "cpf") {
    query = query.eq("comprador_documento", cleanCPF(value));
  } else if (searchType === "email") {
    query = query.ilike("comprador_email", value.toLowerCase());
  } else if (searchType === "name") {
    query = query.ilike("comprador_nome_completo", value);
  }

  const { data, error } = await query.limit(50);

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapHotmartRow);
};


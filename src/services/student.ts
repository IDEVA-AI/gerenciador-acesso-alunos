import { supabase } from "@/lib/supabase";
import { HotmartPurchase, StudentRecord } from "@/types/domain";
import { cleanCPF } from "@/utils/cpf";

const mapStudentRow = (row: any): StudentRecord => ({
  id: row.id,
  name: row.name,
  email: row.email,
  documentNumber: row.document_number,
  documentType: row.document_type,
  planActive: row.plan_active,
  active: row.active,
  createdAt: row.created_at,
});

export const fetchStudentsByDocuments = async (documents: string[]): Promise<StudentRecord[]> => {
  if (!documents.length) return [];

  const uniqueDocs = Array.from(new Set(documents.map(cleanCPF))).filter(Boolean);

  if (!uniqueDocs.length) return [];

  const { data, error } = await supabase
    .from("student")
    .select("id,name,email,document_number,document_type,plan_active,active,created_at")
    .in("document_number", uniqueDocs);

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapStudentRow);
};

export const fetchStudentByDocumentOrEmail = async (params: {
  document?: string;
  email?: string;
}): Promise<StudentRecord | null> => {
  const conditions: string[] = [];

  if (params.document) {
    conditions.push(`document_number.eq.${cleanCPF(params.document)}`);
  }

  if (params.email) {
    conditions.push(`email.eq.${params.email.trim().toLowerCase()}`);
  }

  if (!conditions.length) {
    throw new Error("Documento ou e-mail são obrigatórios para consulta.");
  }

  const { data, error } = await supabase
    .from("student")
    .select("id,name,email,document_number,document_type,plan_active,active,created_at")
    .or(conditions.join(","))
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapStudentRow(data) : null;
};

export const registerStudentFromHotmart = async (
  purchase: HotmartPurchase
): Promise<{ student: StudentRecord; alreadyExists: boolean }> => {
  const existing = await fetchStudentByDocumentOrEmail({
    document: purchase.buyerDocument,
    email: purchase.buyerEmail,
  });

  if (existing) {
    return { student: existing, alreadyExists: true };
  }

  const { data, error } = await supabase
    .from("student")
    .insert({
      name: purchase.buyerName,
      email: purchase.buyerEmail.trim().toLowerCase(),
      document_number: cleanCPF(purchase.buyerDocument),
      document_type: "CPF",
      plan_active: true,
      active: true,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return { student: mapStudentRow(data), alreadyExists: false };
};

export const registerManualStudent = async (params: {
  name: string;
  cpf: string;
  email: string;
}): Promise<{ student: StudentRecord; alreadyExists: boolean }> => {
  const cleanedCpf = cleanCPF(params.cpf);
  const normalizedEmail = params.email.trim().toLowerCase();

  const existing = await fetchStudentByDocumentOrEmail({
    document: cleanedCpf,
    email: normalizedEmail,
  });

  if (existing) {
    return { student: existing, alreadyExists: true };
  }

  const { data, error } = await supabase
    .from("student")
    .insert({
      name: params.name.trim(),
      email: normalizedEmail,
      document_number: cleanedCpf,
      document_type: "CPF",
      plan_active: true,
      active: true,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return { student: mapStudentRow(data), alreadyExists: false };
};


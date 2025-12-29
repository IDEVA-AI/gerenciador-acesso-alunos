import * as bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { UserProfile } from "@/types/domain";

const mapAuthUser = (row: any): UserProfile => ({
  id: row.id,
  username: row.username,
  active: row.is_active,
  createdAt: row.created_at ?? null,
  updatedAt: row.updated_at ?? null,
});

export const signInWithUsername = async (
  username: string,
  password: string
): Promise<{ user: UserProfile | null; error: Error | null }> => {
  const normalized = username.trim().toLowerCase();

  const { data, error } = await supabase
    .from("auth_users")
    .select("id,username,password_hash,is_active,created_at,updated_at")
    .eq("username", normalized)
    .maybeSingle();

  if (error) {
    return { user: null, error };
  }

  if (!data) {
    return { user: null, error: new Error("Usuário ou senha inválidos.") };
  }

  if (data.is_active === false) {
    return { user: null, error: new Error("Usuário inativo ou sem permissão.") };
  }

  const isValid = await bcrypt.compare(password, data.password_hash);
  if (!isValid) {
    return { user: null, error: new Error("Usuário ou senha inválidos.") };
  }

  return { user: mapAuthUser(data), error: null };
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const getCurrentSession = async () => {
  return supabase.auth.getSession();
};

export const getUserProfile = async (username: string): Promise<UserProfile | null> => {
  const normalized = username.trim().toLowerCase();

  const { data, error } = await supabase
    .from("auth_users")
    .select("id,username,password_hash,is_active,created_at,updated_at")
    .eq("username", normalized)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) return null;

  return mapAuthUser(data);
};


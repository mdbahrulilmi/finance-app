import { supabase } from "@/config/supabase";

export const getPotMembers = async (potId: string) => {
  const { data, error } = await supabase
    .from("pot_members")
    .select(`
      id,
      role,
      user_id,
      user:profiles (
        id,
        full_name,
        username,
        avatar_url
      )
    `)
    .eq("pot_id", potId);

  if (error) throw new Error(error.message);

  return data;
};
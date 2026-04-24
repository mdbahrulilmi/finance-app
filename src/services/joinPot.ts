import { supabase } from "@/config/supabase";

export const joinPot = async (code: string) => {
  const { data: userData, error: userError } =
    await supabase.auth.getUser();

  if (userError) throw new Error("Auth error");

  const user = userData.user;
  if (!user) throw new Error("Login dulu");

  const { data: pot, error: potError } = await supabase
    .from("pots")
    .select("id")
    .eq("invite_code", code)
    .single();

  if (potError || !pot) {
    throw new Error("Pot tidak ditemukan");
  }

  const { data: existing, error: memberError } = await supabase
    .from("pot_members")
    .select("id")
    .eq("pot_id", pot.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (memberError) throw memberError;

  if (existing) {
    return { message: "Already joined" };
  }

  const { error: insertError } = await supabase
    .from("pot_members")
    .insert({
      pot_id: pot.id,
      user_id: user.id,
      role: "member",
    });

  if (insertError) throw insertError;

  return { message: "Joined successfully" };
};
import { supabase } from "@/config/supabase";
import type { Profile } from "@/types/Profile";

type _profile = Partial<Omit<Profile, "id" | "updated_at">>;

export const getProfile = async () => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const profile: Profile = data;

  return profile;
};

export const updateProfile = async (input: _profile) => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase
    .from("profiles")
    .update(input)
    .eq("id", user.id)

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
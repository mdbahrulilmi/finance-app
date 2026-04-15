import { supabase } from "@/config/supabase";
import type { Profile } from "@/types/Profile";

type _profile = Omit<Profile, "id" | "updated_at">;

const getProfile = async () => {
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

const updateProfile = async (input: _profile) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert([input])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
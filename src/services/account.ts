import { supabase } from "@/config/supabase";

export const getAccount = async () => {
  const { data: user } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.user?.id);  

  if (error) throw new Error(error.message);

  return data;
};
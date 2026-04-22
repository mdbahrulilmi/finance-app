import { supabase } from "@/config/supabase";

export const register = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return {
    user: data.user,
    session: data.session,
  };
};

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

   return {
    user: data.user,
    session: data.session,
  };
}; 

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "ilmi-finance.vercel.app"
    },
  });

  if (error) throw error;
  return data;
};
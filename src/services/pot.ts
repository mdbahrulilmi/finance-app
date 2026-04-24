import { supabase } from "@/config/supabase";

type PotInput = {
  name: string;
  target_amount: number;
  deadline?: string;
  image?: string;
};

type PotUpdate = {
  name?: string;
  target_amount?: number;
  deadline?: string;
};


export const createPot = async (input: PotInput) => {
  const generateCode = () => {
    const random = Math.random().toString(36).substring(2, 8);
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    return `${random}-${date}`;
    };

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) throw new Error("User not found");

  const { data: pot, error } = await supabase
    .from("pots")
    .insert({
      user_id: user.id,
      name: input.name,
      target_amount: input.target_amount,
      deadline: input.deadline,
      image: input.image,
      invite_code: generateCode()
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  const { error: memberError } = await supabase
    .from("pot_members")
    .insert({
      pot_id: pot.id,
      user_id: user.id,
      role: "owner",
    });

  if (memberError) throw new Error(memberError.message);

  return pot;
};

export const getPots = async () => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) throw new Error("User not found");

  const { data, error } = await supabase
    .from("pot_members")
    .select(`
      pot:pots (*)
    `)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  return data?.map((item) => item.pot);
};

export const getPotDetail = async (potId: string) => {
  const { data, error } = await supabase
    .from("pots")
    .select(`
      *,
      transactions (*)
    `)
    .eq("id", potId)
    .single();

  if (error) throw error;

  return data;
};

export const getPotById = async (potId: string) => {
  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .eq("id", potId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const updatePot = async (potId: string, input: PotUpdate) => {
  const { data, error } = await supabase
    .from("pots")
    .update(input)
    .eq("id", potId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const deletePot = async (potId: string) => {
  const { error } = await supabase
    .from("pots")
    .delete()
    .eq("id", potId);

  if (error) throw error;

  return { message: "Pot deleted" };
};

export const addPotTransaction = async (
  potId: string,
  type: "income" | "expense",
  amount: number,
  category_id: string,
  note?: string
) => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) throw new Error("Login dulu");

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    pot_id: potId,
    category_id,
    amount,
    type,
    note: note || (type === "income" ? "Setor Pot" : "Tarik Pot"),
    transaction_date: new Date().toISOString().split("T")[0],
  });

  if (error) throw error;

  return true;
};
import { supabase } from "@/config/supabase";

type _category = {
  name: string;
  type: "income" | "expense";
};

export const getCategory = async (type: "income" | "expense") => {
  const { data: user } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user.user?.id)
    .eq("type", type);

  if (error) throw new Error(error.message);

  return data;
};

export const addCategory = async (input:_category) => {
    const { data: user } = await supabase.auth.getUser();

    const {data, error} = await supabase
    .from('categories')
    .insert([
        {
        name: input.name,
        type: input.type,
        user_id: user.user?.id,
        }
    ])
    .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

type _category_update = {
  name: string;
};

export const updateCategory = async (
  id: string,
  input: _category_update
) => {
  const { data: user } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("categories")
    .update({
      name: input.name,
    })
    .eq("id", id)
    .eq("user_id", user.user?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
import { supabase } from "@/config/supabase";
import type { Transaction } from "@/types/Transaction";

type _transaction = Omit<Transaction, 'id' | 'created_at' | 'user_id'>;

export const getTransaction = async ({type}:{type?:string}) => {
    const { data: user } = await supabase.auth.getUser();

    let query = supabase
        .from("transactions")
        .select(`
            *,
            category:category_id (
                id,
                name
            )
            `)
        .eq("user_id", user.user?.id)
        .order("transaction_date", { ascending: false });

        if (type) {
        query = query.eq("type", type);
        }

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export const addTransaction = async (input: _transaction) => {
    const { data: user } = await supabase.auth.getUser();

    const {data, error} = await supabase
    .from('transactions')
    .insert([
        {
        amount: input.amount,
        note: input.note,
        type: input.type,
        transaction_date:input.transaction_date,
        user_id: user.user?.id,
        category_id: input.category_id,
        }
    ])
    .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export const updateTransaction = async (
  id: string,
  input: _transaction
) => {
  const { data: user } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("transactions")
    .update({
      amount: input.amount,
      note: input.note,
      type: input.type,
      transaction_date: input.transaction_date,
      category_id: input.category_id,
    })
    .eq("id", id)
    .eq("user_id", user.user?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
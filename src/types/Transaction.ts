export type Transaction = {
  id: string;
  amount: number;
  note: string;
  type: "income" | "expense";
  transaction_date: string;
  category_id: string;
  category?: {
    id: string;
    name: string;
  };
  account_id: string;
  account?: {
    id: string;
    name: string;
  }
  created_at:string;
};
export type Profile = {
  id: string;
  username: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  theme: string;
  created_at: string;
};
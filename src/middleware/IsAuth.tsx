import { useEffect, useState } from "react";
import { supabase } from "@/config/supabase";
import { Navigate, Outlet } from "react-router-dom";

export const IsAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setInitialized(true);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!initialized) return null;

  if (!user) return <Navigate to="/masuk" replace />;

  return <Outlet />;
};
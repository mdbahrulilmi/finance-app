import { useAuth } from "@/providers/AuthProviders";
import { Navigate, Outlet } from "react-router-dom";

export const IsAuth = () => {
  const { user, initialized } = useAuth();

  if (!initialized) return null;

  if (!user) return <Navigate to="/masuk" replace />;

  return <Outlet />;
};
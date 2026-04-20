import { Outlet, useLocation } from "react-router-dom";
import { NavigationBottom } from "@/components/layouts/NavigationBottom";
import { useThemeColor } from "@/components/ui/theme-context";
import { useAuth } from "@/providers/AuthProviders";

export default function Layout() {
  const { theme } = useThemeColor();
  const { user } = useAuth();
  const location = useLocation();

  const showRoutes = ["/", "/pemasukan", "/pengeluaran", "/laporan", "/akun"];
  const showNav = user && showRoutes.includes(location.pathname);

  return (
    <>
      <Outlet />
      {showNav && <NavigationBottom color={theme.primary} />}
    </>
  );
}
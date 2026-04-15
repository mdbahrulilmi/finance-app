import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { NavigationBottom } from "./components/layouts/NavigationBottom";
import Home from "./pages/Home/Home";
import { TransactionPage } from "./pages/Transaction/TransactionPage";
import Report from "./pages/Report/Report";
import Settings from "./pages/Settings/Settings";
import { useThemeColor } from "./components/ui/theme-context";
import TransactionForm from "./pages/Transaction/components/TransactionForm";
import { CategoryList } from "./pages/Settings/components/CategoryList";
import { CategoryForm } from "./pages/Settings/components/CategoryForm";
import { AuthForm } from "./pages/Auth/AuthForm";
import { IsAuth } from "./middleware/IsAuth";
import { useEffect, useState } from "react";
import { supabase } from "./config/supabase";

function AppContent() {
  const { theme } = useThemeColor();
  const location = useLocation();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const showBottomNavRoutes = [
    "/",
    "/pemasukan",
    "/pengeluaran",
    "/laporan",
    "/akun"
  ];

  const showNav = user && showBottomNavRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route element={<IsAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/pemasukan" element={<TransactionPage type="income" />} />
          <Route path="/pengeluaran" element={<TransactionPage type="expense" />} />
          <Route path="/laporan" element={<Report />} />
          <Route path="/akun" element={<Settings />} />
          <Route path="/pemasukan/form" element={<TransactionForm type="income" />} />
          <Route path="/pengeluaran/form" element={<TransactionForm type="expense" />} />
          <Route path="/kategori/pemasukan" element={<CategoryList title={"Kategori Pemasukan"}/>} />
          <Route path="/kategori/pengeluaran" element={<CategoryList title={"Kategori Pengeluaran"}/>} />
          <Route path="/kategori/pemasukan/create" element={<CategoryForm/>} />
          <Route path="/kategori/pengeluaran/create" element={<CategoryForm/>} />
        </Route>
        
        <Route path="/masuk" element={<AuthForm type="login" />} />
        <Route path="/daftar" element={<AuthForm type="register" />} />
        
      </Routes>

      {showNav && <NavigationBottom color={theme.primary} />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
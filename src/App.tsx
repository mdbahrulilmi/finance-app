import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { NavigationBottom } from "./components/layouts/NavigationBottom";
import Home from "./components/pages/Home";
import { TransactionPage } from "./components/pages/TransactionPage";
import Report from "./components/pages/Report";
import Account from "./components/pages/Account";
import { useThemeColor } from "./components/ui/theme-context";
import TransactionForm from "./components/layouts/TransactionForm";
import { CategoryList } from "./components/layouts/CategoryList";
import { CategoryForm } from "./components/layouts/CategoryForm";

function AppContent() {
  const { theme } = useThemeColor();
  const location = useLocation();

  const showBottomNavRoutes = [
    "/",
    "/pemasukan",
    "/pengeluaran",
    "/laporan",
    "/akun"
  ];

  const showNav = showBottomNavRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pemasukan" element={<TransactionPage type="income" />} />
        <Route path="/pengeluaran" element={<TransactionPage type="expense" />} />
        <Route path="/laporan" element={<Report />} />
        <Route path="/akun" element={<Account />} />
        <Route path="/pemasukan/form" element={<TransactionForm type="income" />} />
<       Route path="/pengeluaran/form" element={<TransactionForm type="expense" />} />
<       Route path="/kategori/pemasukan" element={<CategoryList title={"Kategori Pemasukan"}/>} />
<       Route path="/kategori/pengeluaran" element={<CategoryList title={"Kategori Pengeluaran"}/>} />
<       Route path="/kategori/pemasukan/create" element={<CategoryForm/>} />
<       Route path="/kategori/pengeluaran/create" element={<CategoryForm/>} />
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
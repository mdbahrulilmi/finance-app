import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import { TransactionPage } from "@/pages/Transaction/TransactionPage";
import Report from "@/pages/Report/Report";
import Settings from "@/pages/Settings/Settings";
import TransactionForm from "@/pages/Transaction/components/TransactionForm";
import { CategoryList } from "@/pages/Settings/components/CategoryList";
import { CategoryForm } from "@/pages/Settings/components/CategoryForm";
import { AuthForm } from "@/pages/Auth/AuthForm";
import { IsAuth } from "@/middleware/IsAuth";
import Layout from "@/layouts/Layout";
import { PotPage } from "@/pages/Pot/PotPage";
import { PotDetail } from "@/pages/Pot/PotDetail";
import PotCreatePage from "@/pages/Pot/PotCreatePage";
import PotEditPage from "@/pages/Pot/PotEditPage";
import JoinPotPage from "@/pages/JoinPot/JoinPotPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<IsAuth />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pemasukan" element={<TransactionPage type="income" />} />
          <Route path="/pengeluaran" element={<TransactionPage type="expense" />} />
          <Route path="/laporan" element={<Report />} />
          <Route path="/akun" element={<Settings />} />
        </Route>
        {/* Transaksi */}
        <Route path="/pemasukan/form" element={<TransactionForm type="income" />} />
        <Route path="/pengeluaran/form" element={<TransactionForm type="expense" />} />
        {/* Kategori */}
        <Route path="/kategori/:type" element={<CategoryList />} />
        <Route path="/kategori/:type/form" element={<CategoryForm />} />  
        {/* Pot */}
        <Route path="/pot" element={<PotPage />} />
        <Route path="/pot/detail/:id" element={<PotDetail />} />
        <Route path="/pot/create" element={<PotCreatePage />} />
        <Route path="/pot/edit/:id" element={<PotEditPage />} />
        <Route path="/pot/join/:id" element={<JoinPotPage />} />
      </Route>

      <Route path="/masuk" element={<AuthForm type="login" />} />
      <Route path="/daftar" element={<AuthForm type="register" />} />
    </Routes>
  );
}
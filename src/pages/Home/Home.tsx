import { Box, VStack, SimpleGrid, Text } from "@chakra-ui/react"
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { VscGraph } from "react-icons/vsc"
import { BalanceCard } from "../../components/card/BalanceCard";
import { MenuCard } from "./components/MenuCard";
import { CardList } from "../../components/list/CardList";
import { MdOutlineEdit } from "react-icons/md";
import { HomeBalanceCard } from "./components/HomeBalanceCard";
import { useThemeColor } from "../../components/ui/theme-context";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/services/useProfile";
import { useTransaction } from "@/services/useTransaction";

const Home: React.FC = () => {

  const handleMenuClick = (menu: string) => {
    alert(`Klik menu: ${menu}`)
  }

  const { theme } = useThemeColor();
  const navigate = useNavigate();
  const { data: profile } = useProfile();

  const {data:transactions = []} = useTransaction();

  const incomeTransactions = transactions.filter(
    (item) => item.type === "income"
  );

  const expenseTransactions = transactions.filter(
    (item) => item.type === "expense"
  );

  const totalIncome = incomeTransactions.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  
  const totalExpense = expenseTransactions.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const total = totalIncome - totalExpense;

  const todayTransactions = transactions.filter((item) => {
    const today = new Date().toDateString();
    return new Date(item.transaction_date).toDateString() === today;
  });

  return (
    <Box
      h="100vh"
      maxW="375px"
      mx="auto"
      p={4}
      pb={24}
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg={"gray.50"}
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none"
      }}
    >
      <VStack w="full" align="start" p={1} gap={0} mb={2}>
        <Text textStyle="sm" color={"black"}>
          Selamat Datang 👋
        </Text>
        <Text textStyle="lg" fontWeight="semibold"  color={"black"}>
          {profile?.full_name ?? profile?.username}
        </Text>
      </VStack>
      <Box w="full" mb={8}>
        <BalanceCard
          title="Total Saldo"
          bg={theme.primary}
          color="white"
          total={total}
        >
          <HomeBalanceCard bg={theme.secondary} color="white" income={totalIncome} expense={totalExpense} />
        </BalanceCard>
      </Box>

      <SimpleGrid columns={4} gap={4} mb={8}>
        <MenuCard title="Pemasukan" icon={FaArrowUpLong} bg="green.200" color="green.800" onClick={() => navigate('/pemasukan/form')} />
        <MenuCard title="Pengeluaran" icon={FaArrowDownLong} bg="red.200" color="red.800" onClick={() => navigate('/pengeluaran/form')} />
        <MenuCard title="Wishlist" icon={MdOutlineEdit} bg="blue.200" color="blue.800" onClick={() => handleMenuClick("Wishlist")} />
        <MenuCard title="Laporan" icon={VscGraph} bg="orange.200" color="orange.800" onClick={() => navigate('/laporan')} />
      </SimpleGrid>

      <CardList title="Transaksi Hari Ini" color={theme.text} data={todayTransactions}/>
    </Box>
  )
}

export default Home;
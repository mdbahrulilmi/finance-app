  import { Box, HStack, Text, Button, VStack } from "@chakra-ui/react"
  import { BalanceCard } from "../../components/card/BalanceCard";
  import { CardListGrouped } from "../../components/list/CardListGrouped";
  import { useThemeColor } from "../../components/ui/theme-context";
  import { useNavigate } from "react-router-dom";
  import { RupiahFormater } from "@/components/utils/RupiahFormater";
  import { useTransaction } from "@/services/useTransaction";
  import { useCategory } from "@/services/useCategory";
  import { toast } from "react-toastify";

  type PageType = "income" | "expense";

  type TransactionPageProps = {
    type: PageType;
  };

  export const TransactionPage: React.FC<TransactionPageProps> = ({ type }) => {
    const { theme } = useThemeColor();
    const navigate = useNavigate();

    const handleNoCategory = () => {
        toast.warning("Belum ada kategori silahkan tambahkan dipengaturan!");
    }

    const { data: categories = [] } = useCategory(type);
    
    const isIncome = type === "income";
  
    const { data: transactions = [] } = useTransaction();

    const incomeTransactions = transactions.filter(
      (item) => item.type === "income"
    );

    const expenseTransactions = transactions.filter(
      (item) => item.type === "expense"
    );

    const currentTransactions = type === "income"
    ? incomeTransactions
    : expenseTransactions;

    type GroupedTransactions = {
      [key: string]: typeof currentTransactions;
    };

    const groupedTransactions = currentTransactions.reduce<GroupedTransactions>(
    (groups, item) => {
      const dateKey = new Date(item.transaction_date).toLocaleDateString("sv-SE");

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(item);
      return groups;
    },
    {}
  );

    const groupedArray = Object.entries(groupedTransactions).map(
      ([date, items]) => ({
        date,
        items,
      })
    );


    const total = currentTransactions.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    const totalToday = currentTransactions
      .filter((item) => {
        const today = new Date().toDateString();
        return new Date(item.transaction_date).toDateString() === today;
      })
      .reduce((acc, item) => acc + item.amount, 0);

    return (
      <Box
        h="100vh"
        maxW="480px"
        mx="auto"
        px={4}
        pt={5}
        pb={24}
        display="flex"
        flexDirection="column"
        alignItems="center"
        bg="gray.50"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none"
      }}
      >
        <HStack w="full" justifyContent="space-between" mb={4}>
          <Text fontSize="lg" fontWeight="bold" color={theme.text}>
            {isIncome ? "Pemasukan" : "Pengeluaran"}
          </Text>

          <Box
            px={3}
            py={1}
            bg="white"
            borderRadius="full"
            border="1px solid"
            borderColor="gray.200"
          >
            <Text fontSize="xs" color="gray.500">
              Apr 2026
            </Text>
          </Box>
        </HStack>

        {/* Balance */}
        <Box w="full" mb={3}>
          <BalanceCard
            title="Bulan ini"
            bg={theme.primary}
            color="white"
            total={total}
          >
            <HStack mt={4} gap={4}>
              <VStack align="start" gap={0}>
                <Text fontSize="10px" opacity={0.7}>Hari Ini</Text>
                <Text fontSize="xs" fontWeight="semibold">
                  {RupiahFormater(totalToday)}
                </Text>
              </VStack>

              <Box w="1px" h="24px" bg="whiteAlpha.400" />

              <VStack align="start" gap={0}>
                <Text fontSize="10px" opacity={0.7}>Transaksi</Text>
                <Text fontSize="xs" fontWeight="semibold">
                  {currentTransactions.length} entri
                </Text>
              </VStack>
            </HStack>
          </BalanceCard>
        </Box>

        <Button
          w="full"
          mb={4}
          borderRadius="2xl"
          bg={isIncome ? "green.500" : "red.500"}
          color="white"
          h="48px"
          onClick={() => {
            if (!categories.length) {
              handleNoCategory();
              return;
            }

            navigate(isIncome ? "/pemasukan/form" : "/pengeluaran/form");
          }}
        >
          {isIncome ? "+ Tambah Pemasukan" : "+ Tambah Pengeluaran"}
        </Button>
        
        <CardListGrouped 
          title={
            isIncome ? "Riwayat Pemasukan" : "Riwayat Pengeluaran"
          }
          color={theme.text}
          data={groupedArray}
        />
      </Box>
      
    );
  };
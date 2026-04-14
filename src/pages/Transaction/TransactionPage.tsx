import { Box, HStack, Text, Button, VStack } from "@chakra-ui/react"
import { BalanceCard } from "../../components/card/BalanceCard";
import { CardList } from "../../components/list/CardList";
import { useThemeColor } from "../../components/ui/theme-context";
import { useNavigate } from "react-router-dom";

type PageType = "income" | "expense";

type TransactionPageProps = {
  type: PageType;
};

export const TransactionPage: React.FC<TransactionPageProps> = ({ type }) => {
  const { theme } = useThemeColor();
  const navigate = useNavigate();

  const isIncome = type === "income";

  return (
    <Box
      h="100vh"
      maxW="375px"
      mx="auto"
      px={4}
      pt={5}
      pb={24}
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="gray.50"
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
            Apr 2026 ▾
          </Text>
        </Box>
      </HStack>

      {/* Balance */}
      <Box w="full" mb={3}>
        <BalanceCard
          title="Bulan ini"
          bg={theme.primary}
          color="white"
        >
          <HStack mt={4} gap={4}>
            <VStack align="start" gap={0}>
              <Text fontSize="10px" opacity={0.7}>Hari Ini</Text>
              <Text fontSize="xs" fontWeight="semibold">Rp 0</Text>
            </VStack>
            <Box w="1px" h="24px" bg="whiteAlpha.400" />
            <VStack align="start" gap={0}>
              <Text fontSize="10px" opacity={0.7}>Bulan lalu</Text>
              <Text fontSize="xs" fontWeight="semibold">Rp 4.800.000</Text>
            </VStack>
            <Box w="1px" h="24px" bg="whiteAlpha.400" />
            <VStack align="start" gap={0}>
              <Text fontSize="10px" opacity={0.7}>Transaksi</Text>
              <Text fontSize="xs" fontWeight="semibold">3 entri</Text>
            </VStack>
          </HStack>
        </BalanceCard>
      </Box>

      {/* Button */}
      <Button
        w="full"
        mb={4}
        borderRadius="2xl"
        bg={isIncome ? "green.500" : "red.500"}
        color="white"
        h="48px"
        onClick={() =>
          navigate(isIncome ? "/pemasukan/form" : "/pengeluaran/form")
        }
      >
        {isIncome ? "+ Tambah Pemasukan" : "+ Tambah Pengeluaran"}
      </Button>

      {/* List */}
      <CardList
        title={
          isIncome ? "Riwayat Pemasukan" : "Riwayat Pengeluaran"
        }
        color={theme.text}
      />
    </Box>
  );
};
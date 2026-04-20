import {
  Box,
  VStack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { GraphLine } from "../../components/chart/GraphLine";
import { GraphPie } from "../../components/chart/GraphPie";
import { useThemeColor } from "../../components/ui/theme-context";
import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "@/services/transaction";

const Report: React.FC = () => {

  const { theme } = useThemeColor();

  const [range, setRange] = useState("1M");

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions-report"],
    queryFn: () => getTransaction({}),
  });

  const filterByRange = (data: any[]) => {
  const now = new Date();

  return data.filter((item) => {
    const date = new Date(item.transaction_date);

    switch (range) {
      case "1D":
        return date.toDateString() === now.toDateString();

      case "7D":
        return date >= new Date(now.setDate(now.getDate() - 7));

      case "1M":
        return date.getMonth() === now.getMonth();

      case "6M":
        return date >= new Date(now.setMonth(now.getMonth() - 6));

      case "1Y":
        return date.getFullYear() === now.getFullYear();

      default:
        return true;
    }
  });
};

const filtered = filterByRange(transactions);

const lineData = Object.values(
  filtered.reduce((acc: any, item: any) => {
    const dateKey = new Date(item.transaction_date).toISOString(); // 🔥 pakai ISO

    if (!acc[dateKey]) {
      acc[dateKey] = {
        name: new Date(item.transaction_date).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        }),
        date: new Date(item.transaction_date), // simpan buat sorting
        income: 0,
        expense: 0,
      };
    }

    if (item.type === "income") {
      acc[dateKey].income += item.amount;
    } else {
      acc[dateKey].expense += item.amount;
    }

    return acc;
  }, {})
)
.sort((a: any, b: any) => a.date.getTime() - b.date.getTime());

const getPieData = (type: "income" | "expense") => {
  return Object.values(
    filtered
      .filter((item) => item.type === type)
      .reduce<Record<string, { name: string; value: number }>>(
        (acc, item) => {
          const key = item.category_id;

          if (!acc[key]) {
            acc[key] = {
              name: item.category?.name || "Lainnya",
              value: 0,
            };
          }

          acc[key].value += item.amount;

          return acc;
        },
        {}
      )
  );
};

  const ranges = ["1D", "7D", "1M", "6M", "1Y"];

  const now = new Date();

  const formatDate = (date: Date) =>
    date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });

  return (
    <Box
      h="100vh"
      maxW="375px"
      mx="auto"
      p={4}
      pb={24}
      overflowY="auto"
      bg={"gray.50"}
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none"
    }}
    >
      <VStack gap={4} align="stretch">

        <VStack align="start" gap={0}>
          <Text fontSize="xs" color={theme.text}>
            {formatDate(now)}
          </Text>
          <Text fontSize="md" fontWeight="semibold" color={"black"}>
            Laporan Keuangan
          </Text>
        </VStack>

        <HStack bg={theme.primary} p={1} borderRadius="xl">
          {ranges.map((item) => (
            <Button
              key={item}
              size="xs"
              flex={1}
              borderRadius="lg"
              bg={range === item ? "white" : "transparent"}
              color={range === item ? theme.primary : "white"}
              shadow={range === item ? "sm" : "none"}
              onClick={() => setRange(item)}
            >
              {item}
            </Button>
          ))}
        </HStack>

        
        <GraphLine range={range} lineData={lineData}/>
        <GraphPie pieData={getPieData("expense")} type="expense"/>
        <GraphPie pieData={getPieData("income")} type="income"/>

      </VStack>
    </Box>
  );
};

export default Report;
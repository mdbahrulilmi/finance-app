import {
  Box,
  VStack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { CardList } from "../layouts/CardList";
import { GraphLine } from "../layouts/GraphLine";
import { GraphPie } from "../layouts/GraphPie";
import { useThemeColor } from "../ui/theme-context";

const Report: React.FC = () => {

  const { theme } = useThemeColor();

  const [range, setRange] = useState("1M");

  const ranges = ["1D", "7D", "1M", "6M", "1Y"];

  const now = new Date();

  const formatDate = (date: Date) =>
    date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });

  // 📊 Line data
  const lineData = [
    { name: "1", income: 5000000, expense: 3000000 },
    { name: "2", income: 5200000, expense: 3200000 },
    { name: "3", income: 4800000, expense: 2800000 },
    { name: "4", income: 6000000, expense: 3500000 },
  ];

  // 🥧 Pie data
  const pieData = [
    { name: "Makan", value: 1500000 },
    { name: "Transport", value: 800000 },
    { name: "Belanja", value: 1200000 },
    { name: "Lainnya", value: 500000 },
  ];

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

        {/* 📅 HEADER */}
        <VStack align="start" gap={0}>
          <Text fontSize="xs" color={theme.text}>
            {formatDate(now)}
          </Text>
          <Text fontSize="md" fontWeight="semibold" color={"black"}>
            Laporan Keuangan
          </Text>
        </VStack>

        {/* 🔘 RANGE */}
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
        <GraphPie pieData={pieData}/>
        <CardList title="Riwayat Transaksi" color={theme.text} />

      </VStack>
    </Box>
  );
};

export default Report;
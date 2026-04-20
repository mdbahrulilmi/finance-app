import { Box, Text, HStack, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type PieItem = {
  name: string;
  value: number;
};

type GraphPieProps = {
  pieData: PieItem[];
  type: "income" | "expense";
};

export const GraphPie: React.FC<GraphPieProps> = ({ pieData, type }) => {
  const COLORS_INCOME = [
    "#22c55e",
    "#3b82f6",
    "#06b6d4",
    "#a855f7",
    "#14b8a6",
  ];

  const COLORS_EXPENSE = [
    "#dc2626",
    "#f59e0b",
    "#6366f1",
    "#14b8a6",
    "#a855f7",
  ];

  const COLORS = type === "income" ? COLORS_INCOME : COLORS_EXPENSE;

  const total = pieData.reduce((acc, item) => acc + item.value, 0);

  const getPercent = (value: number) => {
    if (total === 0) return "0.0";
    return ((value / total) * 100).toFixed(1);
  };

  const renderLabel = useCallback(
  ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;

    if (percent < 0.05) return null;

    const radius =
      innerRadius + (outerRadius - innerRadius) * 0.5;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fontWeight="bold"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  },
  []
);

  return (
    <Box p={3} bg="white" borderRadius="xl" shadow="sm">
      <Text fontSize="sm" fontWeight="semibold" mb={2}>
        Kategori {type === "income" ? "Pemasukan" : "Pengeluaran"}
      </Text>

      <VStack align="stretch" gap={2}>
        {/* PIE */}
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={70}
              label={renderLabel}
              labelLine={false}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <VStack align="start" gap={1}>
          {pieData.map((item, i) => (
            <HStack key={i} justify="space-between" w="full">
              <HStack>
                <Box
                  w="10px"
                  h="10px"
                  borderRadius="full"
                  bg={COLORS[i % COLORS.length]}
                />
                <Text fontSize="xs">{item.name}</Text>
              </HStack>

              <Text fontSize="xs" fontWeight="semibold">
                {item.value.toLocaleString("id-ID")} (
                {getPercent(item.value)}%)
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};
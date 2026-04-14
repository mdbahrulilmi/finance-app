import { Box, Text } from "@chakra-ui/react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type PieItem = {
    name: string;
    value: number;
    };

export const GraphPie = ({pieData}: {pieData:PieItem[]}) => {
    
    const COLORS = ["#ec4899", "#3b82f6", "#22c55e", "#f59e0b"];

    
    
    return(
        <Box p={3} bg="white" borderRadius="xl" shadow="sm">
          <Text fontSize="sm" fontWeight="semibold" mb={2}>
            Kategori Pengeluaran
          </Text>

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={70}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
    );
}
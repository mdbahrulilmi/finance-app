import { Box, Text } from "@chakra-ui/react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export const GraphLine = ({range, lineData} : {range:string, lineData:any}) => {
    return(
        <Box p={3} bg="white" borderRadius="xl" shadow="sm">
            <Text fontSize="sm" fontWeight="semibold" mb={2}>
            Pemasukan vs Pengeluaran ({range})
            </Text>

            <ResponsiveContainer width="100%" height={180}>
            <LineChart data={lineData}>
                <XAxis dataKey="name" fontSize={10} />
                <Tooltip />
                <Line dataKey="income" stroke="#22c55e" strokeWidth={2} />
                <Line dataKey="expense" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}
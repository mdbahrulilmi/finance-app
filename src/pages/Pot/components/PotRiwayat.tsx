import { fmt } from "@/components/utils/RupiahFormater";
import { Box, HStack, Text } from "@chakra-ui/react";
import { LuTrendingUp, LuWallet } from "react-icons/lu";

export const PotRiwayat = ({riwayat} : {riwayat:any}) => {
    return(
        <Box mx={4} mt={5}>
            <HStack justify="space-between" mb={3}>
                <Text fontWeight="600" fontSize="sm">Riwayat</Text>
            </HStack>

            <Box bg="white" borderRadius="2xl" overflow="hidden">
                {riwayat.map((r: any, i: number) => (
                <Box key={i}>
                    <HStack px={4} py={3} justify="space-between">
                    <HStack gap={3}>
                        <Box
                        w="36px"
                        h="36px"
                        borderRadius="full"
                        bg={r.type === "income" ? "green.50" : "red.50"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        >
                        {r.type === "income" ? <LuTrendingUp /> : <LuWallet />}
                        </Box>

                        <Box>
                        <Text fontSize="sm">{r.note}</Text>
                        <Text fontSize="xs" color="gray.500">
                            {r.note}
                        </Text>
                        </Box>
                    </HStack>

                    <Text
                        fontSize="sm"
                        color={r.type === "income" ? "green.500" : "red.500"}
                    >
                        {r.type === "income" ? "+" : "-"}
                        {fmt(r.amount)}
                    </Text>
                    </HStack>
                </Box>
                ))}
            </Box>
            </Box>
    );
}
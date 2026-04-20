import type { Transaction } from "@/types/Transaction";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { RupiahFormater } from "../utils/RupiahFormater";
import { useNavigate } from "react-router-dom";

interface CardListProps {
  title: string;
  color: string;
  data: Transaction[];
}

export const CardList: React.FC<CardListProps> = ({ title, color, data }) => {
  const navigate = useNavigate();

  const formatTanggal = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Box w="full" p={3} bg="white" borderRadius="xl" shadow="sm">
      <VStack w="full" align="start" gap={2}>
        {/* Header */}
        <HStack w="full" justifyContent="space-between">
          <Text fontSize="sm" fontWeight="semibold" color={color}>
            {title}
          </Text>

          <Text fontSize="10px" color="gray.500">
            Lihat Lainnya
          </Text>
        </HStack>

        <VStack w="full" gap={2}>
          {data.map((item, index) => (
            <Box
              key={index}
              w="full"
              p={2}
              borderWidth="1px"
              borderColor="gray.100"
              borderRadius="md"
              _hover={{ bg: "gray.50" }}
              cursor={"pointer"}
              onClick={() =>
                navigate(
                  item.type === "income"
                    ? "/pemasukan/form"
                    : "/pengeluaran/form",
                  {
                    state: {
                      mode: "update",
                      data: item,
                    },
                  }
                )
              }
            
            >
              <HStack justifyContent="space-between">
                <VStack align="start" gap={0}>
                  <Text fontSize="xs" color="gray.500">
                    {item.note}
                  </Text>
                  <Text fontSize="10px" color="gray.400">
                    {formatTanggal(item.transaction_date)}
                  </Text>
                </VStack>

                <Text fontSize="xs" fontWeight="semibold" color="gray.600">
                  {RupiahFormater(item.amount)}
                </Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};
import type { Transaction } from "@/types/Transaction";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { RupiahFormater } from "../utils/RupiahFormater";
import { useNavigate } from "react-router-dom";

type GroupedTransaction = {
  date: string;
  items: Transaction[];
};

interface CardListProps {
  title: string;
  color: string;
  data: GroupedTransaction[];
}

export const CardListGrouped: React.FC<CardListProps> = ({ title, color, data }) => {
  const navigate = useNavigate();

  const formatHariTanggal = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getGroupTotal = (items: Transaction[]) => {
    return items.reduce((acc, item) => acc + item.amount, 0);
  };

  return (
    <Box w="full" p={3} bg="white" borderRadius="xl" shadow="sm">
      <VStack w="full" align="start" gap={4}>
        
        {/* HEADER */}
        <HStack w="full" justifyContent="space-between">
          <Text fontSize="sm" fontWeight="semibold" color={color}>
            {title}
          </Text>

          <Text fontSize="10px" color="gray.500">
            
          </Text>
        </HStack>

        <VStack w="full" gap={4} align="stretch">
          {data.map((group) => (
            <Box
              key={group.date}
              w="full"
              p={3}
              borderWidth="1px"
              borderColor="gray.100"
              borderRadius="lg"
              bg="white"
              shadow="sm"
            >
              <HStack w="full" mb={3} alignItems="center">
                <Text fontSize="xs" fontWeight="semibold" color="gray.500">
                  {formatHariTanggal(group.date)}
                </Text>

                <Box
                  flex="1"
                  borderBottom="2px dashed"
                  borderColor="gray.300"
                  mx={1}
                />

                <Text fontSize="xs" fontWeight="bold" color="gray.600">
                  {RupiahFormater(getGroupTotal(group.items))}
                </Text>
              </HStack>

              <VStack w="full" gap={2}>
                {group.items.map((item) => (
                  <Box
                    key={item.id}
                    w="full"
                    p={2}
                    borderWidth="1px"
                    borderColor="gray.100"
                    borderRadius="md"
                    _hover={{ bg: "gray.50" }}
                    cursor="pointer"
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
                      <Text fontSize="xs" color="gray.500">
                        {item.note}
                      </Text>

                      <Text fontSize="xs" fontWeight="semibold" color="gray.600">
                        {RupiahFormater(item.amount)}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>

      </VStack>
    </Box>
  );
};
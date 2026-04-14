import { Box, HStack, Text, VStack } from "@chakra-ui/react";

interface CardListProps {
  title: string;
  color: string;
}

export const CardList: React.FC<CardListProps> = ({ title, color }) => {
  const formatDateTime = (date: Date) => {
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const data = [
    { label: "Gaji Bulanan", value: "Rp 5.000.000" },
    { label: "Bonus", value: "Rp 1.200.000" },
    { label: "Cashback", value: "Rp 300.000" },
  ];

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
            >
              <HStack justifyContent="space-between">
                <VStack align="start" gap={0}>
                  <Text fontSize="xs" color="gray.500">
                    {item.label}
                  </Text>
                  <Text fontSize="10px" color="gray.400">
                    {formatDateTime(new Date())}
                  </Text>
                </VStack>

                <Text fontSize="xs" fontWeight="semibold" color="gray.600">
                  {item.value}
                </Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};
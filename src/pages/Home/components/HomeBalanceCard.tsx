import { Box, HStack, Text } from "@chakra-ui/react"
import { RupiahFormater } from "../../../components/utils/RupiahFormater";

interface HomeBalanceCardProps {
  bg: string
  color: string
}

export const HomeBalanceCard: React.FC<HomeBalanceCardProps> = ({ bg, color }) => {
  const pemasukan = 6000000;
  const pengeluaran = 1000000;

  return (
    <HStack w="full" px={0} gap={3} mb={4}>
      {/* Pemasukan */}
      <Box
        flex="1"
        bg={bg}
        borderRadius="xl"
        px={3}
        py={3}
        display="flex"
        flexDirection="column"
        gap={0}
      >
        <HStack gap={1} mb={1}>
          <Box w="6px" h="6px" borderRadius="full" bg="green.400" />
          <Text fontSize="xs" opacity={0.75} color={color} fontWeight="medium">
            Pemasukan
          </Text>
        </HStack>
        <Text fontSize="sm" fontWeight="bold" color={color} letterSpacing="tight">
          {RupiahFormater(pemasukan)}
        </Text>
      </Box>

      {/* Pengeluaran */}
      <Box
        flex="1"
        bg={bg}
        borderRadius="xl"
        px={3}
        py={3}
        display="flex"
        flexDirection="column"
        gap={0}
      >
        <HStack gap={1} mb={1}>
          <Box w="6px" h="6px" borderRadius="full" bg="red.400" />
          <Text fontSize="xs" opacity={0.75} color={color} fontWeight="medium">
            Pengeluaran
          </Text>
        </HStack>
        <Text fontSize="sm" fontWeight="bold" color={color} letterSpacing="tight">
          {RupiahFormater(pengeluaran)}
        </Text>
      </Box>
    </HStack>
  )
}
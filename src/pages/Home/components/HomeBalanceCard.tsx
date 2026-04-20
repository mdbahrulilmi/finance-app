import { Box, HStack, Text } from "@chakra-ui/react"
import { RupiahFormater } from "../../../components/utils/RupiahFormater";

interface HomeBalanceCardProps {
  bg: string
  color: string
  income: number
  expense: number
}

export const HomeBalanceCard: React.FC<HomeBalanceCardProps> = ({ bg, color, income, expense }) => {

  return (
    <HStack w="full" px={0} gap={3} mb={4}>
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
          {RupiahFormater(income)}
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
          {RupiahFormater(expense)}
        </Text>
      </Box>
    </HStack>
  )
}
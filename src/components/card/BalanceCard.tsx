import { Box, Text } from "@chakra-ui/react"
import { RupiahFormater } from "../utils/RupiahFormater";

interface BalanceCardProps {
  title: string
  bg: string
  color: string
  total: number
  children?: React.ReactNode;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ title, bg, color, total, children }) => {
  return (
    <Box
      width="full"
      borderRadius="2xl"
      color={color}
      bg={bg}
      px={5}
      py={5}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-20px"
        right="-20px"
        w="100px"
        h="100px"
        borderRadius="full"
        bg="whiteAlpha.200"
      />
      <Box
        position="absolute"
        bottom="-30px"
        right="60px"
        w="80px"
        h="80px"
        borderRadius="full"
        bg="whiteAlpha.100"
      />

      <Text fontSize="sm" opacity={0.8} mb={1} fontWeight="medium">
        {title}
      </Text>

      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" mb={4}>
        {RupiahFormater(total)}
      </Text>

      {children}
    </Box>
  )
}
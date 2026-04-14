import { Box, Text, Icon, VStack } from "@chakra-ui/react"
import React from "react"
import type { IconType } from "react-icons"

interface MenuCardProps {
  title: string
  icon: IconType
  bg: string
  color: string
  onClick: () => void
}

export const MenuCard: React.FC<MenuCardProps> = ({ title, icon, bg, color, onClick }) => {
  return (
    <VStack gap={1.5}>
      <Box
      bg={bg}
      color={color}
      height={12}
      width={12}
      borderRadius="2xl"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
      p={2}
    >
      <Icon as={icon} boxSize={5} />
    </Box>
    <Text textStyle="xs" fontWeight="semibold" color={"black"}>
      {title}
    </Text>
    </VStack>
    
  )
}
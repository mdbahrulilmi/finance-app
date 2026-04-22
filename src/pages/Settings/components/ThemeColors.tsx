import ThemeRow from "@/components/ui/theme-row";
import { Box, HStack, Text } from "@chakra-ui/react";

export const ThemeColors = () => {

    return(
        <Box w="full">
            <Text fontSize="xs" color="gray.400" px={4} py={2}>
            Tema Warna
            </Text>

            <HStack gap={0} justifyContent="center">

            <ThemeRow label="Black" color="gray.800" value="black" />
            <ThemeRow label="Blue" color="blue.400" value="blue" />
            <ThemeRow label="Green" color="green.400" value="green" />
            <ThemeRow label="Pink" color="pink.400" value="pink" />
            
            </HStack>
        </Box>
    );
}
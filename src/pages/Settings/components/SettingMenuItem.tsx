import { HStack, Icon, Text } from "@chakra-ui/react";

export const SettingMenuItem = (
    {
        icon,
        label,
        click,
    }: {
        icon: any;
        label: string;
        click?: () => void;
        } 
) => {
    return(    
        <HStack
        w="full"
        px={4}
        py={4}
        gap={3}
        cursor="pointer"
        borderBottom="1px solid"
        borderColor="gray.100"
        _hover={{ bg: "gray.50" }}
        onClick={click}
        >
        <Icon as={icon} color="gray.500" />
        <Text fontSize="sm" color="gray.600">
            {label}
        </Text>
        </HStack>
    );
}
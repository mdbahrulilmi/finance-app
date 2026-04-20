import { useThemeColor } from "@/components/ui/theme-context";
import { useProfile } from "@/services/useProfile";
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";

export const ProfileCard = () => {
    
    const { theme } = useThemeColor();
    const { data: profile } = useProfile();
    
    const shadowColor = `var(--chakra-colors-${theme.primary.replace(".", "-")})`;

    const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const user = {
        name: profile?.full_name ?? profile?.username ,
        email: profile?.email,
        joinDate: profile?.created_at,
    };
    return (
        <Box
            w="full"
            p={4}
            bg="white"
            color={theme.primary}
            border={"sm"}
            borderColor={theme.primary}
            borderRadius="xl"
            boxShadow={`0 0px 6px ${shadowColor}`}
        >
            <HStack gap={4}>
            <Avatar.Root>
                <Avatar.Image src=""/>
                <Avatar.Fallback name={user.name ?? ''}/>
            </Avatar.Root>

            <VStack align="start" gap={0}>
                <Text fontSize="md" fontWeight="bold">
                {user.name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                {user.email}
                </Text>
                <Text fontSize="10px" color="gray.400">
                Bergabung: {formatDate(user.joinDate ?? '')}
                </Text>
            </VStack>
            </HStack>
        </Box>
    );
}
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
        avatar: profile?.avatar_url,
        name: profile?.full_name,
        username: profile?.username,
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
            cursor="pointer"
        >
            <HStack gap={4}>
            <Avatar.Root size="2xl">
                <Avatar.Image src={`/images/${user.avatar}`}/>
                <Avatar.Fallback name={user.name ?? user.username ?? ''}/>
            </Avatar.Root>

            <VStack align="start" gap={0}>
                <Text fontSize="md" fontWeight="bold">
                {user.name ?? user.username}
                </Text>
                {user.name && (
                    <Text fontSize="xs" fontWeight="semibold">
                        {user.username}
                    </Text>
                    )}
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
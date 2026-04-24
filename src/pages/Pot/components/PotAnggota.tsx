import { useThemeColor } from "@/components/ui/theme-context";
import { fmt } from "@/components/utils/RupiahFormater";
import { Avatar, Badge, Box, HStack, Image, Separator, Text } from "@chakra-ui/react";

export const PotAnggota = (
    {
        anggota, 
        kontribusiMap,
        terkumpul
    }:
    {
        anggota:any, 
        kontribusiMap:any,
        terkumpul:any
    }) => {
    const {theme} = useThemeColor();
    return(
        <Box mx={4} mt={5}>
            <HStack justify="space-between" mb={3}>
                <Text fontWeight="600" fontSize="sm">Anggota</Text>
                <Text fontSize="xs" color={theme.primary}>{anggota.length} Orang</Text>
            </HStack>

            <Box bg="white" borderRadius="2xl" overflow="hidden">
                {anggota.map((a: any, i: number) => {
                const total = kontribusiMap[a.user_id] || 0;

                const persen = terkumpul
                    ? Math.round((total / terkumpul) * 100)
                    : 0;

                return (
                    <Box key={i}>
                    <HStack px={4} py={3} justify="space-between">
                        <HStack gap={3}>
                        <Avatar.Root size="sm">
                            <Avatar.Fallback bg={theme.primary} color="white">
                            {a.user.avatar_url ? (
                                <Image
                                rounded={"4xl"}
                                src={`/images/${a.user.avatar_url}`}
                                />
                            ) : (
                                a.inisial
                            )}
                            </Avatar.Fallback>
                        </Avatar.Root>

                        <Box>
                            <HStack>
                            <Text fontSize="sm">
                                {a.user.full_name ?? a.user.username}
                            </Text>

                            {a.isOwner && (
                                <Badge colorPalette="yellow">Ketua</Badge>
                            )}
                            </HStack>

                            <Text fontSize="xs" color="gray.500">
                            {persen}% kontribusi
                            </Text>
                        </Box>
                        </HStack>

                        <Text fontSize="sm">{fmt(total)}</Text>
                    </HStack>

                    {i < anggota.length - 1 && <Separator />}
                    </Box>
                );
                })}
            </Box>
            </Box>
    )
}
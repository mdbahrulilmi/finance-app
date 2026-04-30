import { deletePot } from "@/services/pot";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { LuPencil, LuShare2, LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const PotSettingsModal = (
    {
        id,
        inviteCode,
        close,
    }:{
        id:string,
        inviteCode:string,
        close:() => void

    }
) => {
    const navigate = useNavigate();
    return(
    <Box
        position="fixed"
        inset={0}
        bg="blackAlpha.600"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
        zIndex={999}
        onClick={() => close()}
    >
        <Box
        bg="white"
        w="100%"
        borderTopRadius="3xl"
        p={5}
        pb={8}
        onClick={(e) => e.stopPropagation()}
        >
        <Box
            w="40px" h="4px"
            bg="gray.200"
            borderRadius="full"
            mx="auto"
            mb={5}
        />
        <VStack align="stretch" gap={2}>
        <HStack
            px={4}
            py={3}
            borderRadius="xl"
            bg="gray.50"
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
            gap={3}
            onClick={() => {
                const link = `${window.location.origin}/pot/join/${inviteCode}`;
                navigator.clipboard.writeText(link);
            }}
            >
            <LuShare2 size={18} color="gray" />
            <Text fontSize="sm" fontWeight="500">Share Pot</Text>
            </HStack>

            <HStack
                px={4} py={3}
                borderRadius="xl"
                bg="gray.50"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                gap={3}
                onClick={() => navigate(`/pot/edit/${id}`)}
            >
                <LuPencil size={18} color="gray" />
                <Text fontSize="sm" fontWeight="500">Edit Pot</Text>
            </HStack>

            <HStack
                px={4} py={3}
                borderRadius="xl"
                bg="red.50"
                cursor="pointer"
                _hover={{ bg: "red.100" }}
                gap={3}
                onClick={() => {
                deletePot(id)
                navigate(-1);
                }}
            >
                <LuTrash2 size={18} color="red" />
                <Text fontSize="sm" fontWeight="500" color="red.500">Hapus Pot</Text>
            </HStack>

            </VStack>
        </Box>
        </Box>
    );
}
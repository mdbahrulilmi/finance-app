import { Box, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import { LuArrowLeft, LuSettings2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const PotDetailHeader = (
    {
        POT, anggota, open
    }:
    {
        POT:any, 
        anggota:number,
        open: () => void
    }
    
) => {
    const navigate = useNavigate();
    return(
         <Box position="relative" w="full" h="200px">
        <Image
            src={`/images/${POT.image}`}
            alt={POT.name}
            w="full"
            h="full"
            objectFit="cover"
        />

        <Box
            position="absolute"
            inset={0}
            bgGradient="to-b"
            gradientFrom="blackAlpha.500"
            gradientTo="blackAlpha.200"
        />

        <HStack
            position="absolute"
            top={0}
            left={0}
            right={0}
            px={3}
            pt={4}
            justify="space-between"
        >
            <IconButton
            aria-label="Kembali"
            variant="ghost"
            color="white"
            borderRadius="full"
            onClick={() => navigate(-1)}
            >
            <LuArrowLeft />
            </IconButton>

            <IconButton
            aria-label="Pengaturan"
            variant="ghost"
            color="white"
            borderRadius="full"
            onClick={() => open()}
            >
            <LuSettings2 />
            </IconButton>
        </HStack>

        <Box position="absolute" bottom={4} left={4}>
            <Text fontSize="xl" fontWeight="bold" color="white">
            {POT.name}
            </Text>
            <Text fontSize="xs" color="whiteAlpha.800">
            {anggota} anggota
            </Text>
        <Box h={4}></Box>
        </Box>
        </Box>
    );
}
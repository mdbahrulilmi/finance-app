import { Box, Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { PotCard } from "./components/PotCard";
import { useThemeColor } from "@/components/ui/theme-context";
import { PiPottedPlantBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { usePots } from "@/services/usePot";
import { useState } from "react";
import { PotInfoModal } from "./components/PotInfoModal";

export const PotPage = () => {
  const { theme } = useThemeColor();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: pots, isLoading } = usePots();

  return (
    <Box
      h="100dvh"
      w="100%"
      maxW="480px"
      mx="auto"
      pb={24}
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="gray.50"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      <Box
        w="100%"
        bg={theme.secondary}
        mb={1}
        px={5}
        py={4}
        boxShadow="sm"
      >
        <HStack w="full" justify="space-between" align="center">
          <HStack gap={3} align="center">
            <Box
              cursor="pointer"
              onClick={() => navigate("/", { replace: true })}
              p={2}
              borderRadius="full"
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <Icon as={LuArrowLeft} boxSize={5} color="white" />
            </Box>

            <VStack align="start" gap={0}>
              <Text fontSize="lg" fontWeight="bold" color="white">
                Pot
              </Text>

              <Text fontSize="sm" fontWeight="medium" color="whiteAlpha.900">
                Wadah untuk mencapai tujuan
              </Text>
            </VStack>
          </HStack>

          <Box p={2} bg="whiteAlpha.200" borderRadius="full">
            <Icon as={PiPottedPlantBold} boxSize={5} color="white" cursor={"pointer"} onClick={() => setOpen(true)}/>
          </Box>
        </HStack>
      </Box>

      {/* LIST POT */}
      <VStack gap={2} px={4} mt={4} align="stretch" w="full">
        {isLoading && <></>}

        {!isLoading && pots?.length === 0 && (
          <></>
        )}

        {pots?.map((pot) => (
          <PotCard
            key={pot.id}
            data={pot}
            onClick={() => navigate(`/pot/detail/${pot.id}`)}
            />
        ))}
      </VStack>

      {/* BUTTON */}
      <Button
        position="fixed"
        bottom={4}
        left="50%"
        transform="translateX(-50%)"
        w="95%"
        borderRadius="2xl"
        p={6}
        bg={theme.primary}
        boxShadow="lg"
        color="white"
        onClick={() => navigate("/pot/create")}
      >
        Tambah
      </Button>
      {open && 
        <PotInfoModal onClose={ () => setOpen(false)}/>
      }
    </Box>
  );
};

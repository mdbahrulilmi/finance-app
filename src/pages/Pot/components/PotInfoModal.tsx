import { useThemeColor } from "@/components/ui/theme-context";
import { Box, Text, VStack } from "@chakra-ui/react";

export const PotInfoModal = ({ onClose }: { onClose: () => void }) => {
  const {theme} = useThemeColor();
  return (
    <Box
      position="fixed"
      inset={0}
      bg="blackAlpha.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={999}
      onClick={onClose}
    >
      <Box
        bg="white"
        w="90%"
        maxW="400px"
        borderRadius="2xl"
        p={5}
        onClick={(e) => e.stopPropagation()}
      >
        <VStack align="start" gap={3}>
          <Text fontSize="lg" fontWeight="bold">
            Apa itu Pot?
          </Text>

          <Text fontSize="sm" color="gray.600" textAlign={"justify"}>
            Pot adalah tempat kamu menabung untuk tujuan tertentu,
            seperti membeli barang, liburan, atau kebutuhan lainnya.
          </Text>

          <Text fontSize="sm" color="gray.600" textAlign={"justify"}>
            Kamu bisa menabung sendiri atau mengajak teman untuk
            menabung bersama dalam satu pot.
          </Text>

          <Text fontSize="sm" color="gray.600" textAlign={"justify"}>
            Setiap anggota bisa melihat kontribusi dan perkembangan
            tabungan secara transparan.
          </Text>

          <Text fontSize="sm" color="gray.600" textAlign={"justify"}>
            Gunakan fitur share untuk mengundang orang lain
            bergabung ke pot kamu.
          </Text>

          <Box
            mt={4}
            w="100%"
            textAlign="center"
            bg={theme.primary}
            color="white"
            py={2}
            borderRadius="xl"
            cursor="pointer"
            onClick={onClose}
          >
            Mengerti
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
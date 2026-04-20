import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { logout } from "@/services/auth";
import { ThemeColors } from "./components/ThemeColors";
import { useThemeColor } from "@/components/ui/theme-context";
import { ProfileCard } from "./components/ProfileCard";
import { SettingMenuItem } from "./components/SettingMenuItem";

export const Settings = () => {
  const { theme } = useThemeColor();
  const navigate = useNavigate();

  return (
    <Box h="100vh"
      maxW="375px"
      mx="auto"
      px={4}
      pt={5}
      pb={24}
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="gray.50"
      >
      <HStack w="full" justifyContent="space-between" alignItems="center" mb={4}>
        <VStack align="start" gap={0}>
          <Text fontSize="lg" fontWeight="bold" color={theme.text}>
           Settings
          </Text>
        </VStack>
      </HStack>
      <VStack w="full" gap={4} align="start">

        <ProfileCard />

        <Box 
        w="full" 
        bg="white" 
        borderRadius="xl" 
        shadow="sm"
        >
          <VStack align="start" gap={0}>
            <SettingMenuItem icon={GiReceiveMoney} label="Kategori Pemasukan" click={() => navigate('/kategori/income')}/>
            <SettingMenuItem icon={GiPayMoney} label="Kategori Pengeluaran" click={() => navigate('/kategori/expense')}/>
          </VStack>
        </Box>

        <ThemeColors />

        <Button
          w="full"
          // leftIcon={<FiLogOut />}
          onClick={async () => {
            await logout();
            navigate("/masuk");
          }}
          colorScheme="red"
          variant="outline"
          bg="red.500"
          color="white"
        >
          Keluar
        </Button>
      </VStack>
    </Box>
  );
};

export default Settings;
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import ThemeRow from "../../components/ui/theme-row";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { useThemeColor } from "../../components/ui/theme-context";
import { useNavigate } from "react-router-dom";

export const Settings = () => {

  const { theme } = useThemeColor();
  const navigate = useNavigate();
  const shadowColor = `var(--chakra-colors-${theme.primary.replace(".", "-")})`;

  const formatDate = (date: Date) =>
    date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const user = {
    name: "John Doe",
    email: "john@email.com",
    joinDate: new Date(),
  };

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
             <Avatar.Fallback name={user.name}/>
            </Avatar.Root>

            <VStack align="start" gap={0}>
              <Text fontSize="md" fontWeight="bold">
                {user.name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {user.email}
              </Text>
              <Text fontSize="10px" color="gray.400">
                Bergabung: {formatDate(user.joinDate)}
              </Text>
            </VStack>
          </HStack>
        </Box>

        <Box 
        w="full" 
        bg="white" 
        borderRadius="xl" 
        shadow="sm"
        >
          <VStack align="start" gap={0}>
            <MenuItem icon={GiReceiveMoney} label="Kategori Pemasukan" click={() => navigate('/kategori/pemasukan')}/>
            <MenuItem icon={GiPayMoney} label="Kategori Pengeluaran" click={() => navigate('/kategori/pengeluaran')}/>
          </VStack>
        </Box>

        <Box w="full">
          <Text fontSize="xs" color="gray.400" px={4} py={2}>
            Tema Warna
          </Text>

          <HStack gap={0} justifyContent="center">

            <ThemeRow label="Pink" color="pink.400" value="pink" />
            <ThemeRow label="Green" color="green.400" value="green" />
            <ThemeRow label="Blue" color="blue.400" value="blue" />
            <ThemeRow label="Black" color="gray.800" value="black" />

          </HStack>
        </Box>

        <Button
          w="full"
          // leftIcon={<FiLogOut />}
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

const MenuItem = ({
  icon,
  label,
  click,
}: {
  icon: any;
  label: string;
  click?: () => void;
}) => {
  return (
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
};



export default Settings;
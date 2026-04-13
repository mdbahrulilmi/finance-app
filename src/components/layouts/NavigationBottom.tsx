import { HStack, Icon, Button } from "@chakra-ui/react"
import { MdHome, MdBarChart, MdPerson} from "react-icons/md"
import { PiMoney } from "react-icons/pi";
import { TbMoneybagHeart } from "react-icons/tb";
import { useNavigate } from "react-router-dom"

export const NavigationBottom = ({color}:{color:string}) => {
  const navigate = useNavigate();
    return(
    <HStack
        position="fixed"
        bottom={4}
        left="50%"
        transform="translateX(-50%)"
        w="95%"
        bg="white"
        borderRadius="3xl"
        p={2}
        boxShadow="lg"
        justifyContent="space-between"
      >
        {[
          { icon: MdHome, label: "Home", path: "/" },
          { icon: TbMoneybagHeart, label: "Pemasukan", path: "/pemasukan" },
          { icon: PiMoney, label: "Pengeluaran", path: "/pengeluaran" },
          { icon: MdBarChart, label: "Laporan", path: "/laporan" },
          { icon: MdPerson, label: "Akun", path: "/akun" },
        ].map((nav, index) => (
          <Button
            key={index}
            variant="ghost"
            flexDirection="column"
            flex="1"
            minW={0}
            onClick={() => navigate(nav.path)}
            p={2}
            _hover={{ bg: "gray.100" }}
            color={color}
          >
            <Icon as={nav.icon} boxSize={6} mb={0} />
          </Button>
        ))}
      </HStack>
    );    
}
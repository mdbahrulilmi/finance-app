import { HStack, Box, Icon } from "@chakra-ui/react";
import { useThemeColor } from "./theme-context";
import { FiCheck } from "react-icons/fi";
import { updateProfile } from "@/services/profile";

const ThemeRow = ({
  color,
  value,
}: {
  label: string;
  color: string;
  value: string;
}) => {
  const { color: active, setColor } = useThemeColor();

  const handleOnClick = async(value: any) =>{
      setColor(value)
      updateProfile({ theme: value });
  }

  return (
    <HStack
      w="full"
      px={2}
      py={2}
      minW={6}
      minH={6}
      justifyContent="center"
      cursor="pointer"
      borderColor="gray.100"
      _hover={{ bg: "gray.50" }}
      onClick={
        () => {
          setColor(value as any);
          handleOnClick(value as any);
        }
      }
    >
      <HStack>
        <Box
            w={8}
            h={8}
            borderRadius="full"
            bg={color}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Icon
                as={FiCheck}
                color="white"
                boxSize={3}
                opacity={active === value ? 1 : 0}
                />
        </Box>
        </HStack>
    </HStack>
  );
};

export default ThemeRow;
import { Box, Button, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useThemeColor } from "../ui/theme-context";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const data = [
  { label: "Gaji Bulanan" },
  { label: "Bonus" },
  { label: "Cashback" },
];

export const CategoryList = ({
  title,
}: {
  title: string;
}) => {
  const { theme } = useThemeColor();
  const navigate = useNavigate();

  return (
    <Box w="full" p={4} bg="gray.50" h={"100vh"}>
      <VStack w="full" align="start" gap={4}>
        
        <HStack display={"flex"} w={"full"} align={"center"} mb={1}>
            <Icon as={BiArrowBack} size={"md"} onClick={()=> navigate(-1)} cursor={"pointer"} color={"black"}/>
            <Heading fontSize="lg" fontWeight="bold" color={"black"}  ml={2}>
                {title}
            </Heading>
        </HStack>
        

        {/* List */}
        <VStack w="full" gap={3}>
          {data.map((item, index) => (
            <HStack
              key={index}
              w="full"
              p={3}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.100"
              bg={"white"}
              justifyContent="space-between"
              _hover={{
                bg: "white",
                transform: "translateY(-1px)",
                transition: "0.2s",
              }}
            >
              <HStack gap={3}>
                <Box
                  w="28px"
                  h="28px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  bg={theme.primary}
                  color="white"
                  fontSize="sm"
                  fontWeight="bold"
                >
                  {index + 1}
                </Box>

                {/* Label */}
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  {item.label}
                </Text>
              </HStack>
            </HStack>
          ))}
        </VStack>

        {/* Button Tambah */}
        <Button
            type="submit"
            position="fixed"
            bottom={4}
            left="50%"
            transform="translateX(-50%)"
            w="95%"
            borderRadius="2xl"
            p={4}
            bg={theme.primary}
            color="white"
            onClick={()=> navigate('/kategori/pemasukan/create')}
            >
            Tambah Kategori
            </Button>

      </VStack>
    </Box>
  );
};
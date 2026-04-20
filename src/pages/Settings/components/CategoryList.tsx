import { Box, Button, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useThemeColor } from "../../../components/ui/theme-context";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "@/services/useCategory";

export const CategoryList = () => {
  const { type } = useParams();
  console.log(type);
  const { theme } = useThemeColor();
  const navigate = useNavigate();
  const { data: categories = [] } = useCategory(type as any);
  const isIncome = type === "income";

  return (
    <Box 
      w="full" 
      p={4} 
      bg="gray.50" 
      h={"100vh"}
      maxW="375px"
      borderRadius="xl"
      display="flex"
      flexDirection="column"
      alignItems="center"
      mx="auto"
      >
      <VStack w="full" align="start" gap={4}>
        
        <HStack display={"flex"} w={"full"} align={"center"} mb={1}>
            <Icon as={BiArrowBack} size={"md"} onClick={()=> navigate(-1)} cursor={"pointer"} color={"black"}/>
            <Heading fontSize="lg" fontWeight="bold" color={"black"}  ml={2}>
                Kategori {isIncome ? 'Pemasukan' : 'Pengeluaran'}
            </Heading>
        </HStack>
        

        {/* List */}
        <VStack w="full" gap={3}>
          {categories.map((item, index) => (
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
              cursor={"pointer"}
              onClick={() =>
              navigate(`/kategori/${type}/form`, {
              state: {
                mode: "update",
                data: item,
              },
            })}
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

                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                  {item.name}
                </Text>
              </HStack>
            </HStack>
          ))}
        </VStack>

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
            onClick={() => navigate(`/kategori/${type}/form`, {
              state: {
                mode: "create",
              },
            })}
            >
            Tambah Kategori
            </Button>

      </VStack>
    </Box>
  );
};
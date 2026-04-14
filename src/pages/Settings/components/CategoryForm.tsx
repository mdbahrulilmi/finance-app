import { Box, Button, Input, Field, HStack, Icon, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useThemeColor } from "../../../components/ui/theme-context";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const CategoryForm = () => {
  const { theme } = useThemeColor();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = () => {
    setName("");
  };

  return (
    <Box  
        w="full"
        p={4} 
        bg="white" 
        maxW="375px"
        borderRadius="xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mx="auto"
        h="100vh"
    >        
        <HStack display={"flex"} w={"full"} align={"center"} mb={1}>
            <Icon as={BiArrowBack} size={"md"} onClick={()=> navigate(-1)} cursor={"pointer"} color={"black"}/>
            <Heading fontSize="lg" fontWeight="bold" color={"black"}  ml={2}>
                Tambah Kategori
            </Heading>
        </HStack>

        <Field.Root mt={10}>
            <Field.Label>Nama Kategori</Field.Label>
            <Input
            placeholder="Contoh: Makan, Gaji"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </Field.Root>

        <Button
            w="full"
            bg={theme.primary}
            color="white"
            _hover={{ opacity: 0.9 }}
            onClick={handleSubmit}
            disabled={!name}
            mt={3}
        >
            Tambah
        </Button>
    </Box>
  );
};
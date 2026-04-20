import { Box, Button, Input, Field, HStack, Icon, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useThemeColor } from "../../../components/ui/theme-context";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addCategory, updateCategory } from "@/services/category";

export const CategoryForm = () => {
const { type } = useParams();
  const { theme } = useThemeColor();
  const navigate = useNavigate();
  
  const location = useLocation();
  const state = location.state;
  
  const isUpdate = state?.mode === "update";
  const initialData = state?.data;
  
  const [name, setName] = useState(initialData?.name ?? "");
  
  const isIncome = type === "income";

  const handleSubmit = async () => {

    if(isUpdate){
       await updateCategory(initialData.id, {
        name: name,
        });
    }else{
        await addCategory({
            name: name,
            type: type as any
        });
    }
    navigate(-1)
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
                {isUpdate? 'Edit' : 'Tambah'} Kategori {isIncome? 'Pemasukan' : 'Pengeluaran'}
            </Heading>
        </HStack>

        <Field.Root mt={10}>
            <Field.Label>Nama Kategori</Field.Label>
            <Input
            placeholder={isIncome?"Contoh: Gaji, Freelance": "Contoh: Makan, Kontrakan"}
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
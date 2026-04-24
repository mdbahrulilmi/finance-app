import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Field,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import type { Pot } from "@/types/Pot";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useThemeColor } from "@/components/ui/theme-context";

type Props = {
  initialData?: Partial<Pot>;
  onSubmit: (data: Pot) => Promise<void> | void;
  submitLabel: string;
  loading?: boolean;
};

const PotForm: React.FC<Props> = ({
  initialData,
  onSubmit,
  submitLabel,
}) => {
  const [selectedImage, setSelectedImage] = useState(''); 
  const [formData, setFormData] = useState<Partial<Pot>>({
    name: "",
    target_amount: 0,
    deadline: "",
  });

  const navigate = useNavigate();
  const {theme} = useThemeColor();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        target_amount: initialData.target_amount || 0,
        deadline: initialData.deadline || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "target_amount") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        target_amount: Number(onlyNumbers),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.target_amount) {
      alert("Nama dan target wajib diisi");
      return;
    }

    await onSubmit({
      name: formData.name!,
      target_amount: Number(formData.target_amount),
      deadline: formData.deadline,
      image: selectedImage,
    });
  };


  const images = [
    'pot1.webp',
    'pot2.webp',
    'pot3.webp',
    'pot4.webp',
    'pot5.webp',
    'pot6.webp',
    'pot7.webp',
    'pot8.webp',
  ]

  return (
    <Box maxW="420px" mx="auto" p="6" h="100dvh">
      <HStack display={"flex"} w={"full"} align={"center"} mb={6}>
        <Icon as={LuArrowLeft} size={"md"} onClick={()=> navigate(-1)} cursor={"pointer"}/>
        <Heading size="md" ml={2}>
          Tambah POT
        </Heading>
      </HStack>
      <form onSubmit={handleSubmit}>
        <VStack gap={4} align="stretch">

          <Field.Root required>
            <Field.Label>Nama Pot</Field.Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Liburan Bali"
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Target (Rp)</Field.Label>
            <Input
              name="target_amount"
              value={formData.target_amount}
              onChange={handleChange}
              inputMode="numeric"
              placeholder="0"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Batas Waktu</Field.Label>
            <Input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Gambar</Field.Label>
          </Field.Root>
          <SimpleGrid columns={4} gap={1}>
            {
              images.map((img) => (
                <Box
                key={img}
                borderWidth={"4px"}
                borderColor={selectedImage == img ? 'black' : 'transparent'}
                onClick={() => {
                  setSelectedImage(img)
                  console.log(selectedImage)
                }}
                cursor="pointer"
                >
                  <Image 
                  src={`/images/${img}`}
                  w={"full"}
                  height={"full"}
                  >

                  </Image>
                  
                </Box>
              ))
            }

          </SimpleGrid>

          <Button
            type="submit"
            position="fixed"
            bottom={4}
            left="50%"
            transform="translateX(-50%)"
            w="95%"
            borderRadius="2xl"
            p={6}
            boxShadow="lg"
            bg={theme.primary}
            color="white"
          >
            {submitLabel}
          </Button>

        </VStack>
      </form>
    </Box>
  );
};

export default PotForm;
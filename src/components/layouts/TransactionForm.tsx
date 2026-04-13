import React, { useState } from "react";
import {
  Box,
  Button,
  Field,
  Input,
  Textarea,
  Heading,
  VStack,
  createListCollection,
  Portal,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { getToday } from "../utils/get-today";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

type TransactionFormData = {
  date: string;
  amount: number;
  source: string;
  category: string;
  notes: string;
};


type FormType = "income" | "expense";

type TransactionFormProps = {
  type: FormType;
};

const TransactionForm: React.FC<TransactionFormProps> = ({ type }) => {

    const navigate = useNavigate();
    
  const [formData, setFormData] = useState<TransactionFormData>({
    date: getToday(),
    amount: 0,
    source: "",
    category: "",
    notes: "",
  });

  const isIncome = type === "income";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      type,
    };

    console.log("Data:", payload);
  };

  const categoryCollection = createListCollection({
    items: isIncome
      ? [
          { label: "Gaji", value: "gaji" },
          { label: "Bisnis", value: "bisnis" },
          { label: "Investasi", value: "investasi" },
          { label: "Lainnya", value: "lainnya" },
        ]
      : [
          { label: "Makanan", value: "makanan" },
          { label: "Transport", value: "transport" },
          { label: "Belanja", value: "belanja" },
          { label: "Tagihan", value: "tagihan" },
        ],
  });

  return (
    <Box maxW="420px" mx="auto" p="6" h={"100vh"} rounded="xl" >
        <HStack display={"flex"} w={"full"} align={"center"} mb={6}>
        <Icon as={BiArrowBack} size={"md"} onClick={()=> navigate(-1)} cursor={"pointer"}/>
        <Heading size="md" ml={2}>
            {isIncome ? "Tambah Pendapatan" : "Tambah Pengeluaran"}
        </Heading>
        </HStack>

      <form onSubmit={handleSubmit}>
        <VStack gap={4} align="stretch">

          <Field.Root required>
            <Field.Label>Tanggal</Field.Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Jumlah (Rp)</Field.Label>
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              {isIncome ? "Sumber" : "Keterangan"}
            </Field.Label>
            <Input
              name="source"
              placeholder={
                isIncome ? "Gaji / Freelance" : "Contoh: Makan siang"
              }
              value={formData.source}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Kategori</Field.Label>

            <Select.Root
                collection={categoryCollection}
                value={formData.category ? [formData.category] : []}
                onValueChange={(e) =>
                    setFormData({ ...formData, category: e.value[0] })
                }
                >
                <Select.Trigger bg="white">
                    <Select.ValueText placeholder="Pilih kategori" />
                </Select.Trigger>

                {/* 🔥 WAJIB pakai Portal */}
                <Portal>
                    <Select.Positioner>
                    <Select.Content>
                        <Select.ItemGroup>
                        {categoryCollection.items.map((item) => (
                            <Select.Item item={item} key={item.value}>
                            {item.label}
                            </Select.Item>
                        ))}
                        </Select.ItemGroup>
                    </Select.Content>
                    </Select.Positioner>
                </Portal>
                </Select.Root>
          </Field.Root>

          <Field.Root>
            <Field.Label>Catatan</Field.Label>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Opsional"
            />
          </Field.Root>

          <Button
            type="submit"
            position="fixed"
            bottom={4}
            left="50%"
            transform="translateX(-50%)"
            w="95%"
            borderRadius="2xl"
            p={4}
            boxShadow="lg"
            bg={isIncome ? "green.500" : "red.500"}
            color="white"
          >
            Simpan
          </Button>

        </VStack>
      </form>
    </Box>
  );
};

export default TransactionForm;
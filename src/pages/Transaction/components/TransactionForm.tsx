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
import { useLocation, useNavigate } from "react-router-dom";
import type { Transaction } from "@/types/Transaction";
import { addTransaction, deleteTransaction, updateTransaction } from "@/services/transaction";
import { useCategory } from "@/services/useCategory";
import { LuArrowLeft } from "react-icons/lu";
import { useAccount } from "@/services/useAccounts";

type Props = {
  type: "income" | "expense";
};

const TransactionForm: React.FC<Props> = ({ type }) => {
  const navigate = useNavigate();
  const { data: categories = []} = useCategory(type);
  const { data: accounts = []} = useAccount();
  console.log(accounts);
  if(!categories.length){
    navigate(-1)
    return;
  }

  const location = useLocation();
  const state = location.state;

  const isUpdate = state?.mode === "update";
  const initialData = state?.data;
    
  const today = new Date().toLocaleDateString("sv-SE");

  const [formData, setFormData] = useState<Partial<Transaction>>({
    amount: initialData?.amount ?? 0,
    note: initialData?.note ?? "",
    category_id: initialData?.category_id ?? "",
    transaction_date: initialData?.transaction_date ?? today,
  });

  const isIncome = type === "income";

  const safeCategories = categories ?? [];

  const accountCollection = createListCollection({
    items: accounts.map((a) => ({
      label: a.name,
      value: a.id,
    }))
  })

  const categoryCollection = createListCollection({
    items: safeCategories.map((c) => ({
      label: c.name,
      value: c.id,
    })),
  });

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;

      if (name === "amount") {
        const onlyNumbers = value.replace(/[^0-9]/g, "");

        setFormData({
          ...formData,
          amount: Number(onlyNumbers)

        });

        return;
      }

      setFormData({
        ...formData,
        [name]: value,
      });

    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.transaction_date ||
      !formData.amount ||
      !formData.category_id ||
      !formData.note
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    const payload = {
      amount: Number(formData.amount),
      note: formData.note || "",
      type: type,
      transaction_date: formData.transaction_date!,
      category_id: formData.category_id!,
      account_id: formData.account_id!,
    };

    if (isUpdate) {
      await updateTransaction(initialData.id, payload);
    } else {
      await addTransaction(payload);
    }

    navigate(-1);
  };

  const handleDelete = async () => {
    if (isUpdate) {
        await deleteTransaction(initialData.id);
      }
    navigate(-1);
  }

  return (
    <Box maxW="420px" mx="auto" p="6" h={"100vh"} rounded="xl" >
        <HStack display={"flex"} w={"full"} align={"center"} mb={6}>
        <Icon as={LuArrowLeft} size={"md"} onClick={()=> navigate(-1)} cursor={"pointer"}/>
        <Heading size="md" ml={2}>
            {isUpdate
              ? "Edit Transaksi"
              : isIncome
              ? "Tambah Pendapatan"
              : "Tambah Pengeluaran"}
        </Heading>
        </HStack>

      <form onSubmit={handleSubmit}>
        <VStack gap={4} align="stretch">

          <Field.Root required>
            <Field.Label>Tanggal</Field.Label>
            <Input
              type="date"
              name="transaction_date"
              value={formData.transaction_date}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Jumlah (Rp)</Field.Label>
            <Input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              inputMode="numeric"
              placeholder="0"
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label>Kategori</Field.Label>

            <Select.Root
                collection={categoryCollection}
                value={formData.category_id ? [formData.category_id] : []}
                onValueChange={(e) =>
                  setFormData({ ...formData, category_id: e.value[0] })
                }
                >
                <Select.Trigger bg="white">
                    <Select.ValueText placeholder="Pilih kategori" />
                </Select.Trigger>

                <Portal>
                    <Select.Positioner>
                    <Select.Content>
                        <Select.ItemGroup>
                        {categoryCollection.items.map((item) => (
                            <Select.Item my={1} item={item} key={item.value}>
                            {item.label}
                            </Select.Item>
                        ))}
                        </Select.ItemGroup>
                    </Select.Content>
                    </Select.Positioner>
                </Portal>
                </Select.Root>
          </Field.Root>
          <Field.Root required>
            <Field.Label>Akun</Field.Label>
            <Select.Root
                collection={accountCollection}
                value={formData.account_id ? [formData.account_id] : []}
                onValueChange={(e) =>
                  setFormData({ ...formData, account_id: e.value[0] })
                }
                >
                <Select.Trigger bg="white">
                    <Select.ValueText placeholder="Pilih kategori" />
                </Select.Trigger>

                <Portal>
                    <Select.Positioner>
                    <Select.Content>
                        <Select.ItemGroup>
                        {accountCollection.items.map((item) => (
                            <Select.Item my={1} item={item} key={item.value}>
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
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Buat apa?"
              required
            />
          </Field.Root>
          {
            isUpdate &&
            <Button
              position="fixed"
              bottom={20}
              left="50%"
              transform="translateX(-50%)"
              w="95%"
              borderRadius="2xl"
              p={6}
              boxShadow="lg"
              bg={"red.500"}
              color="white"
              onClick={handleDelete}
            >
              Hapus
          </Button>
          }
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
            bg={"green.500"}
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
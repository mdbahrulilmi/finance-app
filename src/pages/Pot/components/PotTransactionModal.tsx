import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  Textarea,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCategory } from "@/services/useCategory";

type Props = {
  open: boolean;
  type: "income" | "expense";
  onClose: () => void;
  onSubmit: (data: {
    amount: number;
    note: string;
    category_id: string;
  }) => void;
};

export const PotTransactionModal = ({
  open,
  type,
  onClose,
  onSubmit,
}: Props) => {
  const { data: categories = [] } = useCategory(type);

  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (open) {
      setAmount(0);
      setNote("");
      setCategoryId("");
    }
  }, [open, type]);

  if (!open) return null;

  const categoryCollection = createListCollection({
    items: categories.map((c) => ({
        label: c.name,
        value: c.id,
    })),
    });

  return (
    <Box
      position="fixed"
      inset={0}
      bg="blackAlpha.600"
      display="flex"
      alignItems="flex-end"
      justifyContent="center"
      zIndex={999}
      onClick={onClose}
    >
      <Box
        bg="white"
        w="100%"
        maxW="420px"
        borderTopRadius="2xl"
        p={4}
        onClick={(e) => e.stopPropagation()}
      >
        <Box w="40px" h="4px" bg="gray.200" mx="auto" mb={4} borderRadius="full" />

        <Text fontWeight="600" mb={4}>
          {type === "income" ? "Setor ke Pot 💰" : "Tarik dari Pot 💸"}
        </Text>
        <Input
          type="number"
          placeholder="Nominal"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
          mb={3}
        />
        <Box mb={3}>
          <Select.Root
                collection={categoryCollection}
                value={categoryId ? [categoryId] : []}
                onValueChange={(e) => setCategoryId(e.value[0])}
                >
                <Select.Trigger bg="white">
                    <Select.ValueText placeholder="Pilih kategori" />
                </Select.Trigger>

                <Portal>
                    <Select.Positioner>
                    <Select.Content>
                        <Select.ItemGroup>
                        {categoryCollection.items.map((item) => (
                            <Select.Item key={item.value} item={item}>
                            {item.label}
                            </Select.Item>
                        ))}
                        </Select.ItemGroup>
                    </Select.Content>
                    </Select.Positioner>
                </Portal>
                </Select.Root>
        </Box>
        <Textarea
          placeholder="Catatan (opsional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          mb={4}
        />
        <HStack>
          <Button flex={1} variant="outline" onClick={onClose}>
            Batal
          </Button>

          <Button
            flex={1}
            bg={type === "income" ? "green.500" : "red.500"}
            color="white"
            onClick={() => {
              onSubmit({
                amount,
                note,
                category_id: categoryId,
              });
              onClose();
            }}
          >
            Simpan
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};
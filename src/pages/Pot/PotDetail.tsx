import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useThemeColor } from "@/components/ui/theme-context";
import { LuCirclePlus, LuCircleMinus} from "react-icons/lu";
import { useParams } from "react-router-dom";
import { usePotMembers } from "@/services/usePotMember";
import { useState } from "react";
import { addPotTransaction } from "@/services/pot";
import { PotTransactionModal } from "./components/PotTransactionModal";
import { usePotDetail } from "@/services/usePotDetail";
import { PotDetailHeader } from "./components/PotDetailHeader";
import { fmt } from "@/components/utils/RupiahFormater";
import { PotAnggota } from "./components/PotAnggota";
import { PotRiwayat } from "./components/PotRiwayat";
import { PotSettingsModal } from "./components/PotSettingsModal";

export const PotDetail = () => {
  const { theme } = useThemeColor();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openTx, setOpenTx] = useState<null | "income" | "expense">(null);

  const { data: members } = usePotMembers();
  const { data: POT } = usePotDetail(id!);

  if (!POT) {
    return
  }

  const anggota = members ?? [];
  const riwayat = POT?.transactions ?? [];

  const terkumpul = riwayat
    .filter((r: any) => r.type === "income")
    .reduce((sum: number, r: any) => sum + r.amount, 0);
  const tertarik = riwayat
    .filter((r: any) => r.type === "expense")
    .reduce((sum: number, r: any) => sum + r.amount, 0);
  const totalTerkumpul = terkumpul - tertarik;

  console.log(POT);
  const target = POT.target_amount;
  const PERSEN = Math.round((totalTerkumpul / target) * 100);
  const SISA = target - totalTerkumpul;
  
  const kontribusiMap = (riwayat ?? []).reduce((acc: any, t: any) => {
  if (t.type !== "income") return acc;

  const userId = t.user_id;

  acc[userId] = (acc[userId] || 0) + Number(t.amount);

  return acc;
}, {});
  return (
    <Box
      h="100dvh"
      w="100%"
      maxW="375px"
      mx="auto"
      pb={28}
      display="flex"
      flexDirection="column"
      bg="gray.50"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
     
     <PotDetailHeader POT={POT} anggota={anggota.length} open={ ()=> setOpen(true)}/>

      <Box mx={4} mt={-5} bg="white" borderRadius="2xl" p={4} boxShadow="sm" zIndex={1}>
        <HStack justify="space-between" mb={3}>
          <Box>
            <Text fontSize="xs" color="gray.500">Terkumpul</Text>
            <Text fontSize="xl" fontWeight="600">
              {fmt(totalTerkumpul)}
            </Text>
          </Box>

          <Box textAlign="right">
            <Text fontSize="xs" color="gray.500">Target</Text>
            <Text fontSize="sm" color="gray.600">
              {fmt(target)}
            </Text>
          </Box>
        </HStack>

        <Box bg="gray.100" borderRadius="full" h="8px" overflow="hidden" mb={2}>
          <Box
            w={`${PERSEN || 0}%`}
            h="full"
            bg={theme.primary}
          />
        </Box>

        <HStack justify="space-between">
          <Text fontSize="xs" color={theme.primary}>
            {PERSEN || 0}% tercapai
          </Text>
          <Text fontSize="xs" color="gray.500">
            Sisa {fmt(SISA)}
          </Text>
        </HStack>
      </Box>

      <HStack px={4} mt={4} gap={3}>
        <Button
          flex={1}
          bg={theme.primary}
          color="white"
          borderRadius="xl"
          onClick={() => setOpenTx("income")}
        >
          <LuCirclePlus /> Setor
        </Button>
        <Button
          flex={1}
          variant="outline"
          borderColor={theme.primary}
          color={theme.primary}
          borderRadius="xl"
          onClick={() => setOpenTx("expense")}
        >
          <LuCircleMinus /> Tarik
        </Button>
      </HStack>

      <PotAnggota anggota={anggota} kontribusiMap={kontribusiMap} terkumpul={terkumpul}/>

      <PotRiwayat riwayat={riwayat}/>
    {
    open &&
    <PotSettingsModal
      id={POT.id}
      inviteCode={POT.invite_code}
      close={()=> setOpen(false)}
    />
    }
    <PotTransactionModal
      open={openTx !== null}
      type={openTx ?? "income"}
      onClose={() => setOpenTx(null)}
      onSubmit={async (data) => {
        if (!openTx) return;

      await addPotTransaction(
          POT.id,
          openTx,
          data.amount,
          data.category_id,
          data.note
        );
        window.location.reload();
      }}
    />
    </Box>
  );
};
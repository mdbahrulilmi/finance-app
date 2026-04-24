import { useThemeColor } from "@/components/ui/theme-context";
import { Box, Image, Text, VStack, HStack, Badge, Card } from "@chakra-ui/react";

type Props = {
  data: {
    id: string;
    name: string;
    image: string;
    target_amount: number;
    current_amount: number;
    members_count?: number;
  };
  onClick: () => void;
};

export const PotCard = ({ data, onClick }: Props) => {
  const { theme } = useThemeColor();

  const TERKUMPUL = data.current_amount ?? 0;
  const TARGET = data.target_amount ?? 0;
  const PERSEN = TARGET ? Math.round((TERKUMPUL / TARGET) * 100) : 0;
  const SISA = TARGET - TERKUMPUL;

  return (
    <Card.Root
      flexDirection="row"
      overflow="hidden"
      maxW="lg"
      borderRadius="2xl"
      borderWidth="0.5px"
      cursor="pointer"
      onClick={onClick}
    >
      <Box position="relative" w="120px" flexShrink={0}>
        <Image
          src={`/images/${data.image}`}
          alt={data.name}
          w="full"
          h="full"
          objectFit="cover"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="to-r"
          gradientFrom="transparent"
          gradientTo="bg"
        />
      </Box>

      <Box flex="1" p={3}>
        <VStack align="start" gap={2}>
          <HStack justify="space-between" w="full">
            <Text fontWeight="500" fontSize="md" lineHeight="tight">
              {data.name}
            </Text>

            <Badge
              colorPalette="gray"
              variant="subtle"
              fontSize="2xs"
              borderRadius="full"
            >
              {data.members_count ?? 1} anggota
            </Badge>
          </HStack>

          <Box>
            <Text
              fontSize="2xs"
              color="fg.muted"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Terkumpul
            </Text>

            <Text fontSize="lg" fontWeight="500" lineHeight="tight">
              Rp {TERKUMPUL.toLocaleString("id-ID")}
            </Text>

            <Text fontSize="2xs" color="fg.muted">
              dari Rp {TARGET.toLocaleString("id-ID")}
            </Text>
          </Box>

          {/* Progress bar */}
          <Box w="full" bg="bg.subtle" borderRadius="full" h="6px" overflow="hidden">
            <Box
              w={`${PERSEN}%`}
              h="full"
              bg={theme.primary}
              borderRadius="full"
            />
          </Box>

          {/* Footer */}
          <HStack justify="space-between" w="full">
            <Text fontSize="2xs" color={theme.text} fontWeight="500">
              {PERSEN}% tercapai
            </Text>

            <Text fontSize="2xs" color="fg.muted">
              Sisa Rp {SISA.toLocaleString("id-ID")}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Card.Root>
  );
};
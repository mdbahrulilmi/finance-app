import { updateProfile } from "@/services/profile";
import { useProfile } from "@/services/useProfile";
import {
  Box,
  Input,
  Text,
  SimpleGrid,
  Image,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const avatars = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
];

export const EditProfileContent = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("avatar1.png");
  const queryClient = useQueryClient();

  const { data: profile } = useProfile();

   useEffect(() => {
        if (profile) {
          setName(profile.full_name ?? profile.username ?? "");
          setSelectedAvatar(profile.avatar_url ?? "avatar1.png");
        }
      }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile({
        full_name: name.trim() || null,
        avatar_url: selectedAvatar,
      });


     

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      toast.success("Profil berhasil diupdate");
      
      onClose();

    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <VStack align="start" gap={4}>
      <Box w="full">
        <Text fontSize="12px" mb={1} color="gray.500">
          Nama
        </Text>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          borderRadius="12px"
        />
      </Box>

      <Box w="full">
        <Text fontSize="12px" mb={2} color="gray.500">
          Pilih Avatar
        </Text>

        <SimpleGrid columns={4} gap={3}>
          {avatars.map((avatar) => (
            <Box
              key={avatar}
              boxSize="60px"
              borderRadius="full"
              overflow="hidden"
              border={
                selectedAvatar === avatar
                  ? "3px solid #3182ce"
                  : "3px solid transparent"
              }
              onClick={() => setSelectedAvatar(avatar)}
              cursor="pointer"
            >
              <Image
                src={`/images/${avatar}`}
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Save */}
      <Button
        w="full"
        mt={2}
        borderRadius="12px"
        bg="gray.800"
        color="white"
        onClick={handleSave}
      >
        Simpan
      </Button>
    </VStack>
  );
};
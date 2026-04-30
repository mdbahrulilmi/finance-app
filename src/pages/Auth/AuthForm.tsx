import { login, loginWithGoogle, register } from "@/services/auth";
import {
  Box,
  Button,
  Input,
  VStack,
  Field,
  Text,
  Span,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AuthFormProps = {
  type?: "login" | "register";
  onSubmit?: (data: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => void;
};

export const AuthForm = ({ type = "login", onSubmit }: AuthFormProps) => {
  const navigate = useNavigate();
  const isRegister = type === "register";

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (isRegister) {
      if (form.password !== form.confirmPassword) {
        console.error("Password tidak sama");
        return;
      }
      try {
        const res = await register(form.email, form.password);

        if (!res.session) {
          toast.success("Cek email untuk verifikasi");
          navigate("/masuk");
          return;
        }
      } catch (err: any) {
        toast.error(err.message || "Terjadi kesalahan");
      }
    } else {
      try {
        const res = await login(form.email, form.password);
        if (res.session) toast.success("Anda berhasil masuk");
          navigate("/");;
      } catch (err: any) {
        toast.error("Email atau password anda salah!");
      }
    }

    onSubmit?.(form);
    setForm({ email: "", password: "", confirmPassword: "" });
  };

  const isDisabled =
    !form.email ||
    !form.password ||
    (isRegister && !form.confirmPassword);

  return (
    <Box
      w="full"
      maxW="480px"
      minH="100dvh"
      mx="auto"
      bg="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      px={6}
      pt="18%"
      pb={10}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-80px"
        right="-80px"
        w="260px"
        h="260px"
        borderRadius="full"
        bg="gray.100"
        opacity={0.4}
        zIndex={0}
        pointerEvents="none"
      />

      <VStack gap={0} align="stretch" zIndex={1}>

        {/* App name */}
        <Box mb={8}>
          <Text
            fontSize="14px"
            fontWeight="semibold"
            letterSpacing="0.12em"
            textTransform="uppercase"
            color="black"
            mb={1}
          >
            ilmi <Span color="blue.500">finance</Span>
          </Text>
          <Text
            fontSize="28px"
            fontWeight="700"
            color="gray.800"
            letterSpacing="-0.03em"
            lineHeight="1.2"
          >
            {isRegister ? "Buat akun\nbaru" : "Selamat\ndatang kembali"}
          </Text>
          <Text fontSize="13px" color="gray.400" mt={2}>
            {isRegister
              ? "Daftarkan diri untuk mulai mencatat."
              : "Masuk untuk lanjutkan pencatatan."}
          </Text>
        </Box>

        {/* Form fields */}
        <VStack gap={3} align="stretch">
          <Field.Root>
            <Field.Label
              fontSize="11px"
              fontWeight="600"
              color="gray.500"
              letterSpacing="0.08em"
              textTransform="uppercase"
              mb={1}
            >
              Email
            </Field.Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              bg="white"
              border="1.5px solid"
              borderColor="gray.200"
              borderRadius="14px"
              h="50px"
              px={4}
              fontSize="14px"
              color="gray.800"
              _placeholder={{ color: "gray.300" }}
              _focus={{
                borderColor: "gray.400",
                boxShadow: "none",
                outline: "none",
              }}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label
              fontSize="11px"
              fontWeight="600"
              color="gray.500"
              letterSpacing="0.08em"
              textTransform="uppercase"
              mb={1}
            >
              Password
            </Field.Label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              bg="white"
              border="1.5px solid"
              borderColor="gray.200"
              borderRadius="14px"
              h="50px"
              px={4}
              fontSize="14px"
              color="gray.800"
              _placeholder={{ color: "gray.300" }}
              _focus={{
                borderColor: "gray.400",
                boxShadow: "none",
                outline: "none",
              }}
            />
          </Field.Root>

          {isRegister && (
            <Field.Root>
              <Field.Label
                fontSize="11px"
                fontWeight="600"
                color="gray.500"
                letterSpacing="0.08em"
                textTransform="uppercase"
                mb={1}
              >
                Ulangi Password
              </Field.Label>
              <Input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                bg="white"
                border="1.5px solid"
                borderColor="gray.200"
                borderRadius="14px"
                h="50px"
                px={4}
                fontSize="14px"
                color="gray.800"
                _placeholder={{ color: "gray.300" }}
                _focus={{
                  borderColor: "gray.400",
                  boxShadow: "none",
                  outline: "none",
                }}
              />
            </Field.Root>
          )}
        </VStack>

        <Button
    mt={5}
    h="52px"
    borderRadius="14px"
    bg={isDisabled ? "gray.200" : "gray.800"}
    color={isDisabled ? "gray.400" : "white"}
    onClick={handleSubmit}
  >
    {isRegister ? "Daftar Sekarang" : "Masuk"}
  </Button>

  {!isRegister && (
  <>
    <Text textAlign="center" fontSize="12px" color="gray.400" my={3}>
      atau
    </Text>
    <Button
      h="52px"
      borderRadius="14px"
      bg="white"
      color="black"
      border="1.5px solid"
      borderColor="gray.100"
      fontSize="14px"
      fontWeight="600"
      onClick={async () => {
        try {
          await loginWithGoogle();
        } catch (err: any) {
          toast.error(err.message || "Gagal login Google");
        }
      }}
      _hover={{ bg: "gray.50", color: "black" }}
    >
      <HStack gap={2}>
        <FcGoogle size={20} />
        <span>Login dengan Google</span>
      </HStack>
    </Button>
   </>
  )}
      </VStack>
      <Box textAlign="center" zIndex={1}>
        <Text fontSize="13px" color="gray.400">
          {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
          <Text
            as="span"
            color="gray.700"
            fontWeight="600"
            cursor="pointer"
            textDecoration="underline"
            textUnderlineOffset="3px"
            onClick={() => navigate(isRegister ? "/masuk" : "/daftar")}
          >
            {isRegister ? "Masuk" : "Daftar"}
          </Text>
        </Text>
      </Box>
    </Box>
  );
};
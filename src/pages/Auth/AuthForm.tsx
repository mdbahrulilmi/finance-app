import { login, register } from "@/services/auth";
import {
  Box,
  Button,
  Input,
  VStack,
  Field,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isRegister = type === "register";

  const handleChange = (e:any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
          alert("Cek email untuk verifikasi");
          navigate("/masuk");
          return;
        }
      } catch (err: any) {
        console.error(err.message);
      }

    } else {
      try {
        const res = await login(form.email, form.password);
        if (res.session) {
          navigate("/");
        }
      } catch (err: any) {
        console.error(err.message);
      }
    }

    onSubmit?.(form);

    setForm({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Box
      w="full"
      maxW={{ base: "100%", md: "400px" }}
      minH="100vh"
      mx="auto"
      p={6}
      bg="white"
      alignItems="center"
      justifyContent="center"
    >
      <VStack gap={4} align="stretch" mt={"40%"}>
        <Heading size="xl" fontWeight="bold" textAlign="center">
          {isRegister ? "Daftar" : "Masuk"}
        </Heading>

        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
          />
        </Field.Root>

        {isRegister && (
          <Field.Root>
            <Field.Label>Confirm Password</Field.Label>
            <Input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password"
            />
          </Field.Root>
        )}

        <Button
          bg="pink.500"
          color="white"
          _hover={{ opacity: 0.9 }}
          onClick={handleSubmit}
          disabled={
            !form.email ||
            !form.password ||
            (isRegister && !form.confirmPassword)
          }
        >
          {isRegister ? "Daftar" : "Masuk"}
        </Button>

        <Text textAlign="center" fontSize="sm">
        {isRegister ? (
            <>
            Sudah punya akun?{" "}
            <Text
                as="span"
                cursor="pointer"
                color="pink.500"
                onClick={() => navigate("/masuk")}
            >
                Masuk
            </Text>
            </>
        ) : (
            <>
            Belum punya akun?{" "}
            <Text
                as="span"
                cursor="pointer"
                color="pink.500"
                onClick={() => navigate("/daftar")}
            >
                Daftar
            </Text>
            </>
        )}
        </Text>
      </VStack>
    </Box>
  );
};
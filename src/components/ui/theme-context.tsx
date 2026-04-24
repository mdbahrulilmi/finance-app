import { useProfile } from "@/services/useProfile";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeColor = "pink" | "green" | "blue" | "black";

interface ThemeContextType {
  color: ThemeColor;
  setColor: (color: ThemeColor) => void;
  theme: {
    primary: string;
    secondary: string;
    text: string;
  };
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const themeMap = {
  pink: {
    primary: "pink.400",
    secondary: "pink.300",
    text: "pink.500",
  },
  green: {
    primary: "green.800",
    secondary: "green.700",
    text: "green.700",
  },
  blue: {
    primary: "blue.600",
    secondary: "blue.500",
    text: "blue.500",
  },
  black: {
    primary: "gray.800",
    secondary: "gray.700",
    text: "gray.900",
  },
};

export const ThemeProviderCustom = ({ children }: any) => {
  const getInitialTheme = (): ThemeColor => {
    if (typeof window === "undefined") return "black";
    return (localStorage.getItem("theme-color") as ThemeColor) || "black";
  };

  const [color, setColor] = useState<ThemeColor>(getInitialTheme);

  const { data: profile } = useProfile();

  useEffect(() => {
    if (profile?.theme) {
      setColor(profile.theme as ThemeColor);
    }
  }, [profile]);

  useEffect(() => {
  if (profile?.theme) {
    setColor(profile.theme as ThemeColor);
  }
}, [profile]);

  useEffect(() => {
    localStorage.setItem("theme-color", color);
  }, [color]);

  return (
    <ThemeContext.Provider
      value={{
        color,
        setColor,
        theme: themeMap[color],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeColor = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeColor must be used inside provider");
  return context;
};
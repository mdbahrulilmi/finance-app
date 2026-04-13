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
    primary: "green.400",
    secondary: "green.300",
    text: "green.500",
  },
  blue: {
    primary: "blue.400",
    secondary: "blue.300",
    text: "blue.500",
  },
  black: {
    primary: "gray.800",
    secondary: "gray.700",
    text: "gray.900",
  },
};

export const ThemeProviderCustom = ({ children }: any) => {
  const [color, setColor] = useState<ThemeColor>("pink");

  useEffect(() => {
    const saved = localStorage.getItem("theme-color") as ThemeColor;
    if (saved) setColor(saved);
  }, []);

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
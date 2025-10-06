// theme.ts
export type ThemeColors = {
  background: string;
  card: string;
  text: string;
  link: string;
  primary: string;
  secondary: string;
  border: string;
  placeholder: string;
  shadow: string;
};

export type Theme = {
  dark: boolean;
  colors: ThemeColors;
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    card: "#FAFAFA",
    link:"#3B82F6",
    text: "#111827",
    primary: "#ff455b",
    secondary: "#6B7280",
    border: "#E5E7EB",
    placeholder: "#9CA3AF",
    shadow: "rgba(0,0,0,0.08)",
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    background: "#0B1220",
    card: "#0F1724",
    text: "#E6EEF8",
    primary: "#ff455a",
    link:"#3B82F6",
    secondary: "#9CA3AF",
    border: "#1F2937",
    placeholder: "#6B7280",
    shadow: "rgba(0,0,0,0.5)",
  },
};

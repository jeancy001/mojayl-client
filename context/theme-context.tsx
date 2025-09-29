// theme-context.tsx
import { darkTheme, lightTheme, Theme } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from "react";

type ThemeState = {
  theme: Theme;
};

type ThemeAction =
  | { type: "TOGGLE_THEME" }
  | { type: "SET_THEME"; payload: Theme };

const STORAGE_KEY = "@user_theme";

const initialState: ThemeState = {
  theme: lightTheme,
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { theme: state.theme.dark ? lightTheme : darkTheme };
    case "SET_THEME":
      return { theme: action.payload };
    default:
      return state;
  }
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load theme from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTheme) {
          const parsed: Theme = JSON.parse(storedTheme);
          dispatch({ type: "SET_THEME", payload: parsed });
        }
      } catch (err) {
        console.log("Error loading theme from storage:", err);
      }
    })();
  }, []);

  // Save theme to AsyncStorage whenever it changes
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.theme));
      } catch (err) {
        console.log("Error saving theme to storage:", err);
      }
    })();
  }, [state.theme]);

  const toggleTheme = () => dispatch({ type: "TOGGLE_THEME" });
  const setTheme = (t: Theme) => dispatch({ type: "SET_THEME", payload: t });

  return (
    <ThemeContext.Provider value={{ theme: state.theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

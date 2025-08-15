import React, {
  createContext,
  useCallback,
  useMemo,
  useContext,
  useState,
  ReactNode,
} from "react";

import { View, Text, Button } from "react-native";

//Context API
interface AppContextType {
  user: string | null;
  theme: "light" | "dark";
  toggleTheme: () => void;
  loginUser: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const loginUser = useCallback(() => {
    setUser("joins Herd");
  }, []);

  const contextValue = useMemo(
    () => ({ user, theme, toggleTheme, loginUser }),
    [user, theme, toggleTheme, loginUser]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const HomeScreen: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("HomeScreen must be used within AppProvider");
  }

  const { user, theme, toggleTheme, loginUser } = context;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Current user: {user || "Guest"}</Text>
      <Text>Theme: {theme} </Text>
      <Button title="Login" onPress={loginUser} />
      <Button title="Toggle theme" onPress={toggleTheme} />
    </View>
  );
};

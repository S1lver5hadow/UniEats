import { PropsWithChildren, createContext, useContext, useState } from "react";
import { DefaultTheme, Theme } from "@react-navigation/native";
import { ColorTheme } from "../constants/Types";
import { Colors } from "../constants/Colors";
import * as Navigation from "@react-navigation/native";

type ThemeType = {
  theme: Theme,
  colorTheme: ColorTheme,
  toggleTheme: () => void,
}

const ThemeContext = createContext<ThemeType>({
  theme: DefaultTheme,
  colorTheme: Colors['light'],
  toggleTheme: () => {},
});

const DarkTheme = {
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: 'rgb(49, 51, 56)',
    card: 'rgb(30, 31, 34)',
    text: 'rgb(220, 222, 225)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
};

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(DefaultTheme);
  const [colorTheme, setColorTheme] = useState<ColorTheme>(Colors['light']);
  
  const toggleTheme = () => {
    if (theme.dark) {
      setTheme(DefaultTheme)
      setColorTheme(Colors['light'])
    } else {
      setTheme(DarkTheme)
      setColorTheme(Colors['dark'])
    }
  }

  return (
    <ThemeContext.Provider
      value={{ theme, colorTheme, toggleTheme }}
    >
      <Navigation.ThemeProvider value={theme}>
        {children}
      </Navigation.ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);

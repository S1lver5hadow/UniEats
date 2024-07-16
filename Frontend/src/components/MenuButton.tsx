import React, { useMemo } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ColorTheme } from '../constants/Types';
import { useTheme } from  '@/src/providers/ThemeProvider'

interface MenuButtonProps {
  href: any;
  text: string;
}

const MenuButton = ({ href, text }: MenuButtonProps) => {
  const { colorTheme, theme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  return (
    <Link href={href} asChild>
      <Pressable style={styles.menuButton} accessibilityLabel={text}>
        <Text style={styles.menuButtonText}>
          {text}
        </Text>
      </Pressable>
    </Link>
  )
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  menuButton: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colorButton,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: theme.colorBorder,
    height: 120,
    width: "90%",
    margin: 15,
  },
  menuButtonText: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
  }
})

export default MenuButton;
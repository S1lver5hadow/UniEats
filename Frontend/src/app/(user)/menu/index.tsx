import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MenuButton from "../../../components/MenuButton";
import { ROUTES } from "../../../constants/Routes";
import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect } from "expo-router";
import { ColorTheme } from '@/src/constants/Types';
import { useTheme } from '@/src/providers/ThemeProvider';

// Disables font resizing set by OS so that visual style is consistent between devices
//@ts-ignore
Text.defaultProps = Text.defaultProps || {};
//@ts-ignore
Text.defaultProps.maxFontSizeMultiplier = 1;
//@ts-ignore
TextInput.defaultProps = Text.defaultProps || {};
//@ts-ignore
TextInput.defaultProps.maxFontSizeMultiplier = 1;

export default function TabOneScreen() {
  const { loggedIn } = useAuth();
  const { colorTheme, theme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  if (!loggedIn) {
    return <Redirect href='/sign-up'/>
  }

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start' }}
    >
      <Text style={styles.info}>Please select the option for the action you'd like to perform</Text>

      <MenuButton href={ROUTES.ORDER} text="I want to order" />
      <MenuButton href={ROUTES.DELIVERY} text="I want to deliver" />
      <MenuButton href={ROUTES.VIEW_ORDERS} text="I want to view my orders" />
    </ScrollView>
  );
}

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    flex: 1
  },
  info: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: "center",
    padding: 25,
    color: theme.text
  }
});

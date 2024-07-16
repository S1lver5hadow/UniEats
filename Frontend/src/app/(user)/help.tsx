import { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '@/src/constants/Types';

export default function HelpScreen() {
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.info}>If you've had an issue with your order then contact us here:</Text>
      <Text style={styles.contact}>Email: help@UniEats.co.uk</Text>
      <Text style={styles.contact}>Phone Number: (+44) 0207 594 7243 </Text>
    </View>
  );
}

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contact: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 20,
  },
  info: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 26,
    textAlign: "center",
    padding: 25
  }
})
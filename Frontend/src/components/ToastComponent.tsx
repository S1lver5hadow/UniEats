import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';
import { useTheme } from "@/src/providers/ThemeProvider";
import { ColorTheme } from '../constants/Types';

export interface ToastProps {
  text1?: string;
  text2?: string;
}

const ToastComponent = ({ text1 = '', text2 = '' }: ToastProps) => {
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
      </View>
      <TouchableOpacity onPress={() => Toast.hide()} style={styles.closeButton}>
        <FontAwesome name="close" size={35} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    width: '100%',
    backgroundColor: theme.colorButton,
    padding: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  text2: {
    fontSize: 16,
    color: 'white'
  },
  closeButton: {
    marginLeft: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 28,
    color: 'white',
  },
});

export default ToastComponent;
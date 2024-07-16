import { Pressable, StyleSheet, Text, View } from 'react-native';
import { forwardRef, useState, useMemo } from 'react';
import { useCart } from "../providers/CartProvider";
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';

type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const CartButton = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => { 
    const [isLoading, setIsLoading] = useState(false);
    const { theme, colorTheme } = useTheme();
    const styles = useMemo(() => makeStyles(colorTheme), [theme]);

    return (
      <Pressable
        ref={ref}
        disabled={isLoading}
        {...pressableProps}
        style={[styles.container, isLoading && styles.disabledContainer]}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colorButton,
    padding: 10,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 0,
    width: '100%',
  },
  text: {
    fontFamily: 'Abadi',
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  disabledContainer: {
    opacity: 0.5,
  },
});

export default CartButton;

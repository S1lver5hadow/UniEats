import { View, Text, FlatList, StyleSheet, Platform, Pressable } from 'react-native';
import { useMemo } from 'react';
import { useCart } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';

const CartScreen = () => {
  const { items, total, itemCount } = useCart();
  const router = useRouter();
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  const handleCheckout = async () => {
    if (items.length === 0) {
      return;
    }
    
    router.navigate('checkout')
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({item}) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />

      <Text style={styles.price}>
        Total: £{total.toFixed(2)}
        {"\n"}
        Items: {itemCount}
      </Text>
      <Pressable style={styles.container} onPress={handleCheckout}>
        <Text style={styles.text}>Checkout</Text>
      </Pressable>
      <StatusBar style={ Platform.OS === 'ios' ? 'light' : 'auto' } />
    </View>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  price: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Abadi',
    padding: 10,
    color: theme.text
  },
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
})

export default CartScreen;

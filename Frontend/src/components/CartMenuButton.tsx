import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, Pressable, View, StyleSheet } from "react-native";
import { useCart } from "../providers/CartProvider";
import { useTheme } from "@/src/providers/ThemeProvider"

const CartMenuButton = () => {
  const { itemCount } = useCart();
  const { colorTheme } = useTheme();
    
  return (
    <Link href="/cart" asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={styles.container}>
            <FontAwesome
              name="shopping-cart"
              size={35}
              color={colorTheme.iconColor} 
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
            <Text style={{ ...styles.counter, color: colorTheme.text }}>
              {itemCount}
            </Text> 
          </View>
        )}
      </Pressable>
    </Link>
  )
}

export default CartMenuButton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  counter: {
    fontSize: 20,
    fontFamily: 'Abadi'
  }
});


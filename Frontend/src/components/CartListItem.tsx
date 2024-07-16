import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useMemo } from 'react';
import { CartItem } from '../constants/Types';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../providers/CartProvider';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity, deleteItem } = useCart();
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  const confirmDelete = (itemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to clear this item from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteItem(itemId),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 5, flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>£{cartItem.product.price}</Text>
          <Text style={styles.restaurant}>Restaurant: {cartItem.product.restaurant}</Text>
        </View>
      </View>
      <View style={styles.productOps}>
        <View style={styles.quantitySelector}>
          <FontAwesome
            onPress={() => updateQuantity(cartItem.id, -1)}
            name="minus"
            color={colorTheme.light ? 'gray' : 'white'}
            style={{ padding: 5 }}
          />

          <Text style={styles.quantity}>{cartItem.quantity}</Text>
          <FontAwesome
            onPress={() => updateQuantity(cartItem.id, 1)}
            name="plus"
            color={colorTheme.light ? 'gray' : 'white'}
            style={{ padding: 5 }}
          />
        </View>
          <FontAwesome
            onPress={() => confirmDelete(cartItem.id)}
            name="trash"
            color={colorTheme.light ? '#DB0F0F' : '#F54545'}
            style={{ padding: 5 }}
            size={22}
          />
      </View>
    </View>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    backgroundColor: theme.product,
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
    color: theme.text
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5
  },
  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  productOps: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18,
    color: theme.light ? 'black' : 'white'
  },
  price: {
    color: theme.colorText,
    fontWeight: 'bold',
  },
  restaurant: {
    color: theme.text
  }
});

export default CartListItem;
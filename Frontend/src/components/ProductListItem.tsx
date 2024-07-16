import React, { useState, useMemo } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { Product } from '../constants/Types';
import CartButton from './CartButton';
import { useCart } from '../providers/CartProvider';
import Toast from 'react-native-toast-message';
import CollapsibleContainer from './CollapsibleContainer';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';

type ProductListItemProps = { 
  product: Product
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  const { addItem, items } = useCart();
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  const cartItem = items.find(item => item.product.name === product.name);
  const currentQuantity = cartItem ? cartItem.quantity + 1 : 1;

  const addToCart = () => {
    addItem(product);
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${product.name} has been added to your cart.
Current quantity: ${currentQuantity}`,
      position: 'bottom',
      props: {
        text2NumberOfLines: 2
      }
    });
  }

  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setExpanded(!expanded);
      }}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>£{product.price}</Text>
      <CollapsibleContainer expanded={expanded}>
        <Text>
          {product.additionalInfo === '' ? 'No additional info.' : product.additionalInfo}
        </Text>
      </CollapsibleContainer>
      <CartButton onPress={addToCart} text="Add to cart" />
    </Pressable>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 220,
    height: 'auto',
    backgroundColor: theme.product,
    padding: 10,
    borderColor: theme.textInputBorder,
    borderWidth: 3,
    justifyContent: 'space-between',
    borderRadius: 30,
  },
  productName: {
    fontFamily: 'Abadi',
    color: theme.productText,
    fontSize: 36,
    textAlign: 'center',
    padding: 5,
  },
  productPrice: {
    fontFamily: 'Abadi',
    color: theme.productText,
    fontSize: 28,
    textAlign: 'center',
    padding: 5,
  }
});

export default ProductListItem;

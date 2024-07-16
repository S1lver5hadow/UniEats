import { View, Text, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { Product } from '../constants/Types';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';

type OrderDetailsListItemProps = {
  product: Product;
  quantity: number
};

const OrderDetailsListItem = ({ product, quantity }: OrderDetailsListItemProps) => {
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.orderDetails}>{product.name}</Text>
          <Text style={styles.orderDetails}>Quantity: {quantity}</Text>
          <Text style={styles.orderDetails}>Restaurant: {product.restaurant}</Text>
        </View>

        <Text style={styles.orderDetails}>£{product.price}</Text>
      </View>
    </View>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    backgroundColor: theme.product,
    borderWidth: 2,
    borderColor: theme.light ? 'black' : theme.textInputBorder,
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  orderDetails: {
    color: theme.text,
    fontWeight: '500',
    fontSize: 16,
    padding: 5
  }
});

export default OrderDetailsListItem;
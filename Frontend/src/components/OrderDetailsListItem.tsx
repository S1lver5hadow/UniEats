import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useMemo } from 'react';
import { APIOrder } from '../constants/Types';
import { Link } from 'expo-router';
import { formatDistanceToNow } from 'date-fns';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';

type OrderDetailsListProps = {
  order: APIOrder;
  ordering: boolean;
  current: boolean;
};

const OrderListItem = ({ order, ordering, current }: OrderDetailsListProps) => {
  const orderDate = new Date(order.timestamp);
  const timeSinceOrder = formatDistanceToNow(orderDate, { addSuffix: true });
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  return (
    <Link href={`/menu/${ordering ? "order" : "delivery"}Details/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.title}>Order ID: </Text>
          <Text style={styles.info}>{order.id}</Text>
        </View>

        <View style={styles.orderIdContainer}>
          <Text style={styles.title}>Created: </Text>
          <Text style={styles.info}>{timeSinceOrder}</Text>
        </View>

        <View style={styles.orderIdContainer}>
          <Text style={styles.title}>{current ? "You are " : "You "}</Text>
          <Text style={[styles.info, ordering ? styles.orderingColour : styles.deliveringColour]}>
            {current ? (ordering ? "ordering" : "delivering") : (ordering ? "ordered" : "delivered")}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    backgroundColor: theme.product,
    padding: 10,
    borderRadius: 10,
    borderColor: theme.light ? 'black' : theme.textInputBorder,
    borderWidth: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.productText,
    marginVertical: 5,
  },
  info: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.productText,
    marginVertical: 3,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderingColour: {
    fontWeight: 'bold',
    color: theme.order,
  },
  deliveringColour: {
    fontWeight: 'bold',
    color: theme.deliver,
  },
});

export default OrderListItem;
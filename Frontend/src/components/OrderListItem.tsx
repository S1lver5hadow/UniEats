import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useMemo } from 'react';
import { APIOrder, OrderItem } from '../constants/Types';
import { Link, useRouter } from 'expo-router';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesome } from '@expo/vector-icons';
import EditOrderStatusAsync from '@/assets/data/editOrder';
import { useAuth } from '../providers/AuthProvider';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';

type OrderListItemProps = {
  order: APIOrder;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const orderDate = new Date(order.timestamp);
  const timeSinceOrder = formatDistanceToNow(orderDate, { addSuffix: true });
  const router = useRouter();
  const { username, legalName, idURL } = useAuth()
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);
  const totalQuantity = JSON.parse(order.items).reduce(
    (total: number, item: OrderItem) => total + item.quantity,
    0
  );

  const confirmAcceptOrder = async () => {
    Alert.alert(
      'Accept Order',
      `Accept order #${order.id}?`,
      [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {
            return;
          },
        },
        {
          text: 'Yes',
          onPress: handleAcceptOrder
        },
      ],
      { cancelable: true }
    );
  };

  const handleAcceptOrder = async () => {
    if (legalName === "" || idURL === null) {
      Alert.alert("Can't accept orders yet",
            "Your account either doesn't have a legal name or a form of identification uploaded yet.\n\n"+
            "Go to \"Your Account\" > \"Manage Identification\" to set up your details before you start accepting orders");
      return;
    }
    try {
      EditOrderStatusAsync(order.id, "OA", username);
      router.back()
      router.navigate({
        pathname: '/accepted',
        params: { orderID: order.id },
      });
    } catch (error) {
      console.error('Error accepting order:', error);
      Alert.alert('Error', 'Failed to accept order. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Link href={`/menu/orders/${order.id}`} asChild>
        <Pressable style={styles.leftContainer}>
          <Text style={styles.title}>Order ID: {order.id}</Text>
          <Text style={styles.title}>Delivery Payment: £{order.deliveryCost}</Text>
          <Text style={styles.title}>Created: {timeSinceOrder}</Text>
          <Text style={styles.title}>Item Quantity: {totalQuantity}</Text>
        </Pressable>
      </Link>
      <Pressable style={styles.rightContainer} onPress={confirmAcceptOrder}>
        <FontAwesome name="check-circle" size={45} color="white" />
        <Text style={styles.acceptButtonText}>Accept Order</Text>
      </Pressable>
    </View>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  leftContainer: {
    backgroundColor: theme.colorButton,
    padding: 10,
    borderRadius: 10,
    flex: 7.5,
    marginRight: 5,
  },
  rightContainer: {
    flex: 2.5,
    backgroundColor: theme.colorButton,
    padding: 10,
    borderRadius: 10,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 5,
  },
  acceptButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    padding: 8,
    textAlign: 'center'
  },
});

export default OrderListItem;

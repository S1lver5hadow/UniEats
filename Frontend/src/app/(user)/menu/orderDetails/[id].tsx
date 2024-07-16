import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { useMemo, useState, useEffect } from 'react';
import Orders from '@/assets/data/ordersExternalState';
import OrderItem from '@/src/components/OrderItem';
import Products from '@/assets/data/products';
import ScrollIndicator from '@/src/components/ScrollIndicator';
import { format } from 'date-fns';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '@/src/constants/Types';

const OrderDetailsScreen = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const { id } = useLocalSearchParams();
  const prodData = Products({ query: '' });
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);
  const navigation = useNavigation();
  
  useEffect(() => {
    Orders({ query: '', setExternalState: setOrders });

    var refreshInterval = setInterval(() => {
      if (!navigation.isFocused()) {
        clearInterval(refreshInterval);
      }
      Orders({ query: '', setExternalState: setOrders });
    }, 5000);

  }, []);

  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  const products = JSON.parse(order.items).map((item: any) => {
    const product = prodData.find((p) => p.id === item.id);
    return product ? { product, quantity: item.quantity }
                   : { product: 'Unknown', quantity: item.quantity };
  });

  const orderDate = new Date(order.timestamp);
  const formattedDate = format(orderDate, 'dd/MM/yyyy HH:mm');

  const getHeader = () => {
    return (
      <View>
        <View style={styles.orderIdContainer}>
          <Text style={styles.infoLabel}>Order ID:</Text>
          <Text style={styles.info}>{order.id}</Text>
        </View>

        <View style={styles.orderIdContainer}>
          <Text style={styles.infoLabel}>Role:</Text>
          <Text style={styles.info}>You{order.status === "D" ? "" : " are"}</Text>
          <Text style={[styles.info, { color: colorTheme.order }]}>
            {order.status === "D" ? "ordered" : "ordering"}
          </Text>
        </View>

        <View style={styles.orderIdContainer}>
          <Text style={styles.infoLabel}>Date Created:</Text>
          <Text style={styles.info}>{formattedDate}</Text>
        </View>
  
        <View style={styles.orderIdContainer}>
          <Text style={styles.infoLabel}>Order Total:</Text>
          <Text style={styles.info}>£{
            (parseFloat(order.totalFoodPrice) + parseFloat(order.deliveryCost)).toFixed(2)
          }</Text>
        </View>

        <View style={styles.orderIdContainer}>
          <Text style={styles.infoLabel}>Room:</Text>
          <Text style={styles.info}>{order.room}</Text>
        </View>

        <View style={styles.orderIdContainer}>
          <Text style={styles.infoLabel}>Order Status:</Text>
          <Text style={styles.info}>
            {order.status === "OP" ? "Awaiting Acceptance" 
                                   : (order.status === "OA" ? "Being Delivered"
                                                            : "Delivered")}
          </Text>
        </View>
        
        <DeliveryTimeInfo orderStatus={order.status}/>
        <Text style={styles.orderDetailsTitle}>Order Items</Text>
      </View>
    )
  };

  interface DeliveryTimeInfoProps {
    orderStatus: string;
  };

  function DeliveryTimeInfo({orderStatus}: DeliveryTimeInfoProps) {
    // Very basic way of estimating delivery time. More of a place holder for a real estimate we
    // may want to use in the future
    if (orderStatus !== "D") {
      return (
        <View style={styles.orderIdContainer}>
          <Text style={styles.infoLabel}>Estimated Wait Time:</Text>
          <Text style={styles.info}>
            {orderStatus === "OP" ? "15m" 
                                  : (orderStatus === "OA" ? "10m" : "0m")}
          </Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id} Details` }} />
      
      <FlatList
        data={products}
        renderItem={({ item }) => <OrderItem product={item.product} quantity={item.quantity} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={getHeader}
      />        

      <ScrollIndicator bottom={30}/>
    </View>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  orderDetailsTitle: {
    color: theme.text,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 36,
    padding: 5
  },
  infoLabel: {
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 36,
    textAlign: 'left',
    padding: 5
  },
  info: {
    fontWeight: '500',
    color: theme.text,
    fontSize: 32,
    textAlign: 'left',
    padding: 5
  }
});

export default OrderDetailsScreen;

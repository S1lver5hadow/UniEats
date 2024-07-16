import { View, FlatList, StyleSheet, Text, SectionList } from 'react-native';
import OrderDetailsListItem from '../../../components/OrderDetailsListItem';
import { Stack } from 'expo-router';
import ScrollIndicator from '@/src/components/ScrollIndicator';
import { useAuth } from '@/src/providers/AuthProvider';
import { BACKEND_URL } from '@/src/constants/Backend';
import { useEffect, useState, useMemo } from 'react';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from "@/src/constants/Types";

const UserOrders = () => {
  const { username } = useAuth();
  const [orderData, setOrderData] = useState<any[]>([]);
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  const getOrderIDs = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/${username}`);
      const user = await response.json();
      return [...user.placed_orders, ...user.delivering_orders]
    } catch (error) {
      return;
    }
  }

  const fetchOrderDetails = async (orderID: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/orders/${orderID}`);
      const order = await response.json();
      return order;
    } catch (error) {
      console.error(`Error fetching order details for ID ${orderID}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const orderIDs = await getOrderIDs();

      if (!orderIDs) {
        return
      }
      
      const orders = await Promise.all(orderIDs.map(fetchOrderDetails));
      const processedOrders = orders.map(order => ({
        order: order,
        status: order.status,
        ordering: order.orderedBy === username
      }));

      setOrderData(processedOrders.filter(order => order.order !== null));
    };

    fetchData();
  }, [username]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Your Orders and Deliveries' }} />

      <SectionList
        sections={[
          {title: 'Current Orders', data: orderData.filter(o => (o.status === "OP" || o.status == "OA"))},
          {title: 'Past Orders', data: orderData.filter(o => (o.status === "D"))}
        ]}
        renderItem={({ item, section }) =>
          <OrderDetailsListItem
            order={item.order}
            ordering={item.ordering}
            current={section.title === 'Current Orders'}
          />
        }
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({section}) => <Text style={styles.info}>{section.title}</Text>}
        keyExtractor={(item) => item.order.id.toString()}
        stickySectionHeadersEnabled={false}
      />

      <ScrollIndicator bottom={30}/>
    </View>
  );
}

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  },
  pickerContainer: {
    padding: 10
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listContent: {
    gap: 10,
    padding: 10,
  },
  title: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 96,
  },
  info: {
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 24,
    marginLeft: 5,
    textAlign: 'left',
    padding: 5
  }
});

export default UserOrders;
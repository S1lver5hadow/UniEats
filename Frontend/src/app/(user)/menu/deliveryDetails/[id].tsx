import { View, Text, StyleSheet, Alert, Pressable, SectionList } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import Orders from '@/assets/data/orders';
import OrderItem from '@/src/components/OrderItem';
import Products from '@/assets/data/products';
import ScrollIndicator from '@/src/components/ScrollIndicator';
import { format } from 'date-fns';
import LocationText from '@/src/components/LocationText';
import EditOrderStatusAsync from '@/assets/data/editOrder';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '@/src/constants/Types';
import LocationDetails from '@/src/components/LocationDetails';
import Restaurants from '@/assets/data/restaurants';

const DeliveryDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const orders = Orders({ query: '' });
  const prodData = Products({ query: '' });
  const allRestaurantData = Restaurants();
  const router = useRouter();
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  const order = orders.find((o) => o.id.toString() === id);

  const parseArray = (textArr: string) => {
    return textArr.slice(1, -1).split(', ').map((dept: string) => dept.trim());
  };
  
  if (!order) {
    return <Text>Order not found!</Text>;
  }
  
  const restaurants = parseArray(order.restaurants);
  const restaurantData = allRestaurantData.filter(item => 
    restaurants.includes(item.name)
  );

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
          <Text style={[styles.info, { color: colorTheme.deliver }]}>
            {order.status === "D" ? "delivered" : "delivering"}
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

        { 
          order.extraInfo === "" ? <></> : 
          <View style={styles.orderIdContainer}>
            <Text style={styles.infoLabel}>Extra Info:</Text>
            <Text style={styles.info}>{order.extraInfo}</Text>
          </View>
        }

        <View style={styles.orderIdContainer}>
          <Text style={styles.infoLabel}>Delivery Location:</Text>
          <LocationText long={order.longitude} lat={order.latitude}/>
        </View>
      </View>
    )
  }

  interface MarkAsDeliveredButtonProps {
    orderStatus: string;
    orderID: number;
  }

  const MarkAsDeliveredButton = ({orderStatus, orderID}: MarkAsDeliveredButtonProps) => {
    const handleMarkAsDelivered = async () => {
      try {
        EditOrderStatusAsync(orderID, "D", '');
        Alert.alert('Success', `Successfully marked order #${orderID} as delivered.`);
        router.navigate('/(user)/menu');
      } catch (error) {
        console.error('Error marking order as delivered:', error);
        Alert.alert('Error', 'Failed to mark order as delivered. Please try again later.');
      }
    };
  
    if (orderStatus !== "D") {
      return (
        <Pressable style={styles.deliveredButton} onPress={handleMarkAsDelivered}>
          <Text style={styles.deliveredButtonText}>Mark as Delivered</Text>
        </Pressable>
      );
    }
  }
  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Delivery #${order.id} Details` }} />

      <SectionList
        sections={[
          {title: 'Restaurants', data: restaurantData},
          {title: 'Order Items', data: products}
        ]}
        renderItem={({ item, section }) => {
          return section.title === 'Restaurants'
            ? <LocationDetails restaurant={item} />
            : <OrderItem product={item.product} quantity={item.quantity} />
        }}
        renderSectionHeader={({section}) => {
          return <Text style={styles.orderDetailsTitle}>{section.title}</Text>
        }}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        ListHeaderComponent={getHeader}
        stickySectionHeadersEnabled={false}
      />

      <MarkAsDeliveredButton 
        orderStatus={order.status} 
        orderID={order.id}
      />

      <ScrollIndicator bottom={80}/>
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
  },
  deliveredButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colorButton,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: theme.colorBorder,
    height: 60,
    width: "90%",
    margin: 15,
  },
  deliveredButtonText: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  }
});

export default DeliveryDetailsScreen;
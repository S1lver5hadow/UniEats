import CartMenuButton from "@/src/components/CartMenuButton";
import { Stack } from "expo-router";

export default function MenuStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <CartMenuButton/>
        )
      }}
    >
      <Stack.Screen name='index' options={{ title: 'Main Menu' }} />
      <Stack.Screen name='restaurantMenu' options={{ title: 'Restaurant Menu' }} />
      <Stack.Screen name='deliveryMenu' options={{ title: 'Current Deliveries' }} />
      <Stack.Screen name='userOrders' options={{ title: 'My Orders and Deliveries' }} />
    </Stack>
  )
}

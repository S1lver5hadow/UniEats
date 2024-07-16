import CartMenuButton from "@/src/components/CartMenuButton";
import { Stack } from "expo-router";

export default function AccountStack() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Your Account' }} />
      <Stack.Screen name='identification' options={{ title: 'Identification' }} />
      <Stack.Screen name='changeName' options={{ title: 'Change Legal Name' }} />
      <Stack.Screen name='changeID' options={{ title: 'Update Identification' }} />
    </Stack>
  )
}

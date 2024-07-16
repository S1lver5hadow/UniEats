import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import CartProvider from '../providers/CartProvider';
import AuthProvider from '../providers/AuthProvider';
import Toast from 'react-native-toast-message';
import ToastConfig from './toastConfig';
import ThemeProvider from '../providers/ThemeProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(user)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    Abadi: require('../../assets/fonts/Abadi.ttf'),
    AbadiBold: require('../../assets/fonts/AbadiBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Stack>
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ presentation: 'modal', title: 'Shopping Cart' }} />
            <Stack.Screen name="checkout" options={{ presentation: 'modal', title: 'Checkout' }} />
            <Stack.Screen name="ordered" options={{ title: 'Order Successful' }} />
            <Stack.Screen name="accepted" options={{ title: 'Order Accepted' }} />
          </Stack>
        </CartProvider>
      </AuthProvider>
      <Toast config={ToastConfig}/>
    </ThemeProvider>
  );
}

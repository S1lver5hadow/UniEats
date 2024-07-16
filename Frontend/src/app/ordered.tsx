import { StyleSheet, Text, View, Pressable } from "react-native";
import { useMemo } from "react";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';

const OrderedScreen = () => {
  const { orderID } = useLocalSearchParams();
  const router = useRouter();
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank you!</Text>
      <Text style={styles.info}>Your order number #{orderID} has been placed</Text>
      <Text style={styles.smallerInfo}>
        It will be delivered once the order has been accepted by a delivery person
      </Text>

      <Pressable style={styles.acceptButton} onPress={() => router.navigate(`/menu/orderDetails/${orderID}`)}>
        <Text style={styles.acceptButtonText}>View Order Details</Text>
      </Pressable>
    </View>
  );
}

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 64,
    paddingBottom: 15,
    marginTop: 10
  },
  info: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 32,
    textAlign: "center",
    paddingHorizontal: 25
  },
  smallerInfo: {
    fontFamily: 'Abadi',
    color: theme.text,
    fontSize: 24,
    textAlign: "center",
    padding: 15
  },
  acceptButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colorButton,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: theme.colorBorder,
    height: 120,
    width: "90%",
    margin: 15
  },
  acceptButtonText: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
  }
})

export default OrderedScreen
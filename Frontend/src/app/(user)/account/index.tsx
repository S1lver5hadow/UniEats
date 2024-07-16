import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';
import Orders from '@/assets/data/orders';
import { useCart } from '@/src/providers/CartProvider';
import { ColorTheme } from '@/src/constants/Types';
import { useTheme } from '@/src/providers/ThemeProvider';

const AccountScreen = () => {
  const [loading, setLoading] = useState(false)
  const { username, logout } = useAuth();
  const { clearCart } = useCart();
  const { theme, colorTheme, toggleTheme } = useTheme();

  const styles = useMemo(() => makeStyles(colorTheme), [colorTheme]);

  const userMadeOrders = Orders({ query: `?orderedby=${username}` });
  const userDeliveredOrders = Orders({ query: `?status=D&deliveredby=${username}` });

  const madeOrdersTotalCost = () => userMadeOrders.reduce(
      (accum, order) => accum + Number(order.totalFoodPrice)+ Number(order.deliveryCost), 0);

  const deliveredOrdersTotalCost = () => userDeliveredOrders.reduce(
      (accum, order) => accum + Number(order.deliveryCost), 0);

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout();
    } finally {
      clearCart()
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.primaryContainer}>
        <View style={[styles.infoContainer, { flexDirection: 'column' }]}>
          <Text style={styles.title} adjustsFontSizeToFit numberOfLines={2}>
            Hello, {username}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel} adjustsFontSizeToFit numberOfLines={2}>Total orders placed: </Text>
          <Text style={styles.info}>{userMadeOrders.length}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel} adjustsFontSizeToFit numberOfLines={2}>Total paid for orders: </Text>
          <Text style={styles.info}>£{madeOrdersTotalCost().toFixed(2)}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel} adjustsFontSizeToFit numberOfLines={2}>Total deliveries completed: </Text>
          <Text style={styles.info}>{userDeliveredOrders.length}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel} adjustsFontSizeToFit numberOfLines={2}>Total earned from deliveries: </Text>
          <Text style={styles.info}>£{deliveredOrdersTotalCost().toFixed(2)}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Dark Mode: </Text>
          <Switch
            onValueChange={toggleTheme}
            value={theme.dark}
            style={styles.switch}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Link href={"/(user)/account/identification"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>
              Manage Identification
            </Text>
          </TouchableOpacity>
        </Link>
        
        <TouchableOpacity style={styles.button} onPress={handleLogout} disabled={loading}>
          <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>
            {loading ? "Logging out..." : "Log out"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 30,
    padding: 5,
    textAlign: 'center'
  },
  infoLabel: {
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 30,
    textAlign: 'left',
    padding: 5,
    width: '70%'
  },
  info: {
    fontWeight: '500',
    color: theme.text,
    fontSize: 26,
    textAlign: 'left',
    padding: 5
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%'
  },
  switch: {
    marginLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  primaryContainer: {
    flex: 7,
    width: "90%",
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 3,
    width: "100%",
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flex: 1,
    backgroundColor: theme.accountButton,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: "90%"
  },
  buttonText: {
    fontFamily: 'Abadi',
    fontSize: 24,
    textAlign: 'center',
    color: theme.text,
    fontWeight: 'bold',
  }
});

export default AccountScreen;
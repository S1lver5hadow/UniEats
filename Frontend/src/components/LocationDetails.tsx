import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useMemo } from 'react';
import { Product, Restaurant } from '../constants/Types';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';
import { showLocation } from 'react-native-map-link';

type LocationDetailsProps = {
  restaurant: Restaurant;
};

const LocationDetails = ({ restaurant }: LocationDetailsProps) => {
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  return (
    <Pressable onPress={() => {
      showLocation({
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        title: restaurant.name,
        googleForceLatLon: true,
      })
    }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.restaurant}>{restaurant.name}</Text>
          <Text style={styles.orderDetails}>Take me there!</Text>
        </View>
      </View>
    </Pressable>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    backgroundColor: theme.product,
    borderWidth: 2,
    borderColor: theme.light ? 'black' : theme.textInputBorder,
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  orderDetails: {
    color: theme.text,
    textAlign: 'center',
    fontWeight: '500',
    textDecorationLine: 'underline',
    fontSize: 16,
    padding: 5
  },
  restaurant: {
    color: theme.text,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5
  }
});

export default LocationDetails;
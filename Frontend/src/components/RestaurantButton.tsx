import React, { useMemo } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { showLocation } from 'react-native-map-link';
import * as Location from 'expo-location';
import { useTheme } from "@/src/providers/ThemeProvider";
import { ColorTheme } from '../constants/Types';

interface RestaurantButtonProps {
  text: string;
  latitude: number;
  longitude: number;
  location: Location.LocationObject | undefined;
}

const calculateDistance = (latitude: number, longitude: number, location: Location.LocationObject) => {
  const platitude = location.coords.latitude;
  const plongitude = location.coords.longitude;

  // Algorithm to calculate distance between two points using latitude and longitude using Haversine 
  // formula
  const radius = 6371;  // Radius of the earth
  const dlat = degToRads(platitude - latitude); // Converting from degrees to radians
  const dlon = degToRads(plongitude - longitude); // Same here

  // Applying the formula
  const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(degToRads(latitude)) * 
  Math.cos(degToRads(platitude)) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = radius * c * 1000; // distance is in m
  return distance;
}

const degToRads = (deg: number) => {
  return deg * (Math.PI / 180);
}

const RestaurantButton = ({ text, latitude, longitude, location }: RestaurantButtonProps) => {
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  return (
    <View style={{ alignItems: 'center' }}>
      <Link href={`/menu/restaurants/${text}`} asChild>
        <Pressable style={styles.restaurantButton} accessibilityLabel={text}>
          <Text style={styles.buttonText}>
            {text}
          </Text>
          <Text
            style={styles.locationText}
            onPress={() => {showLocation({
              latitude: latitude,
              longitude: longitude,
              title: text,
              googleForceLatLon: true,
            })}}
          >
            {location == undefined 
            ? "Take me there"
            : "You are currently: " + 
              (calculateDistance(latitude, longitude, location) > 1000
              ? "1000+"
              : Math.round(calculateDistance(latitude, longitude, location)))
              + "m away"}
          </Text>
        </Pressable>
      </Link>
    </View>
  )
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  restaurantButton: {
    justifyContent: 'center',
    backgroundColor: theme.colorButton,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: theme.colorBorder,
    height: 80,
    width: "90%",
    margin: 15,
  },
  buttonText: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
  },
  locationText: {
    fontFamily: 'Abadi',
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
})

export default RestaurantButton;
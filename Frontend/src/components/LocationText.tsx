import * as Location from 'expo-location';
import React, { useState, useEffect, useMemo } from 'react';
import { Alert, Text, StyleSheet } from 'react-native';
import { showLocation } from 'react-native-map-link';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';

interface LocationTextProps {
  long: number;
  lat: number;
}

const LocationText: React.FC<LocationTextProps> = ({ long, lat }) => {
  const [address, setAddress] = useState<string>("Take me there!");
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  const findAddress = async () => {
    try {
      if (typeof long === 'number' && typeof lat === 'number') {
        const reverseGeo = await Location.reverseGeocodeAsync({
          longitude: long,
          latitude: lat,
        });
        
        if (reverseGeo.length > 0) {
          const { streetNumber, street } = reverseGeo[0];
          setAddress(`${streetNumber} ${street}`);
        } else {
          setAddress("Address not found");
        }
      }
    } catch (error) {
      Alert.alert("ERROR: Failed to find address");
      console.error(error);
    }
  };

  useEffect(() => {
    findAddress();
  }, [long, lat]);

  return (
    <Text
      style={styles.info}
      onPress={() => {
        showLocation({
          latitude: lat,
          longitude: long,
          title: "Your customer",
          googleForceLatLon: true,
        });
      }}
    >
      {address}
    </Text>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  info: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    color: theme.text,
    fontSize: 32,
    textAlign: 'left',
    padding: 5,
  },
});

export default LocationText;

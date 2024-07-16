import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { useEffect, useState, useMemo } from 'react';
import CustomSearchBar from "../../../components/CustomSearchBar";
import RestaurantButton from "../../../components/RestaurantButton";
import Restaurants from "@/assets/data/restaurants";
import ScrollIndicator from "../../../components/ScrollIndicator";
import Products from "@/assets/data/products";
import * as Location from 'expo-location';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from "@/src/constants/Types";

export default function Index() {
  const restaurants = Restaurants();
  const prodData = Products({ query: '' });

  const [searchVal, setSearchVal] = useState("");
  const [searchProds, setSearchProds] = useState(restaurants);

  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  useEffect(() => {
    setSearchProds(restaurants)
  }, [restaurants]);

  const searchFunction = (text: string) => {
    const matchingRestaurants = restaurants.filter((restaurant) => {
      const restaurantName = restaurant.name.toUpperCase();
      return restaurantName.includes(text.toUpperCase());
    });
  
    const servingRestaurants = restaurants.filter((restaurant) => {
      const servesSearchedFood = prodData.some((product) => {
        const productName = product.name.toUpperCase();
        const restaurantName = restaurant.name.toUpperCase();
        return productName.includes(text.toUpperCase())
               && product.restaurant.toUpperCase() === restaurantName;
      })
      return !matchingRestaurants.includes(restaurant)
             && servesSearchedFood;
    })
  
    const combinedResults = [...matchingRestaurants, ...servingRestaurants];
  
    setSearchProds(combinedResults);
    setSearchVal(text);
  };


  const [location, setLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    const getPermissions = async() => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location permissions are required to give proximity data for restaurants");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.importantInfo} adjustsFontSizeToFit numberOfLines={2}>
        Please select the restaurant you'd like to order from
      </Text>
      <Text style={styles.info} adjustsFontSizeToFit numberOfLines={2}>
        You can always return here and add orders from multiple restaurants to your cart
      </Text>

      <CustomSearchBar
        searchVal={searchVal}
        searchFunction={searchFunction}
      />
      <FlatList
        data={searchProds}
        renderItem={({ item }) =>
          <RestaurantButton
            text={item.name}
            longitude={item.longitude}
            latitude={item.latitude}
            location={location}
          />
        }
      />
      <ScrollIndicator bottom={30}/>
    </View>
  );
}

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  importantInfo: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 30,
    textAlign: "center",
    padding: 15
  },
  info: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 20,
    textAlign: "center",
    padding: 10
  }
})
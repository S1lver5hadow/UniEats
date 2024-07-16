import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState, useMemo } from 'react';
import CustomSearchBar from '../../../../components/CustomSearchBar';
import Products from '@/assets/data/products';
import ProductListItem from '../../../../components/ProductListItem';
import ScrollIndicator from '../../../../components/ScrollIndicator';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '@/src/constants/Types';

const RestaurantProductsScreen = () => {
  const { restaurant } = useLocalSearchParams();
  const productsData = typeof restaurant === 'string' 
    ? Products({ query: `?restaurant=${restaurant}` })
    : [];

  const navigation = useNavigation();
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  const [searchVal, setSearchVal] = useState("");
  const [searchProds, setSearchProds] = useState(productsData);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: restaurant
    });
  }, []);

  useEffect(() => {
    setSearchProds(productsData)
  }, [productsData]);

  const searchFunction = (text: string) => {
    const updatedProds = productsData.filter((item) => {
      const prod_data = item.name.toUpperCase()
      return prod_data.indexOf(text.toUpperCase()) > -1;
    })
    setSearchProds(updatedProds)
    setSearchVal(text)
  };

  return (
    <View style={{flex: 1}}>
      <Text style={styles.info}>
        Please select an item to add to your cart
      </Text>
      <CustomSearchBar
        searchVal={searchVal}
        searchFunction={searchFunction}
      />
      <FlatList
        data={searchProds}
        renderItem={({item}) => <ProductListItem product={item} />}
        numColumns={1}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
      <ScrollIndicator bottom={30}/>
    </View>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  info: {
    textAlign: "center",
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 35,
    padding: 5,
    marginTop: 5,
  }
});

export default RestaurantProductsScreen;
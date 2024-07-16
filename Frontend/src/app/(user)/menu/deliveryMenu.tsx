import { View, FlatList, StyleSheet, Text, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useState, useMemo, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';
import Orders from '@/assets/data/ordersExternalState';
import OrderListItem from '../../../components/OrderListItem';
import ScrollIndicator from '@/src/components/ScrollIndicator';
import { useAuth } from '@/src/providers/AuthProvider';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '@/src/constants/Types';

export default function Index() {
  const [sortOption, setSortOption] = useState('newest');
  const [orders, setOrders] = useState<any[]>([]);
  const { username } = useAuth();
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);
  const pickerSelectStyles = useMemo(() => makePickerSelectStyles(colorTheme), [theme]);
  const navigation = useNavigation();

  useEffect(() => {
    Orders({ query: `?status=OP&deliveredby_ne=${username}&orderedby_ne=${username}`, 
             setExternalState: setOrders });

    var refreshInterval = setInterval(() => {
      if (!navigation.isFocused()) {
        clearInterval(refreshInterval);
      }
      Orders({ query: `?status=OP&deliveredby_ne=${username}&orderedby_ne=${username}`, 
               setExternalState: setOrders });
    }, 5000);

  }, []);
  
  const sortedOrders = orders.slice().sort((a, b) => {
    const costA = parseFloat(a.deliveryCost);
    const costB = parseFloat(b.deliveryCost);
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();

    switch (sortOption) {
      case 'highest':
        return costB - costA;
      case 'lowest':
        return costA - costB;
      case 'newest':
        return dateB - dateA;
      case 'oldest':
        return dateA - dateB;
      default:
        return 0; // default, no sorting
    }
  });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Available Orders' }} />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Sort by:</Text>
        <RNPickerSelect
          onValueChange={(value) => setSortOption(value)}
          items={[
            { label: 'Newest', value: 'newest' },
            { label: 'Oldest', value: 'oldest' },
            { label: 'Highest Delivery Cost', value: 'highest' },
            { label: 'Lowest Delivery Cost', value: 'lowest' },
          ]}
          style={pickerSelectStyles}
          value={sortOption}
          Icon={
            Platform.OS === 'ios' ? () => <FontAwesome name="chevron-down" size={24} color={colorTheme.light ? 'gray' : 'white'} /> 
                                  : undefined
          }
        />
      </View>
      <FlatList
        data={sortedOrders}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <OrderListItem order={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <ScrollIndicator bottom={30}/>
    </View>
  );
}

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  },
  pickerContainer: {
    padding: 10
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.text
  },
  listContent: {
    gap: 10,
    padding: 10,
  }
});

const makePickerSelectStyles = (theme: ColorTheme) => StyleSheet.create({
  inputIOS: {
    backgroundColor: theme.textInput,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 0,
    fontFamily: 'Abadi',
    fontSize: 20,
    fontWeight: '600',
    color: theme.textInputText,
    borderWidth: 3,
    borderColor: theme.textInputBorder,
    width: '100%',
  },
  placeholder: {
    color: 'gray',
  },
  inputAndroid: {
    backgroundColor: theme.textInput,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 0,
    fontFamily: 'Abadi',
    fontSize: 20,
    fontWeight: '600',
    color: theme.textInputText,
    borderWidth: 3,
    borderColor: theme.textInputBorder,
    width: '100%',
  },
  iconContainer: {
    top: 15,
    right: 15,
  }
});

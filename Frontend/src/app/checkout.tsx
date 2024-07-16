import { View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView, Platform } from "react-native";
import { useState, useEffect, useMemo } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { SearchBar } from "@rneui/themed";
import Buildings from "@/assets/data/buildings";
import SubmitNewOrderAsync from "@/assets/data/submitOrders";
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router";
import { useCart } from "../providers/CartProvider";
import { useAuth } from "../providers/AuthProvider";
import * as Location from 'expo-location';
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from '../constants/Types';

const CheckoutScreen = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [building, setBuilding] = useState<any>(null);
  const [room, setRoom] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [usedCurrentLocation, setCurrentLocation] = useState(false);

  const router = useRouter();
  const navigation = useNavigation();
  const { items, total, clearCart } = useCart();
  const { username } = useAuth();
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);
  const pickerSelectStyles = useMemo(() => makePickerSelectStyles(colorTheme), [theme]);

  const buildings = Buildings();
  const [searchResults, setSearchResults] = useState(
    buildings.map(building => ({ label: building.name, value: building.name, ...building }))
  );

  useEffect(() => {
    setSearchResults(
      buildings.map(building => ({ label: building.name, value: building.name, ...building }))
    );
  }, [buildings]);

  const parseArray = (textArr: string) => {
    return textArr.slice(1, -1).split(', ').map((dept: string) => dept.trim());
  };

  const searchFunction = (text: string) => {
    setSearchVal(text);
    const lowerText = text.toLowerCase();

    const allDepts = ["Computing", "Maths", "Physics", "Medicine", "Electrical and Electronic Engineering",
                      "Bioengineering", "Materials", "Business", "Mechanical Engineering"];
  
    const filteredBuildings = buildings.filter(building => {
      const departments = parseArray(building.departments);
      const matchesName = building.name.toLowerCase().includes(lowerText);
      const matchesDepartment = departments.some((dept: string) => dept.toLowerCase().includes(lowerText));
      const isAllDepartments = building.departments === "[]";
  
      return matchesName || matchesDepartment 
             || (allDepts.some((dept: string) => dept.toLowerCase().includes(lowerText))
                 && isAllDepartments);
    });
  
    setSearchResults(filteredBuildings.map(building => ({ label: building.name, value: building.name, ...building })));
  };

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
    return distance
  }
  
  const degToRads = (deg: number) => {
    return deg * (Math.PI / 180);
  }

  const handleToggleLocation = async () => {
    if (usedCurrentLocation) {
      setCurrentLocation(false)
      setBuilding(null)
    } else {
      handleUseCurrentLocation()
    }
  }

  const handleUseCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Location permissions are required to give proximity data for restaurants");
      return;
    }

    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      const distances = buildings.map(building => calculateDistance(building.latitude, building.longitude, currentLocation))
      let index = 0;
      let min = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i < distances.length; i++) {
        if (Number(distances.at(i)) < min) {
          index = i;
          min = Number(distances.at(i));
        }
      }
      setBuilding(buildings.at(index));
      setCurrentLocation(true);
    } catch (error) {
      Alert.alert("Error: Failed to get current location");
    }
  };

  const handleCompleteOrder = async () => {
    if (!building) {
      Alert.alert('Error', 'Please select a building.');
      return;
    }

    if (room === "") {
      Alert.alert('Error', 'Please enter a room.');
      return;
    }

    setLoading(true);
    try {
      const { latitude, longitude } = building;
      const orderResponse = await SubmitNewOrderAsync(total, items, username, latitude, longitude, room, info);
      navigation.goBack();
      navigation.goBack();
      router.push({
        pathname: '/ordered',
        params: { orderID: orderResponse.id },
      });
      clearCart();
    } catch (error) {
      console.error('Error submitting order:', error);
      Alert.alert('Error', 'Failed to submit order. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.wrapper}
        contentContainerStyle={{ justifyContent: 'center' }}
        >
        <Text style={styles.info}>Select your building below</Text>
        <SearchBar
          placeholder="Search building..."
          lightTheme
          round
          value={searchVal}
          onChangeText={searchFunction}
          autoCorrect={false}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.inputSearchContainer}
          placeholderTextColor={colorTheme.text}
          searchIcon={{ size: 30, color: colorTheme.iconColor }}
          inputStyle={styles.searchInput}
          editable={!usedCurrentLocation}
        />

        <View style={styles.inputContainer}>
          { usedCurrentLocation ?
            <View style={[pickerSelectStyles.inputIOS, styles.disabledContainer]}>
              <Text style={styles.disabledContainerText} adjustsFontSizeToFit numberOfLines={1}>
                DISABLED: Using current location.
              </Text>
            </View>
            
            :

            <RNPickerSelect
              placeholder={{
                label: 'Select a building...',
              }}
              onValueChange={(value) => {
                const selectedBuilding = searchResults.find(item => item.value === value);
                setBuilding(selectedBuilding);
              }}
              items={searchResults.map(building => ({ label: building.label, value: building.value }))}
              style={pickerSelectStyles}
              value={building ? building.value : undefined}
              disabled={usedCurrentLocation}
              Icon={ Platform.OS === 'ios' 
                ? () => <FontAwesome name="chevron-down" size={24} color={colorTheme.light ? 'gray' : 'white'} /> 
                : undefined
              }
            /> 
          }

          <Text style={styles.orText}>Or</Text>

          <Pressable style={[styles.button, usedCurrentLocation && styles.buttonToggled]} onPress={handleToggleLocation}>
            <Text style={styles.buttonText}>
              {usedCurrentLocation ? 'Using current location' : 'Use my current location'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.info}>Please enter your room number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='e.g. HXLY ---'
            placeholderTextColor={colorTheme.text}
            style={styles.textField}
            value={room}
            onChangeText={setRoom}
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.info}>Please enter any additional instructions</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='e.g. Leave at the door'
            placeholderTextColor={colorTheme.text}
            style={styles.textField}
            value={info}
            onChangeText={setInfo}
            autoCapitalize="none"
          />
        </View>
        <View style={{ marginVertical: 30 }}></View>
        
      </ScrollView>
      <View style={styles.bottomButton}>
        <Pressable style={styles.completeButton} onPress={handleCompleteOrder} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Completing order..." : "Complete order"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    padding: 20,
  },
  info: {
    fontFamily: 'Abadi',
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 20,
    textAlign: 'left',
    padding: 5,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  textField: {
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
  button: {
    backgroundColor: theme.colorButton,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: theme.colorBorder,
  },
  completeButton: {
    backgroundColor: theme.colorButton,
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 20,
    width: '90%',
    borderWidth: 2,
    borderColor: theme.colorBorder,
  },
  bottomButton: {
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Abadi',
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  orText: {
    fontFamily: 'Abadi',
    fontSize: 25,
    fontWeight: '600',
    color: theme.text,
    textAlign: 'center',
    marginVertical: 10,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: '100%',
    marginVertical: 0,
    paddingHorizontal: 0
  },
  inputSearchContainer: {
    backgroundColor: theme.textInput,
    borderWidth: 3,
    borderColor: theme.textInputBorder,
    borderRadius: 10,
    fontFamily: 'Abadi',
    fontSize: 20,
    fontWeight: '600',
    color: theme.textInputText,
    paddingHorizontal: 10,
    height: 55,
    borderBottomWidth: 3,
  },
  searchInput: {
    fontFamily: 'Abadi',
    fontSize: 20,
    fontWeight: '600',
    color: theme.textInputText,
  },
  disabledContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 3,
    borderColor: theme.textInputBorder,
    borderRadius: 10,
    backgroundColor: theme.textInput,
    width: '100%',
  },
  disabledContainerText: {
    borderRadius: 10,
    marginVertical: 0,
    fontFamily: 'Abadi',
    fontSize: 20,
    fontWeight: '600',
    color: theme.text,
    width: '100%',
  },
  buttonToggled: {
    opacity: 0.5,
    backgroundColor: '#3b7d23',
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
    color: theme.text,
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

export default CheckoutScreen;

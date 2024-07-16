import { useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { useAuth } from '@/src/providers/AuthProvider';
import { Link } from 'expo-router';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from "@/src/constants/Types";

const IDScreen = () => {
  const { legalName, idURL } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  useEffect(() => {
    setTimeout(() => {
      setRefreshKey(prevKey => prevKey + 1);
    }, 1);
  }, []);
  
  const screenHeight = Dimensions.get('window').height;
  const imageHeight = screenHeight * 0.24;

  return (
    <View style={styles.container} key={refreshKey}>
      <View style={styles.identContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText} adjustsFontSizeToFit numberOfLines={1}>
            {legalName === "" ? "We do not have a legal name recorded for you yet"
                              : "Your recorded legal name is:" }
          </Text>
          <Text style={styles.nameText} adjustsFontSizeToFit numberOfLines={1}>
            {legalName}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.nameText} adjustsFontSizeToFit numberOfLines={2}>
            {idURL ? "The identification we have recorded for you is:"
                   : "We do not have any identification for you yet"}
          </Text>
          {idURL !== null && idURL !== "" 
            ? <Image source={{ uri: idURL }} style={[styles.image, { height: imageHeight }]} /> 
            : <></>}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Link href={"/(user)/account/changeName"} asChild>
          <TouchableOpacity style={styles.changeNameButton}>
            <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>
              Change Legal Name
            </Text>
          </TouchableOpacity>
        </Link>
        
        <Link href={"/(user)/account/changeID"} asChild>
          <TouchableOpacity style={styles.changeNameButton}>
            <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>
              Upload New Identification
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

    </View>
  );
}

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  identContainer: {
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
  nameContainer: {
    width: "100%",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    width: "100%",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 30,
    textAlign: 'center',
    padding: 5,
  },
  image: {
    width: "100%",
    resizeMode: 'contain',
    marginTop: 5,
  },
  changeNameButton: {
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

export default IDScreen;

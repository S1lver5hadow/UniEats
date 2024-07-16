import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState, useMemo } from 'react';
import { EditUserIdentityAsync } from '@/assets/data/updateUserIdentity';
import { useAuth } from '@/src/providers/AuthProvider';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from "@/src/constants/Types";

const ChangeIDScreen = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const { username, idURL, update } = useAuth();
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  const updateUserDetails = async () => {
    if (image !== null) {
      const prevID = idURL;
      const response = await EditUserIdentityAsync({ username: username, image: image });
      if (response.identification === prevID || typeof response.identification === "undefined") {
        Alert.alert("Error", "There was an error updating your ID. Please try again later.");
      } else {
        Alert.alert("Success", "Your ID was successfully updated.");
        update();
      }
    } else {
      Alert.alert("Error", "Please upload an image.")
    }
  }

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.primaryContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel} adjustsFontSizeToFit numberOfLines={2}>
            Please choose an image to use as a new form of identification
          </Text>
        </View>

        {
          image !== null

          ?

          <View style={styles.infoContainerVertical}>
            <Image source={{ uri: image.uri }} style={styles.image}/>
          </View>

          :

          <></>
        }
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
          <Text style={styles.buttonText}>
            Choose a photo to upload
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={updateUserDetails}>
          <Text style={styles.buttonText}>
            Set new identification
          </Text>
        </TouchableOpacity>
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
  setIDButton: {
    height: 100,
    width: '90%',
    position: 'absolute',
    bottom: 130,
    backgroundColor: theme.accountButton,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  changeIDButton: {
    height: 100,
    position: 'absolute',
    bottom: 20,
    width: '90%',
    backgroundColor: theme.accountButton,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoLabel: {
    fontWeight: 'bold',
    color: theme.text,
    fontSize: 30,
    textAlign: 'center',
    padding: 5,
    width: '100%'
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%'
  },
  infoContainerVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    padding: 10,
  },
  image: {
    height: "90%", 
    width: "100%", 
    objectFit: "contain",
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
})

export default ChangeIDScreen;
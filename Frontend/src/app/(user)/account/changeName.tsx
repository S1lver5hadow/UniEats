import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState, useMemo } from 'react';
import {EditUserIdentityAsync} from '@/assets/data/updateUserIdentity';
import { useAuth } from '@/src/providers/AuthProvider';
import { useTheme } from "@/src/providers/ThemeProvider"
import { ColorTheme } from "@/src/constants/Types";

const ChangeNameScreen = () => {
  const [text, setText] = useState('');
  const { username, legalName, update } = useAuth();
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  const updateUserDetails = async () => {
    if (text !== "") {
      const prevName = legalName
      const response = await EditUserIdentityAsync({username: username, newName: text});
      if (response.legalName === prevName) {
        Alert.alert("Error", "There was an error updating your name. Please try again later.");
      } else {
        Alert.alert("Success", `Your name was succesfully changed to \"${text}\".`);
        update();
      }
    } else {
      Alert.alert("Error", "Please enter your legal name.")
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={{ flex: 8.5, alignItems: 'center', width: '100%' }}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel} adjustsFontSizeToFit numberOfLines={1}>
            Please enter a new legal name
          </Text>
        </View>

        <TextInput
          style={styles.textInput}
          placeholderTextColor={colorTheme.textInputText}
          placeholder="e.g. John Doe"
          onChangeText={newText => setText(newText)}
        />
      </View>
     
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={updateUserDetails}>
          <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>
            Set new name
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
  textInput: {
    backgroundColor: theme.textInput,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 0,
    fontFamily: 'Abadi',
    fontSize: 24,
    color: theme.textInputText,
    borderWidth: 3,
    borderColor: theme.textInputBorder,
    width: '90%',
    fontWeight: 'bold',
    borderStyle: 'solid',
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
  buttonContainer: {
    flex: 1.5,
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

export default ChangeNameScreen;
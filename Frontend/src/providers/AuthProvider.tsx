import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";
import addUserAsync from '@/assets/data/addUser'
import { deleteUserAsync } from "@/assets/data/deleteUser";
import { randomUUID } from 'expo-crypto';
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { BACKEND_URL } from "../constants/Backend";

type AuthType = {
  username: string,
  legalName: string,
  idURL: string,
  currentUserIsGuest: boolean,
  loggedIn: boolean,
  logout: () => void,
  signUp: (username: string) => void,
  signIn: (username: string) => void,
  signInAsGuest: () => void,
  update: () => void,
}

const AuthContext = createContext<AuthType>({
  username: "",
  legalName: "",
  idURL: "",
  currentUserIsGuest: true,
  loggedIn: false,
  logout: () => {},
  signUp: () => {},
  signIn: () => {},
  signInAsGuest: () => {},
  update: () => {},
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState<string>("");
  const [legalName, setLegalName] = useState<string>("");
  const [idURL, setIdURL] = useState<string>("");
  const [currentUserIsGuest, setCurrentUserIsGuest] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const navigation = useNavigation();

  const isValidUsername = (username: string) => {
    return !!username && /^[a-zA-Z0-9]+$/.test(username);
  }

  const signUp = async (signUpUsername: string) => {
    if (!isValidUsername(signUpUsername)) {
      Alert.alert('Invalid Username', 'Username must be non-empty and consist only of alphanumeric characters.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/users/${signUpUsername}`);
      const data = await response.json();
  
      if (data.name === signUpUsername) {
        Alert.alert('Username Exists', 'The username is already taken.');
        return;
      }
    } catch (error) {
      console.error('Error checking username:', error);
      Alert.alert('Error', 'Failed to check username.');
      return;
    }

    try {
      await addUserAsync(signUpUsername);
      setCurrentUserIsGuest(false)
      setUsername(signUpUsername)
      setLoggedIn(true)
      router.push('/(user)/')
    } catch (error) {
      console.log(error)
    }
  }

  const signIn = async (signInUsername: string) => {
    if (signInUsername === '') {
      Alert.alert('Invalid Username', 'Username must be non-empty.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/users/${signInUsername}`);
      const data = await response.json();

      if (data.detail === 'No User matches the given query.') {
        Alert.alert('Error', 'Username not recognised');
      } else if (data.name === signInUsername) {
        setCurrentUserIsGuest(false);
        setUsername(signInUsername);
        setLegalName(data.legalName);
        setIdURL(data.identification);
        setLoggedIn(true)
        router.push('/(user)/')
      }
    } catch (error) {
      console.error('Error checking username:', error);
      Alert.alert('Error', 'Failed to check username');
    }
  }

  const logout = async () => {
    if (currentUserIsGuest) {
      console.log(username);
      await deleteUserAsync(username);
    }

    setUsername("");
    setCurrentUserIsGuest(true);
    setLoggedIn(false)

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: '(auth)', state: { routes: [{ name: 'sign-up' }] } },
        ],
      })
    );
    
    return;
  };

  const signInAsGuest = async () => {
    let guestUsername = '';
    let data;
  
    do {
      guestUsername = 'guest' + randomUUID();
      const response = await fetch(`${BACKEND_URL}/users/${guestUsername}`);
      data = await response.json();
    } while (data.detail !== 'No User matches the given query.');

    try {
      await addUserAsync(guestUsername);
      setCurrentUserIsGuest(true)
      setUsername(guestUsername)
      setLoggedIn(true)
      router.push('/(user)/')
    } catch (error) {
      console.log(error)
    }
  }

  const update = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/${username}`);
      const data = await response.json();

      if (data.detail === 'No User matches the given query.') {
        Alert.alert('Error', 'Username not recognised');
      } else if (data.name === username) {
        setLegalName(data.legalName);
        setIdURL(data.identification);
      }
    } catch (error) {
      console.error('Error checking username:', error);
      Alert.alert('Error', 'Failed to check username');
    }  
  };

  return (
    <AuthContext.Provider
      value={{ username, legalName, idURL, currentUserIsGuest, loggedIn, logout, signUp, signIn, signInAsGuest, update }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

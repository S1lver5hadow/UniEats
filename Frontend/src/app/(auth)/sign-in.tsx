import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import React, { useState, useMemo } from 'react';
import Button from '../../components/Button';
import { Link, Stack } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';
import { ColorTheme } from "@/src/constants/Types";
import { useTheme } from '@/src/providers/ThemeProvider';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingGuest, setLoadingGuest] = useState(false);
  const { signIn, signInAsGuest } = useAuth()
  const { theme, colorTheme } = useTheme();
  const styles = useMemo(() => makeStyles(colorTheme), [theme]);

  const handleSignIn = async () => {
    setLoading(true)
    try {
      await signIn(username)
    } finally {
      setLoading(false)
    }
  }

  const handleSignInAsGuest = async () => {
    setLoadingGuest(true)
    try {
      await signInAsGuest();
    } finally {
      setLoadingGuest(false);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign in' }} />

      <Text style={styles.label}>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username..."
        placeholderTextColor={colorTheme.light ? 'gray' : 'white'}
        style={styles.input}
        autoCapitalize='none'
      />

      {/* <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      /> */}

      <Button
        text={loading ? "Signing in..." : "Sign in"}
        onPress={handleSignIn}
        disabled={loading}
        style={[styles.button, {opacity: loading ? 0.5 : 1 }]}
      />
      <Link href="/sign-up" style={styles.textButton}>
        Create an account
      </Link>

      <Pressable onPress={handleSignInAsGuest} disabled={loadingGuest}>
        <Text style={styles.textButton}>
          {loadingGuest ? "Signing in as guest..." : "Sign in as guest"}
        </Text>
      </Pressable>
    </View>
  );
};

const makeStyles = (theme: ColorTheme) => StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: theme.light ? 'gray' : 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.textInputBorder,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: theme.light ? 'white' : theme.textInput,
    borderRadius: 5,
    color: theme.text
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: theme.colorText,
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
    alignSelf: 'center',
  }
});

export default SignInScreen;
// app/sign-up.tsx
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Animation state
  const [scaleValue] = useState(new Animated.Value(1));

  const handleSignUp = async () => {
    setErrorMessage(''); // Reset error message before new request

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/signup', {
        username,
        password,
      });

      if (response.status === 201) {
        console.log("Sign Up successful, redirecting to Sign In");
        router.push('./input-data/input-1'); // Arahkan ke halaman Sign In setelah berhasil sign up
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Server responded with a status other than 200 range
        if (error.response.status === 409) {
          setErrorMessage('Username already exists.'); // Kode 409 untuk conflict
        } else {
          setErrorMessage('Sign Up failed. Please try again.');
        }
      } else {
        // Network or other errors
        setErrorMessage('An error occurred. Please check your network connection.');
      }
      console.error("Sign Up error:", error);
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Join us!</Text>
        <View style={styles.logoItem}>
          <Image
            source={require('@/assets/images/JKNPrecisionCare_Logo.png')}
            style={styles.logo}
          />
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.footer}>
          <Text style={styles.keterangan}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/sign-in')}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-Semibold',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  logoItem: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#273A96',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  keterangan: {
    fontSize: 14,
    color: '#333',
  },
  signInText: {
    fontSize: 14,
    color: '#273A96',
    fontWeight: 'bold',
  },
});

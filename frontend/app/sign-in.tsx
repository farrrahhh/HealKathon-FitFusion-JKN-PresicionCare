import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Animation state
  const [scaleValue] = useState(new Animated.Value(1));

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/signin', {
        username,
        password,
      });
      if (response.status === 200) {
        console.log(response.data);
        router.push('/main'); // Arahkan ke halaman utama jika login berhasil
      }
    } catch (error) {
      const err = error as any;
      if (err.response) {
        // Server responded with a status other than 200 range
        setErrorMessage('Invalid username or password');
      } else if (err.request) {
        // Request was made but no response received
        setErrorMessage('Network error. Please try again later.');
      } else {
        // Something else happened
        setErrorMessage('An unexpected error occurred.');
      }
      console.error(err);
    }
  };

  const handleSignUp = () => {
    router.push('/sign-up'); // Ensure this route exists in your application
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
        <Text style={styles.title}>Hi!</Text>
        <Text style={styles.title2}>Welcome Back!</Text>
        

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
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignIn}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.footer}>
          <Text style={styles.keterangan}>Don’t have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Sign Up</Text>
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
  title2: {
    fontFamily: 'Poppins-Semibold', // Pastikan font ini sudah di-load
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  title: {
    fontFamily: 'Poppins-Semibold', // Pastikan font ini sudah di-load
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
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
    marginBottom: 20,
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
  },
  keterangan: {
    fontSize: 14,
    color: '#333',
  },
  signUpText: {
    fontSize: 14,
    color: '#273A96', 
    fontWeight: 'bold',
  },
});

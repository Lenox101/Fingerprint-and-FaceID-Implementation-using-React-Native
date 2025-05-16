import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

import { loginUser, verifyToken } from '../../API/authRequests';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    tryBiometricLogin();
  }, []);

  const promptToEnableBiometrics = async (authToken: string) => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Would you like to use Face ID / Fingerprint for quicker future logins?',
      });

      if (result.success) {
        await SecureStore.setItemAsync('userToken', authToken); // Save JWT
        await SecureStore.setItemAsync('biometricsEnabled', 'true');
        Alert.alert('Biometrics Enabled', 'You can now log in with your biometrics.');
      }
    }
  };

  const tryBiometricLogin = async () => {
    const enabled = await SecureStore.getItemAsync('biometricsEnabled');

    if (enabled === 'true') {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Log in with Face ID or Fingerprint',
        });

        if (result.success) {
          const token = await SecureStore.getItemAsync('userToken');
          if (token) {
            try {
              const response = await verifyToken(token);
              // Assuming a successful response (status 200) means the token is valid
              if (response) {
                router.replace('/protected/Home');
              } else {
                // Token is invalid or expired, clear it
                await SecureStore.deleteItemAsync('userToken');
                await SecureStore.deleteItemAsync('biometricsEnabled');
                Alert.alert('Token verification failed, cleared token and biometrics setting.');
              }
            } catch (error) {
              // Handle verification error (e.g., network issues)
              console.error('Token verification error:', error);
              // Optionally clear token and biometrics setting on error
              await SecureStore.deleteItemAsync('userToken');
              await SecureStore.deleteItemAsync('biometricsEnabled');
            }
          }
        }
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      if (response && response.token) {
        // Assuming the backend returns a token on successful login
        Alert.alert('Login Successful', 'You are now logged in.');
        router.replace('/protected/Home');
        promptToEnableBiometrics(response.token); // Prompt to enable biometrics after successful login
      } else {
        Alert.alert('Login Failed', 'Invalid credentials or server error.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message || 'An error occurred during login.');
    }
  };


  return (
    <View className="flex-1 justify-center items-center px-6 bg-white dark:bg-black">
      <View className="w-full max-w-md">
        <Text className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Login
        </Text>

        <TextInput
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl mb-4 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-800"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl mb-6 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-800"
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          className="bg-blue-600 py-3 rounded-xl mb-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-300 py-3 rounded-xl"
          onPress={tryBiometricLogin} // Use the tryBiometricLogin function
        >
          <Text className="text-gray-800 text-center text-lg font-semibold">
            Sign In with Biometrics
          </Text>
        </TouchableOpacity>


        <Link
          href="/auth/Signup"
          className="text-center mt-4 text-blue-600 dark:text-blue-400 text-base"
        >
          <Text>Don't have an account? Sign Up</Text>
        </Link>
      </View>
    </View>
  );
};

export default LoginScreen;

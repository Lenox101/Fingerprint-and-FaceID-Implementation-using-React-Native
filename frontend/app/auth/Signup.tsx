import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';


import { registerUser } from '../../API/authRequests';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const router = useRouter();

  const handleSubmit = async () => {
    // Clear previous errors
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let valid = true;

    // Basic Username Validation
    if (!username) {
      setUsernameError('Username is required.');
      valid = false;
    }

    // Basic Email Validation
    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format.');
      valid = false;
    }

    // Basic Password Validation
    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    }

    // Confirm Password Validation
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required.');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    }

    if (!valid) {
      return; // Stop if validation fails
    }

    try {
      const response = await registerUser({ username, email, password });
      // If we get here, registration was successful (since registerUser would throw on error)
      Alert.alert('Success', 'User registered successfully!');
      router.replace('/auth/Login');

    } catch (error: any) {
      let errorMessage = 'Registration failed.';
      if (error.response && error.response.status === 400 && error.response.data && error.response.data.msg) {
        errorMessage = error.response.data.msg; // Use backend's specific error message
      } else if (error.message) {
        errorMessage = error.message; // Use generic Axios error message
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-6 bg-white dark:bg-black">
      <View className="w-full max-w-md">
        <Text className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Sign Up
        </Text>

        <TextInput
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl mb-4 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-800"
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="#9ca3af"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setUsernameError(''); // Clear error on change
          }}
        />
        {usernameError ? <Text className="text-red-500 text-sm mt-1 mb-2">{usernameError}</Text> : null}


        <TextInput
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl mb-4 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-800"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(''); // Clear error on change
          }}
        />
        {emailError ? <Text className="text-red-500 text-sm mt-1 mb-2">{emailError}</Text> : null}

        <TextInput
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl mb-4 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-800"
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError(''); // Clear error on change
          }}
        />
        {passwordError ? <Text className="text-red-500 text-sm mt-1 mb-2">{passwordError}</Text> : null}

        <TextInput
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl mb-6 text-base text-gray-900 dark:text-white bg-white dark:bg-gray-800"
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor="#9ca3af"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setConfirmPasswordError(''); // Clear error on change
          }}
        />
        {confirmPasswordError ? <Text className="text-red-500 text-sm mt-1 mb-6">{confirmPasswordError}</Text> : null}

        <TouchableOpacity
          className="bg-blue-600 py-3 rounded-xl"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

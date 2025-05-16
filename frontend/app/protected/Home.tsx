import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Assuming AsyncStorage is used for token storage

const HomeScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Clear the authentication token (adjust key if needed)
      await AsyncStorage.removeItem('userToken');
      // Navigate to the login screen
      router.replace('/auth/Login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1E3061' }}
      headerImage={
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
      <ThemedText>
        This is a simple home page to show something interesting.
        You can navigate to the Explore tab to see another example screen.
      </ThemedText>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <ThemedText type="link">Logout</ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0', // Example background color
    alignSelf: 'center', // Center the button
    borderRadius: 5,
  },
});

export default HomeScreen;

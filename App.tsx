import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/mainNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stylesheet } from './assets/stylesheet';

export default function App() {
  const [initialRoute, setInitialRoute] = useState<'Auth' | 'App' | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('@skillupplus:token');
      setInitialRoute(token ? 'App' : 'Auth');
    };
    checkAuth();
  }, []);

  if (!initialRoute) {
    return (
      <View style={stylesheet.centeredContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainNavigator initialRouteName={initialRoute} />
    </NavigationContainer>
  );
}

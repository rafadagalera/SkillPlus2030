import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { RootStackParams, AuthStackParams, AppDrawerParams } from './types';

import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

import HomeTabs from '../screens/Home/HomeTabs';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const RootStack = createNativeStackNavigator<RootStackParams>();
const AuthStack = createNativeStackNavigator<AuthStackParams>();
const Drawer = createDrawerNavigator<AppDrawerParams>();

function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <AuthStack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrar' }} />
    </AuthStack.Navigator>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default function MainNavigator({ initialRouteName }: { initialRouteName: 'Auth' | 'App' }) {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <RootStack.Screen name="Auth" component={AuthRoutes} />
      <RootStack.Screen name="App" component={AppDrawer} />
    </RootStack.Navigator>
  );
}

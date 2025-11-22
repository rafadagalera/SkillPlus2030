import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabsParams } from '../../navigation/types';

import TrailsScreen from './TrailsScreen';
import AssessmentScreen from './AssessmentScreen';
import ProgressScreen from './ProgressScreen';
import TrailDetailsScreen from './TrailDetailsScreen';

const Tab = createBottomTabNavigator<TabsParams>();
const TrailsStack = createNativeStackNavigator<TabsParams>();

function TrailsStackNavigator() {
  return (
    <TrailsStack.Navigator>
      <TrailsStack.Screen
        name="Trails"
        component={TrailsScreen}
        options={{ title: 'Trilhas', headerShown: false }}
      />
      <TrailsStack.Screen
        name="TrailDetails"
        component={TrailDetailsScreen}
        options={{ title: 'Detalhes da Trilha' }}
      />
    </TrailsStack.Navigator>
  );
}

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Trails" component={TrailsStackNavigator} options={{ title: 'Trilhas', headerShown: false }} />
      <Tab.Screen name="Assessment" component={AssessmentScreen} options={{ title: 'Autoavaliação' }} />
      <Tab.Screen name="Progress" component={ProgressScreen} options={{ title: 'Progresso' }} />
    </Tab.Navigator>
  );
}

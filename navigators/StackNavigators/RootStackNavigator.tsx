import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RootBottomTabs from '../RootBottomTabsNavigator';
import Favorite from '../../screens/StackScreens/RootStackScreens/Favorite';
import Library from '../../screens/StackScreens/RootStackScreens/Library';

export type RootStackParamList = {
  RootTabs: undefined;
  Favorite: undefined;
  Library: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="RootTabs">
      <Stack.Screen
        name="RootTabs"
        component={RootBottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="Library" component={Library} />
    </Stack.Navigator>
  );
}

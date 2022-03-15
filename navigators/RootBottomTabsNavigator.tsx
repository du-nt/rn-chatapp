import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import Chats from '../screens/BottomTabsScreens/Chats';
import People from '../screens/BottomTabsScreens/People';

const Tab = createBottomTabNavigator();

export default function RootBottomTabs() {
  const {t} = useTranslation();

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="chatbubble" color={color} size={size} />
          ),
          tabBarBadge: 3,
          tabBarLabel: t('navigate:chats'),
        }}
      />
      <Tab.Screen
        name="People"
        component={People}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="people" color={color} size={size} />
          ),
          tabBarBadge: 3,
          tabBarLabel: t('navigate:people'),
        }}
      />
    </Tab.Navigator>
  );
}

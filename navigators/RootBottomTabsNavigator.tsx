import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';

import TabView from '../screens/BottomTabsScreens/TabViewScreens';
import User from '../screens/BottomTabsScreens/User';
import Setting from '../screens/BottomTabsScreens/Setting';

const Tab = createBottomTabNavigator();

export default function RootBottomTabs() {
  const {t} = useTranslation();

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Explore"
        component={TabView}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="explore" color={color} size={size} />
          ),
          tabBarLabel: t('navigate:explore'),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account-circle" color={color} size={size} />
          ),
          tabBarBadge: 3,
          tabBarLabel: t('navigate:user'),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" color={color} size={size} />
          ),
          tabBarLabel: t('navigate:settings'),
        }}
      />
    </Tab.Navigator>
  );
}

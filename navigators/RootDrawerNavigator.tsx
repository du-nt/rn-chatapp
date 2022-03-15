import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import RootStack from './StackNavigators/RootStackNavigator';
import DrawerContent from '../screens/DrawerScreens/DrawerContent';

const Drawer = createDrawerNavigator();

export default function RootDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#f00',
        drawerStyle: style.drawerStyle,
        drawerItemStyle: style.itemStyle,
        drawerLabelStyle: style.label,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={RootStack}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon
              style={style.icon}
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const style = StyleSheet.create({
  drawerStyle: {
    backgroundColor: '#eee',
  },
  itemStyle: {
    paddingHorizontal: 10,
    marginVertical: 0,
    borderRadius: 0,
    marginRight: 10,
    marginLeft: 0,
  },
  icon: {
    marginLeft: 10,
    backgroundColor: 'white',
  },
  label: {
    backgroundColor: '#eee',
    marginLeft: 0,
  },
});

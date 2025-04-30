import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../screens/home/Home';
import Notifications from '../../screens/Notifications';
import Menu from '../../screens/Menu';
import TabIcon from './TabIcon';
import bottomTabNavigatorStyles from './style';

import { ImageSourcePropType, Pressable } from 'react-native';

const Tab = createBottomTabNavigator();

const TabBarButton = (props: any) => (
  <Pressable android_ripple={{ color: 'transparent' }} {...props} />
);

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

const createIcon = (iconSource: ImageSourcePropType) => {
  return ({ color, focused }: TabBarIconProps) => (
    <TabIcon
      focused={focused}
      color={color}
      iconSource={iconSource}
    />
  );
};

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          ...bottomTabNavigatorStyles,
          tabBarButton: TabBarButton,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: createIcon(require('../../assets/images/ClipboardText.png')),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarIcon: createIcon(require('../../assets/images/Bell.png')),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={Menu}
          options={{
            tabBarIcon: createIcon(require('../../assets/images/List.png')),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
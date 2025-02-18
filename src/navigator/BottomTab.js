import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';

export default function BottomTab() {
  const TabNav = createBottomTabNavigator();
  return (
    <TabNav.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#E4132C',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 16, // Increased font size
        },
        tabBarStyle: {
          height: 70, // Increased height of the bottom tab bar
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}>
      <TabNav.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={21} // Increased icon size
              color={focused ? '#E4132C' : 'grey'}
            />
          ),
        }}
      />
      <TabNav.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={21} // Increased icon size
              color={focused ? '#E4132C' : 'grey'}
            />
          ),
        }}
      />
    </TabNav.Navigator>
  );
}

const styles = StyleSheet.create({});

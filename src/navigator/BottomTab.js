import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WorkoutScreen from '../screens/bottom_page/WorkoutScreen';
import DietScreen from '../screens/bottom_page/DietScreen';
import  ProfileScreen from '../screens/bottom_page/ProfileScreen ';
import HomeScreen from '../screens/bottom_page/HomeScreen';

export default function BottomTab() {
  const TabNav = createBottomTabNavigator();
  return (
    <TabNav.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: '#000000',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
        },
      }}>
      <TabNav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'layers' : 'layers-outline'}
              size={20}
              color={focused ? 'white' : 'grey'}
            />
          ),
        }}
      />
      <TabNav.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'barbell' : 'barbell-outline'}
              size={20}
              color={focused ? 'white' : 'grey'}
            />
          ),
        }}
      />
      <TabNav.Screen
        name="Diet"
        component={DietScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              size={20}
              color={focused ? 'white' : 'grey'}
            />
          ),
        }}
      />
      <TabNav.Screen
        name="Me"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={20}
              color={focused ? 'white' : 'grey'}
            />
          ),
        }}
      />
    </TabNav.Navigator>
  );
}

const styles = StyleSheet.create({});

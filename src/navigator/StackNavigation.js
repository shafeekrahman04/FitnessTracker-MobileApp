import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import BottomTab from './BottomTab';
import PersonalInfo from '../screens/PersonalInfo';
import SignUp from '../screens/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

export default function StackNavigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFresh, setIsFresh] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAsyncStorage = async () => {
      try {
        const authStatus = await AsyncStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus === 'true' ? true : false);
        const freshStatus = await AsyncStorage.getItem('isFresh');
        setIsFresh(freshStatus === 'false' ? false : true);
      } catch (error) {
        console.error('Error checking status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAsyncStorage();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  let initialRouteName;

  if (isFresh === true) {
    initialRouteName = 'Login';
  } else if (isFresh === false) {
    initialRouteName = isAuthenticated ? 'HomeTab' : 'Login';
  } else {
    initialRouteName = 'Login';
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeTab"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PersonalInfo"
          component={PersonalInfo}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

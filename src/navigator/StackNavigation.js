import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import BottomTab from './BottomTab';
import PersonalInfo from '../screens/PersonalInfo';
import SplashScreen from '../screens/SplashScreen';
import NameInputScreen from '../screens/onBoarding/NameInputScreen';
import OnboardingScreen from '../screens/onBoarding/OnboardingScreen';
import GenderSelectionScreen from '../screens/onBoarding/GenderSelectionScreen';
import GoalSelectionScreen from '../screens/onBoarding/GoalSelectionScreen';
import FitnessLevelScreen from '../screens/onBoarding/FitnessLevelScreen';
import FocusPartScreen from '../screens/onBoarding/FocusPartScreen';
import UserDetailsScreen from '../screens/onBoarding/UserDetailsScreen';
import GeneratePlanScreen from '../screens/onBoarding/GeneratePlanScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import PlanScreen from '../screens/PlanScreen';
import PlanDetailScreen from '../screens/PlanDetailScreen';
import GetStartedScreen from '../screens/GetStartedScreen';

const Stack = createStackNavigator();

export default function StackNavigation() {
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <SplashScreen />;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NameInput"
          component={NameInputScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GenderSelection"
          component={GenderSelectionScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GoalSelection"
          component={GoalSelectionScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FitnessLevel"
          component={FitnessLevelScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FocusPart"
          component={FocusPartScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GeneratePlan"
          component={GeneratePlanScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ExerciseScreen"
          component={ExerciseScreen}
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
          name="HomeTab"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Plan"
          component={PlanScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PlanDetail"
          component={PlanDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
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

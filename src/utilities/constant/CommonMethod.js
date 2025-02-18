import { PermissionsAndroid } from 'react-native';
import {alertMessageType} from '../enum/Enum';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMessageColorByCode = code => {
  for (let key in alertMessageType) {
    if (alertMessageType[key].code == code) {
      return alertMessageType[key].color;
    }
  }
};

export async function getToken() {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
}


export async function getUser() {
  try {
    const userData = await AsyncStorage.getItem('appUser');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
}

export const requestSMSPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: 'SMS Permission',
        message: 'This app needs access to send SMS alerts.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native';
import {saveUserActivity} from '../api/UserActivityApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertMessage from '../shared/AlertMessage';
import Loader from '../shared/Loader';
import {alertMessageType} from '../utilities/enum/Enum';

const GetStartedScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    timestamp: Date.now(),
  });
  const [alertType, setAlertType] = useState('');
  const alertMessagePopUp = (message, messageType) => {
    setAlertMessage({message: message, timestamp: new Date()});
    setAlertType(messageType);
  };

  const handleGetStarted = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('appUser');
      const user = JSON.parse(storedUser);
      const response = await saveUserActivity({
        appUserId: user.id,
        startDate: new Date().toISOString().split('T')[0],
        status: false,
      });
      if (response.data.success) {
        AsyncStorage.setItem('userStarted', 'true');
        alertMessagePopUp(
          'our fitness plan has started!',
          alertMessageType.SUCCESS.code,
        );
        setTimeout(() => {
          navigation.navigate('HomeTab');
        }, 500);
      } else {
        alertMessagePopUp(
          'Failed to start your plan',
          alertMessageType.DANGER.code,
        );
      }
    } catch (error) {
      alertMessagePopUp('Something went wrong', alertMessageType.DANGER.code);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/onBoard.jpg')}
      style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>GET START YOUR PLAN</Text>
          {/* <Text style={styles.subtitle}>ACHIEVE YOUR GOALS</Text> */}
          <View style={styles.brandContainer}>
            <Text style={styles.brand}>YOUR FITNESS</Text>
            <Text style={styles.brandText}>YOUR WAY</Text>
          </View>
        </View>

        {/* Start Now Button */}
        <AlertMessage message={alertMessage} messageType={alertType} />
        {/* loader */}
        <Modal visible={loader} transparent>
          <Loader />
        </Modal>
      </View>
      <Pressable style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    paddingBottom: 80,
  },
  contentContainer: {
    width: '100%',
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1.2,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  brand: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 12,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 6,
  },
  button: {
    backgroundColor: '#ff6347', // Tomato color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 50,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default GetStartedScreen;

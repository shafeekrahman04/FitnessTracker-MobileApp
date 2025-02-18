import React, {useEffect, useRef} from 'react';
import {View, Text, ImageBackground, StyleSheet, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start(() => {
        navigation.replace("NameInput");
    });
  }, []);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ImageBackground
      source={require('../../assets/onBoarding.jpg')}
      style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>FITNESS</Text>
          <Text style={styles.subtitle}>COACH</Text>
          <View style={styles.brandContainer}>
            <Text style={styles.brand}>LEAP</Text>
            <Text style={styles.brandText}>FITNESS</Text>
          </View>
        </View>

        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[styles.progressBar, {width: progressBarWidth}]}
          />
        </View>
      </View>
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
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 40,
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
    fontFamily: 'Altivo',
  },
  brandText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 6,
    fontFamily: 'Altivo',
  },
  progressBarContainer: {
    width: 350,
    height: 6,
    backgroundColor: '#444',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 30,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default OnboardingScreen;

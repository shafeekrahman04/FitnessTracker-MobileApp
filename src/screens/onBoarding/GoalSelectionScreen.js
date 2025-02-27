import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome6';
import AlertMessage from '../../shared/AlertMessage';
import {alertMessageType} from '../../utilities/enum/Enum';

const goals = [
  {id: 'lose_weight', label: 'LOSE WEIGHT', icon: 'weight-scale'},
  {id: 'build_muscle', label: 'BUILD MUSCLE', icon: 'dumbbell'},
  {id: 'keep_fit', label: 'KEEP FIT', icon: 'heart-pulse'},
];

const GoalSelectionScreen = ({navigation, route}) => {
  const {userData} = route.params || {};

  const [selectedGoal, setSelectedGoal] = useState(null);
  const [alertMessage, setAlertMessage] = useState({message: '',timestamp: Date.now(),});
  const [alertType, setAlertType] = useState('');

  const alertMessagePopUp = (message, messageType) => {
    setAlertMessage({message: message, timestamp: new Date()});
    setAlertType(messageType);
  };

  const handleNext = () => {
    if (!selectedGoal) {
      alertMessagePopUp(
        'Please select a goal before proceeding.',
        alertMessageType.WARNING.code,
      );
      return;
    }
    const updatedUserData = { ...userData, goal: selectedGoal };
    navigation.navigate('FitnessLevel', { userData: updatedUserData });
  };

  return (
    <View style={styles.container}>
      {/* Top Section - Back Button, Progress, Title & Subtitle */}
      <View style={styles.topContainer}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.title}>WHAT'S YOUR GOAL?</Text>
        <Text style={styles.subtitle}>
          Choose your main goal and your coach will help you achieve it.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {goals.map(goal => (
          <TouchableOpacity
            key={goal.id}
            style={[
              styles.button,
              selectedGoal === goal.id && styles.selectedButton,
            ]}
            onPress={() => setSelectedGoal(goal.id)}>
            <FontAwesome5
              name={goal.icon}
              size={20}
              color="#FFF"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>{goal.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Section - Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            {backgroundColor: selectedGoal ? '#E53935' : '#f5736c'},
          ]}
          onPress={handleNext}>
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
      <AlertMessage message={alertMessage} messageType={alertType} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 30,
    position: 'relative', // Needed for absolute back button positioning
  },
  backButton: {
    position: 'absolute',
    left: -20,
    top: -20,
    padding: 10,
    zIndex: 10, // Ensures it's above other elements
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 12,
    height: 4,
    backgroundColor: '#444',
    marginHorizontal: 5,
    borderRadius: 2,
  },
  activeDot: {
    backgroundColor: '#E53935',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'Altivo-Bold',
  },
  subtitle: {
    color: '#bbb',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 20,
    fontFamily: 'Altivo-Bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D2D2D',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    height: 100,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#D32F2F',
  },
  icon: {
    marginBottom: 5,
    padding: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    paddingBottom: 30,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  nextButton: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default GoalSelectionScreen;

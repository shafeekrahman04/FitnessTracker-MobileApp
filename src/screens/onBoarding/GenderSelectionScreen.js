import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome6';

const GenderSelectionScreen = ({navigation}) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = gender => {
    setSelectedGender(gender);
  };

  const handleNext = () => {
    if (!selectedGender) {
      Alert.alert('Input Required', 'Please select gender before proceeding.');
      return;
    }
    navigation.navigate('GoalSelection');
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
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.title}>WHAT'S YOUR GENDER?</Text>
        <Text style={styles.subtitle}>
          Your coach will design a personalized workout program based on a few
          questions.
        </Text>
      </View>

      {/* Gender Selection - Centered */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'female' && styles.selectedGender,
          ]}
          onPress={() => handleGenderSelect('female')}>
          <FontAwesome5 name="venus" size={40} color="white" />
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'male' && styles.selectedGender,
          ]}
          onPress={() => handleGenderSelect('male')}>
          <FontAwesome5 name="mars" size={40} color="white" />
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section - Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: selectedGender ? '#E53935' : '#f5736c'},
          ]}
          onPress={handleNext}>
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
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
  genderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginHorizontal: 20,
  },
  selectedGender: {
    backgroundColor: '#E53935',
  },
  genderText: {
    color: 'white',
    marginTop: 8,
    fontSize: 16,
  },
  bottomContainer: {
    paddingBottom: 30,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default GenderSelectionScreen;

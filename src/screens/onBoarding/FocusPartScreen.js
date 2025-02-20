import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome6';
import AlertMessage from '../../shared/AlertMessage';
import { alertMessageType } from '../../utilities/enum/Enum';

const focusParts = [
  { id: 'arm', label: 'ARM', image: require('../../assets/focus_part/arm.jpg') },
  { id: 'chest', label: 'CHEST', image: require('../../assets/focus_part/chest.jpg') },
  { id: 'abs', label: 'ABS', image: require('../../assets/focus_part/abs.jpg') },
  { id: 'leg', label: 'LEG', image: require('../../assets/focus_part/leg.jpg') },
  { id: 'fullbody', label: 'FULL BODY', image: require('../../assets/focus_part/full_body.jpg') },
];
const FocusPartScreen = ({navigation,route}) => {
  const {userData} = route.params || {};

    const [selectedPart, setSelectedPart] = useState(null);
    const [alertMessage, setAlertMessage] = useState({message: '',timestamp: Date.now(),});
    const [alertType, setAlertType] = useState('');
  
    const alertMessagePopUp = (message, messageType) => {
      setAlertMessage({message: message, timestamp: new Date()});
      setAlertType(messageType);
    };

    const handleSelect = (id) => {
      setSelectedPart(id);
    };
  
    const handleNext = () => {
      if (!selectedPart) {
        alertMessagePopUp(
          'Please select a focus area before proceeding.',
          alertMessageType.WARNING.code,
        );
        return;
      }
      const updatedUserData = { ...userData, focusPart: selectedPart };
      navigation.navigate('UserDetails', { userData: updatedUserData });
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
        <View style={[styles.dot, styles.activeDot]} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>

        <Text style={styles.title}>WHAT'S YOUR FOCUS PART?</Text>
        <Text style={styles.subtitle}>
        Choose your problem area and your coach will schedule a plan to meet your needs.
        </Text>
      </View>

       {/* Focus Areas */}
       <View style={styles.optionsContainer}>
        {focusParts.map((part) => (
          <TouchableOpacity
            key={part.id}
            style={[
              styles.option,
              selectedPart === part.id && styles.selectedOption,
            ]}
            onPress={() => handleSelect(part.id)}
          >
            <Image source={part.image} style={styles.optionImage} />
            <Text style={styles.optionText}>{part.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Section - Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: selectedPart ? '#E53935' : '#f5736c'},
          ]}
          onPress={handleNext}>
          <Text style={styles.buttonText}>NEXT</Text>
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
    justifyContent: 'center',
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
    marginBottom: 5,
  },
  subtitle: {
    color: '#bbb',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 20,
    fontFamily: 'Altivo-Bold',
    marginBottom: 50,
  },
  optionsContainer: {
    flex: 1,
    marginTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  selectedOption: {
    backgroundColor: '#E53935',
  },
  optionImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  optionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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

export default FocusPartScreen;

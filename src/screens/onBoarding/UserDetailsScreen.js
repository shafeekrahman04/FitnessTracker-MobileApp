import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome6';

const fields = [
  { label: 'Date of Birth', key: 'dob' },
  { label: 'Current weight', key: 'currentWeight' },
  { label: 'Target weight', key: 'targetWeight' },
  { label: 'Height', key: 'height' },
];

const UserDetailsScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    dob: '1990-01-01',
    currentWeight: '176.4 lbs',
    targetWeight: '165.3 lbs',
    height: `5'10"`,
  });

  // Refs for TextInput fields
  const inputRefs = {
    dob: useRef(null),
    currentWeight: useRef(null),
    targetWeight: useRef(null),
    height: useRef(null),
  };

  const handleInputChange = (field, value) => {
    setUserData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleNext = () => {
    navigation.navigate('GeneratePlan', { userData });
  };

  return (
    <View style={styles.container}>
      {/* Top Section - Back Button, Progress, Title & Subtitle */}
      <View style={styles.topContainer}>
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
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        <Text style={styles.title}>LET US KNOW YOU BETTER</Text>
        <Text style={styles.subtitle}>
          Let your coach know you better to provide more targeted support for
          you.
        </Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        {fields.map((item, index) => (
          <View key={index} style={styles.inputRow}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                ref={inputRefs[item.key]}
                style={styles.input}
                value={userData[item.key]}
                onChangeText={value => handleInputChange(item.key, value)}
              />
              <TouchableOpacity onPress={() => inputRefs[item.key].current.focus()}>
                <FontAwesome5 name="pen" size={14} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Bottom Section - Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
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
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: -20,
    top: -20,
    padding: 10,
    zIndex: 10,
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
  },
  subtitle: {
    color: '#bbb',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  inputContainer: {
    marginTop: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 15,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 10,
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
    backgroundColor: '#E53935',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default UserDetailsScreen;

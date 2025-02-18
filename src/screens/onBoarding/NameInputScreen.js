import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

const NameInputScreen = ({navigation}) => {
  const [name, setName] = useState('');

  const handleNext = () => {
    if (!name.trim()) {
      Alert.alert(
        'Input Required',
        'Please enter your name before proceeding.',
      );
      return;
    }
    navigation.navigate('GenderSelection');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/avatar.jpg')}
        style={styles.avatar}
      />
      <Text style={styles.title}>WHAT'S YOUR NAME?</Text>
      <Text style={styles.subtitle}>
        Hello! I'm your personal coach Max. What would you like to be called?
      </Text>

      {/* Centered Input Field */}
      <View style={styles.inputWrapper}>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>

      {/* Next Button - Dimmed if no input */}
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: name.trim() ? '#E53935' : '#f5736c'},
        ]}
        onPress={handleNext}
        // disabled={!name.trim()}
        >
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60, // Push content down
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: 'Altivo-Bold',
  },
  subtitle: {
    color: '#bbb',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 40,
    fontFamily: 'Altivo-Bold',
  },
  inputWrapper: {
    flex: 1, // Push input to center
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    fontWeight: '800',
    fontFamily: 'Altivo-Bold',
  },
  button: {
    width: '90%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 40, // Push button to bottom
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default NameInputScreen;

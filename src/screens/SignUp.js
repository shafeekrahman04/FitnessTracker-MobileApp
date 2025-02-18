import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../utilities/styles/GlobalStyles';
import {useAuth} from '../security/AuthContext';
import AlertMessage from '../shared/AlertMessage';
import Loader from '../shared/Loader';
import {alertMessageType} from '../utilities/enum/Enum';

export default function SignUp() {
  const authContext = useAuth(); // Get signup function from context
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    timestamp: Date.now(),
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const alertMessagePopUp = (message, messageType) => {
    setAlertMessage({message: message, timestamp: new Date()});
    setAlertType(messageType);
  };

  const signUpValidation = () => {
    let isValid = true;
    if (name.length == 0) {
      alertMessagePopUp('Please enter name', alertMessageType.WARNING.code);
      return false;
    }
    if (username.length == 0) {
      alertMessagePopUp('Please enter username', alertMessageType.WARNING.code);
      return false;
    }
    if (contactNumber.length == 0) {
      alertMessagePopUp('Please enter phone no', alertMessageType.WARNING.code);
      return false;
    }
    if (password.length == 0) {
      alertMessagePopUp('Please enter password', alertMessageType.WARNING.code);
      return false;
    }
    if (confirmPassword.length == 0) {
      alertMessagePopUp(
        'Please enter confirm password',
        alertMessageType.WARNING.code,
      );
      return false;
    }
    if (password !== confirmPassword) {
      alertMessagePopUp(
        'Password and Confirm Password do not match',
        alertMessageType.WARNING.code,
      );
      return false;
    }
    return isValid;
  };

  const handleSignUp = async () => {
    if (signUpValidation()) {
      setLoader(true);
      const success = await authContext.signup(
        name,
        username,
        contactNumber,
        password,
      );
      setLoader(false);
      if (success) {
        alertMessagePopUp('Signup successful', alertMessageType.SUCCESS.code);

        setTimeout(() => {
          navigation.replace('Login');
        }, 500);
      } else {
        alertMessagePopUp(authContext.error, alertMessageType.DANGER.code);
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={24} color="#E4132C" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subTitle}>Create your account</Text>
        <Text style={styles.subTitle}>
          Register now to create a new account
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={v => {
            setName(v);
          }}
          placeholder="eg: zayin zaayi"
        />
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={v => {
            setUsername(v);
          }}
          placeholder="eg: zayin"
        />

        {/* Email */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234567890"
          value={contactNumber}
          onChangeText={v => {
            setContactNumber(v);
          }}
          keyboardType="number-pad"
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="********"
            value={password}
            onChangeText={v => {
              setPassword(v);
            }}
            secureTextEntry={showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => toggleShowPassword()}>
            {showPassword ? (
              <FontAwesome6 name={'eye-slash'} size={17} color={Colors.red} />
            ) : (
              <FontAwesome6 name={'eye'} size={17} color={Colors.red} />
            )}
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="********"
            value={confirmPassword}
            onChangeText={v => {
              setConfirmPassword(v);
            }}
            secureTextEntry={showConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => toggleShowConfirmPassword()}>
            {showConfirmPassword ? (
              <FontAwesome6 name={'eye-slash'} size={17} color={Colors.red} />
            ) : (
              <FontAwesome6 name={'eye'} size={17} color={Colors.red} />
            )}
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <AlertMessage message={alertMessage} messageType={alertType} />
      {/* loader */}
      <Modal visible={loader} transparent>
        <Loader />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E4132C',
    textAlign: 'center',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E4132C',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  signUpButton: {
    backgroundColor: '#E4132C',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import  {Colors} from '../utilities/styles/GlobalStyles';
import {TextInput} from 'react-native-gesture-handler';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AlertMessage from '../shared/AlertMessage';
import Loader from '../shared/Loader';
import {alertMessageType} from '../utilities/enum/Enum';
import { useAuth } from '../security/AuthContext';

export default function LoginScreen({navigation}) {
  const authContext = useAuth();

  const [showPassword, setShowPassword] = useState(true);
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [alertMessage, setAlertMessage] = useState({
    message: '',
    timestamp: Date.now(),
  });
  const [alertType, setAlertType] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const alertMessagePopUp = (message, messageType) => {
    setAlertMessage({message: message, timestamp: new Date()});
    setAlertType(messageType);
  };

  const loginValidation = () => {
    let isValid = true;
    if (username.length == 0) {
      alertMessagePopUp('Please enter username', alertMessageType.WARNING.code);
      return false;
    }
    if (password.length == 0) {
      alertMessagePopUp('Please enter password', alertMessageType.WARNING.code);
      return false;
    }
    return isValid;
  };

  async function login() {
    if (loginValidation()) {
      setLoader(true);
      const loginSuccess = await authContext.login(username, password);
      setLoader(false);
      if (loginSuccess) {
        alertMessagePopUp('Login successful', alertMessageType.SUCCESS.code);

        setTimeout(() => {
          navigation.replace('HomeTab');
        }, 500);
      } else {
        alertMessagePopUp("Incorrext username or password", alertMessageType.DANGER.code);
      }
    }
  }

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <>
      <View style={styles.body}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
        />

        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="alex"
            value={username}
            onChangeText={v => {
              setUsername(v);
            }}
          />
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={showPassword}
              placeholder="Password"
              value={password}
              onChangeText={v => {
                setPassword(v);
              }}
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
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => login()} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={goToSignUp}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <AlertMessage message={alertMessage} messageType={alertType} />
        {/* loader */}
        <Modal visible={loader} transparent>
          <Loader />
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '2%',
    backgroundColor: Colors.white,
  },
  image_container: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: '20%',
    resizeMode: 'cover',
    alignItems: 'center',
  },
  heading: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading_font: {
    color: Colors.red,
    fontSize: 25,
    fontWeight: 'bold',
  },
  header: {
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#E4132C',
    textAlign: 'center',
  },
  welcometxt: {
    fontSize: 16,
    paddingVertical: 5,
    textAlign: 'center',
    fontWeight: '400',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
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
    marginBottom: 10,
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
  forgotPassword: {
    textAlign: 'right',
    fontSize: 14,
    color: '#E4132C',
  },
  loginButton: {
    backgroundColor: '#E4132C',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    backgroundColor: '#ccc',
    height: 1,
    flex: 1,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#333',
  },
  signupLink: {
    fontSize: 16,
    color: '#E4132C',
    fontWeight: 'bold',
  },
});

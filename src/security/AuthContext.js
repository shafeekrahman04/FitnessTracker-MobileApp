import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLogin, userRegister } from '../api/AuthenticationApiService';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({children}) {
  const [token, setToken] = useState(null);
  const [isFresh, setIsFresh] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
      const storedUser = await AsyncStorage.getItem('appUser');
      setUser(JSON.parse(storedUser));
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (token) {
      AsyncStorage.setItem('isAuthenticated', 'true');
    } else {
      AsyncStorage.removeItem('isAuthenticated');
    }
  }, [token]);

  async function login(username, password) {
    try {
      const response = await userLogin(username, password);
      if (response.status === 201) {
        const data = response.data;
        setToken(data.token);
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('isAuthenticated', 'true');
        await AsyncStorage.setItem("isFresh", "false");

        if (data.appUser) {
          await AsyncStorage.setItem('appUser', JSON.stringify(data.appUser));
        }
        return true;
      } else {
        setError(response.data.StatusMessage);
        logout();
        return false;
      }
    } catch (error) {
      setError(error.message || 'Network Error');
      logout();
      return false;
    }
  }

  async function signup(data) {
    try {
      const response = await userRegister(data);    
      if (response.data.success) {
        return true;
      } else {
        setError(response.data.StatusMessage);
        return false;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setError(error.response.data?.error?.message || 'Username already exists.');
        } else {
          setError(error.response.data?.error?.message || 'Something went wrong');
        }
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    AsyncStorage.removeItem('isAuthenticated');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('appUser');
  }

  return (
    <AuthContext.Provider value={{login, logout, signup, token, error, user}}>
      {children}
    </AuthContext.Provider>
  );
}

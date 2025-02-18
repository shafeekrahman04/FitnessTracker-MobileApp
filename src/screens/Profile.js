import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../utilities/styles/GlobalStyles';
import { useAuth } from '../security/AuthContext';

export default function Profile() {
  const navigation = useNavigation();
    const authContext = useAuth();
  

  const [isGestureEnabled, setIsGestureEnabled] = React.useState(false);

  const toggleGestureSwitch = () => setIsGestureEnabled((prev) => !prev);

  function logoutHandler() {
    authContext.logout();
    navigation.reset({
      index:0,
      routes:[{name:'Login'}],
    });
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Personal Information</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PersonalInfo')} >
          <View style={styles.optionContent}>
            <Icon name="person" size={32} color="#000" style={styles.icon}  />
            <Text style={styles.optionText}>Personal Information</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <View style={styles.optionContent}>
            <Icon name="contacts" size={32} color="#000" style={styles.icon} />
            <Text style={styles.optionText}>My Emergency Contacts</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <View style={styles.optionContent}>
            <Icon name="location-on" size={32} color="#000" style={styles.icon} />
            <Text style={styles.optionText}>Address</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.option}>
          <View style={styles.optionContent}>
            <Icon name="gesture" size={32} color="#000" style={styles.icon} />
            <Text style={styles.optionText}>Hand Gesture</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isGestureEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleGestureSwitch}
            value={isGestureEnabled}
          />
        </View>

        <TouchableOpacity
          style={styles.option}
          onPress={logoutHandler}
        >
          <View style={styles.optionContent}>
            <Icon name="logout" size={32} color="#000" style={styles.icon} />
            <Text style={styles.optionText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>For any queries</Text>
        <Text style={styles.contactText}>9154880389</Text>
        <Text style={styles.contactText}>support@sauthrika.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
  },
  optionText: {
    fontSize: 20,
    color: '#000',
  },
  footer: { 
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  footerText: {
    padding:5,
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  contactText: {
    padding:5,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.red,
  },
});

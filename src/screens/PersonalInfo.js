import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../utilities/styles/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function PersonalInfo() {
  const navigation = useNavigation();
  const userData = {
    username: 'John Doe',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', // Placeholder image URL for profile picture
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Personal Information</Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
        <Text style={styles.profileName}>{userData.name}</Text>
      </View>

      {/* Personal Information Cards */}
      <View style={styles.card}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{userData.username}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{userData.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{userData.phone}</Text>
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
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circle-shaped image
    borderWidth: 4,
    borderColor: '#ddd',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 18,
    color: '#333',
    marginTop: 5,
  },
});

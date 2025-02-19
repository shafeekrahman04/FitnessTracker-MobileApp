import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const settingsData = [
  { id: '1', title: 'My Profile', icon: 'emoji-emotions', color: '#FF9800' },
  { id: '2', title: 'My Workouts', icon: 'favorite', color: '#E91E63' },
  { id: '3', title: 'Workout Settings', icon: 'water-drop', color: '#4CAF50' },
  { id: '4', title: 'General Settings', icon: 'settings', color: '#2196F3' },
  { id: '5', title: 'Language Options', icon: 'language', color: '#9C27B0', subtitle: 'System default' },
];

const extraSettings = [
  { id: '6', title: 'Rate Us', icon: 'star', color: '#FF9800' },
  { id: '7', title: 'Feedback', icon: 'edit', color: '#607D8B' },
];

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ME</Text>
      </View>

      {/* Settings Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>SETTINGS</Text>
        <FlatList
          data={settingsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.settingItem}>
              <MaterialIcons name={item.icon} size={24} color={item.color} />
              <View style={{ flex: 1 }}>
                <Text style={styles.settingText}>{item.title}</Text>
                {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Extra Settings Section */}
      <View style={styles.sectionContainer}>
        <FlatList
          data={extraSettings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.settingItem}>
              <MaterialIcons name={item.icon} size={24} color={item.color} />
              <Text style={styles.settingText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* App Version */}
      <Text style={styles.versionText}>Version 1.1.16</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: '#2A2A2A', // Gray background for section
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  sectionTitle: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#1E1E1E',
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
  },
  settingText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  subtitle: {
    color: '#AAA',
    fontSize: 14,
  },
  versionText: {
    color: '#AAA',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
});

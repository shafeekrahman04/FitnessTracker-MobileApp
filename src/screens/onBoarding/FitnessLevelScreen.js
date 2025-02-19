import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome6';

const FitnessLevelScreen = ({navigation}) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const levels = [1, 2, 3, 4, 5];
  const levelHeights = [40, 60, 80, 100, 120];

  // Mapping levels to emoji and description
  const descriptionData = {
    1: {emoji: '😞', text: 'I easily get out of breath while walking up the stairs'},
    2: {emoji: '🐥', text: 'My heartbeat really races after doing several jumping jacks'},
    3: {emoji: '💪', text: 'I exercise regularly, at least 1-2 times a week'},
    4: {emoji: '😎', text: 'Fitness is an essential part of my life'},
    5: {emoji: '🏅', text: 'Fitness is just a piece of cake for me'},
  };

  const handleLevelSelect = level => {
    setSelectedLevel(level);
  };

  const handleNext = () => {
    if (!selectedLevel) {
      Alert.alert('Input Required', 'Please select a level before proceeding.');
      return;
    }
    navigation.navigate('FocusPart');
  };

  return (
    <View style={styles.container}>
      {/* Top Section - Back Button, Progress, Title & Subtitle */}
      <View style={styles.topContainer}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.title}>CHOOSE YOUR FITNESS LEVEL</Text>
        <Text style={styles.subtitle}>
          Choose the description that fits you the most. Your coach will design
          a program with a suitable difficulty level for you.
        </Text>
      </View>

      {/* Signal Tower Checkbox */}
      <View style={styles.levelContainer}>
        {levels.map((level, index) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.level,
              {height: levelHeights[index]}, // Dynamic height
              selectedLevel === level && styles.selectedLevel,
              selectedLevel && level < selectedLevel && styles.dimmedLevel, // Dimmed effect
            ]}
            onPress={() => handleLevelSelect(level)}>
            {selectedLevel === level && (
              <FontAwesome5 name="check" size={16} color="#fff" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Show Emoji & Description ONLY when a level is selected */}
      {selectedLevel && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.emoji}>{descriptionData[selectedLevel].emoji}</Text>
          <Text style={styles.description}>{descriptionData[selectedLevel].text}</Text>
        </View>
      )}

      {/* Bottom Section - Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: selectedLevel ? '#E53935' : '#f5736c'},
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
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  level: {
    width: 50,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  selectedLevel: {
    backgroundColor: '#E53935',
  },
  dimmedLevel: {
    backgroundColor: '#f5736c', // Dimmed red
  },
  descriptionContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  emoji: {
    fontSize: 24,
  },
  description: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
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

export default FitnessLevelScreen;

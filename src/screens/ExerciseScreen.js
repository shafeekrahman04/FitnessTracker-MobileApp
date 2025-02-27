import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome6';

const FITNESS_LEVELS = {
  1: 'Beginner',
  2: 'Novice',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};

const ExerciseScreen = ({navigation,route}) => {
  const {exercises, title} = route.params || {exercises: []};
  const [userData, setUserData] = useState(null);
  const [fitnessLevel, setFitnessLevel] = useState('Beginner');
  const [time, setTime] = useState('15 min');
  const [calories, setCalories] = useState('150 Cal');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('appUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData(user);

          const level = FITNESS_LEVELS[user.fitnessLevel] || 'Beginner';
          setFitnessLevel(level);

          switch (user.fitnessLevel) {
            case '1':
              setTime('15 min');
              setCalories('150 Cal');
              break;
            case '2':
              setTime('20 min');
              setCalories('200 Cal');
              break;
            case '3':
              setTime('25 min');
              setCalories('250 Cal');
              break;
            case '4':
              setTime('30 min');
              setCalories('300 Cal');
              break;
            case '5':
              setTime('40 min');
              setCalories('400 Cal');
              break;
            default:
              setTime('15 min');
              setCalories('150 Cal');
          }
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Image
          source={require('../assets/onBoarding.jpg')}
          style={styles.headerImage}
        />
        <View style={styles.headerOverlay}>
          <Text style={styles.title}>
            CLASSIC {title} • {fitnessLevel}
          </Text>
          <Text style={styles.details}>
            ⏱ {time} 🔥 {calories} 🏋️ No equipment
          </Text>
        </View>
      </View>

      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.exerciseItem}>
            <Image
              source={require('../assets/avatar.jpg')}
              style={styles.exerciseImage}
            />
            <View>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseDetails}>
                {item.reps || item.duration}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212'},
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
    zIndex: 10, // Ensures it's above other elements
  },
  header: {position: 'relative', height: 200},
  headerImage: {width: '100%', height: '100%', position: 'absolute'},
  headerOverlay: {position: 'absolute', bottom: 20, left: 20},
  title: {fontSize: 22, fontWeight: 'bold', color: '#fff'},
  details: {fontSize: 14, color: '#ddd', marginTop: 5},
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  exerciseImage: {width: 50, height: 50, marginRight: 15},
  exerciseName: {fontSize: 16, fontWeight: 'bold', color: '#fff'},
  exerciseDetails: {fontSize: 14, color: '#aaa'},
});

export default ExerciseScreen;

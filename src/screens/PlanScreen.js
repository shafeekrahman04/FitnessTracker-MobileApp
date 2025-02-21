import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../shared/Loader';

const FITNESS_LEVELS = {
  1: 'Beginner',
  2: 'Novice',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};
const FITNESS_LEVEL_TIMES = {
  Beginner: 30, // 30 minutes
  Novice: 40,
  Intermediate: 50,
  Advanced: 60,
  Expert: 70,
};
const PlanScreen = ({navigation, route}) => {
  const {userActivityData, firstInactiveDay} = route.params || {
    userActivityData: [],
  };
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState(null);
  const [fitnessLevel, setFitnessLevel] = useState('Beginner');
  const [focusPart, setFocusPart] = useState('Full Body');
  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('appUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData(user);

          const level = FITNESS_LEVELS[user.fitnessLevel] || 'Beginner';
          setFitnessLevel(level);
          setFocusPart(user.focusPart.toUpperCase());
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);

  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (userActivityData.length > 0) {
      setLoader(true);

      // Get the time based on fitness level
      const workoutTime = FITNESS_LEVEL_TIMES[fitnessLevel] || 30; // Default to 30 mins

      let updatedData = userActivityData.map(item => ({
        ...item,
        status: item.statusCode == 3 ? 'completed' : 'locked',
        time: workoutTime, // Assigning workout time
      }));

      const firstActiveIndex = userActivityData.findIndex(
        item => item.statusCode == 1,
      );
      if (firstActiveIndex !== -1) {
        updatedData[firstActiveIndex] = {
          ...updatedData[firstActiveIndex],
          status: 'active',
        };
      }
      setWorkouts(updatedData);
      setLoader(false);
    } else {
      setWorkouts(userActivityData); // Default to static data if no user data
      setLoader(false);
    }
  }, [userActivityData, fitnessLevel]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Image
          source={require('../assets/focus_part/full_body.jpg')}
          style={styles.headerImage}
        />
        <View style={styles.headerOverlay}>
          <Text style={styles.title}>{focusPart}</Text>
          <Text style={styles.title}>Fit Level : {fitnessLevel}</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.title}>{firstInactiveDay}/30</Text>
            <Text style={styles.details}>Days Finished</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar} />
          </View>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={workouts}
          keyExtractor={item => item.day.toString()}
          renderItem={({item}) => (
            <View style={styles.dayContainer}>
              <View style={styles.dayColumn}>
                <Text style={styles.dayText}>DAY</Text>
                <Text style={styles.dayNumber}>{item.day}</Text>
              </View>
              <View style={styles.timeContainer}>
                <MaterialIcons name="timer" size={20} color="white" />
                <Text style={styles.timeText}> {item.time}</Text>
              </View>
              <View style={styles.actionContainer}>
                {item.status === 'completed' ? (
                  <MaterialIcons name="check-circle" size={24} color="green" />
                ) : item.status === 'active' ? (
                  <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => {
                      const selectedActivity = userActivityData.find(
                        ua => ua.day == item.day,
                      );
                      navigation.navigate('PlanDetail', {
                        day: item.day,
                        time: item.time,
                        activityData: selectedActivity,
                      });
                    }}>
                    <Text style={styles.startButtonText}>START</Text>
                  </TouchableOpacity>
                ) : (
                  <MaterialIcons name="lock" size={24} color="gray" />
                )}
              </View>
            </View>
          )}
        />
      </View>
      <Modal visible={loader} transparent>
        <Loader />
      </Modal>
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
  header: {position: 'relative', height: 250},
  headerImage: {width: '100%', height: '100%', position: 'absolute'},
  headerOverlay: {position: 'absolute', bottom: 20, left: 20},
  title: {fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 5},
  details: {fontSize: 14, color: '#c5c7c5', marginLeft: 10, marginTop: 5},
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  progressBarContainer: {
    width: '50%',
    height: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginBottom: 16,
  },
  progressBar: {
    width: '20%',
    height: 10,
    backgroundColor: '#fc5549',
    borderRadius: 5,
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
    padding: 16,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  dayText: {color: 'white', fontSize: 14},
  dayNumber: {color: 'white', fontSize: 24, fontWeight: 'bold'},
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  timeText: {color: 'white', fontSize: 16, marginLeft: 5},
  actionContainer: {
    alignItems: 'center',
    width: 80,
  },
  startButton: {
    backgroundColor: '#fc5549',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  startButtonText: {color: 'white', fontWeight: 'bold'},
});

export default PlanScreen;

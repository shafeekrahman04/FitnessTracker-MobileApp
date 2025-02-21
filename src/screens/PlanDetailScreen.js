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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome6';
import Loader from '../shared/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateUserActivityStatus} from '../api/UserActivityApiService';
import AlertMessage from '../shared/AlertMessage';
import {alertMessageType} from '../utilities/enum/Enum';

const foodImages = [
  require('../assets/diet_food/deitFood.jpg'),
  require('../assets/diet_food/dietFood2.jpg'),
  require('../assets/diet_food/dietFood3.jpg'),
  require('../assets/diet_food/dietFood4.jpg'),
  require('../assets/diet_food/dietFood5.jpg'),
  require('../assets/diet_food/dietFood6.jpg'),
  require('../assets/diet_food/dietFood7.jpg'),
  require('../assets/diet_food/dietFood8.jpg'),
  require('../assets/diet_food/dietFood9.jpg'),
  require('../assets/diet_food/dietFood10.jpg'),
];

const FITNESS_LEVELS = {
  1: 'Beginner',
  2: 'Novice',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};

const PlanDetailScreen = ({navigation, route}) => {
  const {activityData, day, time} = route.params;

  const [selectedTab, setSelectedTab] = useState('exercise');
  const [exerciseData, setExerciseData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [fitnessLevel, setFitnessLevel] = useState('Beginner');
  const [focusPart, setFocusPart] = useState('Full Body');
  const [times, setTime] = useState('15 min');
  const [calories, setCalories] = useState('150 Cal');
  const [loader, setLoader] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    timestamp: Date.now(),
  });
  const [alertType, setAlertType] = useState('');
  const alertMessagePopUp = (message, messageType) => {
    setAlertMessage({message: message, timestamp: new Date()});
    setAlertType(messageType);
  };
  // Set exercise and meal data from activityData
  useEffect(() => {
    const {exercises, foodItems} = activityData;

    setExerciseData(exercises);
    setMealData(foodItems);
  }, [activityData]);

  // Use AsyncStorage to retrieve user data
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

  const submit = async () => {
    setLoader(true);
    try {
      const res = await updateUserActivityStatus(activityData.id);
      const data = res.data;
      setLoader(false);
      alertMessagePopUp('Updated Successfully', alertMessageType.SUCCESS.code);
      setTimeout(() => {
        navigation.replace('HomeTab');
      }, 500);
    } catch (error) {
      setLoader(false);
      alertMessagePopUp(
        'Failed to update details',
        alertMessageType.DANGER.code,
      );
      console.error('Failed to update details:', error);
    }
  };
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
          <Text style={styles.title}>Fit Level: {fitnessLevel}</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.title}>{day}/30</Text>
            <Text style={styles.details}>Days Finished</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar} />
          </View>
        </View>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'exercise' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('exercise')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'exercise' && styles.activeTabText,
            ]}>
            Exercise
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'food' && styles.activeTab]}
          onPress={() => setSelectedTab('food')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'food' && styles.activeTabText,
            ]}>
            Food
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'exercise' && (
        <View style={styles.heade}>
          <Text style={styles.title}>Fitness Level : {fitnessLevel}</Text>
          <Text style={styles.details}>
            ⏱ {times} 🔥 {calories} 🏋️ No equipment
          </Text>
        </View>
      )}

      {/* Conditionally Render Exercise or Food List */}
      {selectedTab === 'exercise' ? (
        <View style={styles.listContainer}>
          <FlatList
            data={exerciseData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.exerciseItem}>
                <Image
                  source={require('../assets/avatar.jpg')}
                  style={styles.exerciseImage}
                />
                <View>
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <Text style={styles.exerciseDetails}>{item.bodyPart}</Text>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={styles.foodContainer}>
          <FlatList
            data={mealData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                <Image
                  source={
                    foodImages[Math.floor(Math.random() * foodImages.length)]
                  }
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemSubText}>
                    Calories: {item.calories} kcal
                  </Text>
                  <Text style={styles.itemSubText}>
                    Protein: {item.protein}g | Carbs: {item.carbs}g | Fats:{' '}
                    {item.fats}g
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      )}

      {selectedTab === 'food' && (
        <TouchableOpacity style={styles.nextButton} onPress={submit}>
          <Text style={styles.nextButtonText}>Finish</Text>
        </TouchableOpacity>
      )}
      <AlertMessage message={alertMessage} messageType={alertType} />
      {/* loader */}
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
    zIndex: 10,
  },
  header: {position: 'relative', height: 250},
  headerImage: {width: '100%', height: '100%', position: 'absolute'},
  headerOverlay: {position: 'absolute', bottom: 20, left: 20},
  title: {fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 5},
  details: {fontSize: 14, color: '#c5c7c5', marginLeft: 10, marginTop: 5},
  progressContainer: {flexDirection: 'row', marginBottom: 8},
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginBottom: 16,
  },
  progressBar: {
    width: '30%',
    height: 10,
    backgroundColor: '#fc5549',
    borderRadius: 5,
  },

  // Tab Styles
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fc5549',
  },
  tabText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: 'white',
  },

  // Exercise List Styles
  listContainer: {marginTop: 20, padding: 16},
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  dayColumn: {alignItems: 'center', justifyContent: 'center', width: 50},
  dayText: {color: 'white', fontSize: 14},
  dayNumber: {color: 'white', fontSize: 24, fontWeight: 'bold'},
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  timeText: {color: 'white', fontSize: 16, marginLeft: 5},
  actionContainer: {alignItems: 'center', width: 80},
  startButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  startButtonText: {color: 'white', fontWeight: 'bold'},

  // Food List Styles
  foodContainer: {marginTop: 5, padding: 16},
  foodItem: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  foodTitle: {color: 'white', fontSize: 18, fontWeight: 'bold'},
  foodName: {color: 'white', fontSize: 16},
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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333', // Dark card background
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSubText: {
    color: 'lightgray',
    fontSize: 14,
  },
  heade: {
    paddingHorizontal: 10,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20, // Adjust the position
    left: 20,
    right: 20,
    backgroundColor: '#fc5549',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10, // Make sure it's above the list
  },

  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlanDetailScreen;

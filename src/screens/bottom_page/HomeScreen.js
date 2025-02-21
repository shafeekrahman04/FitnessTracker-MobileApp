import AsyncStorage from '@react-native-async-storage/async-storage';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Calendar} from 'react-native-calendars';
import {getUserActivity} from '../../api/UserActivityApiService';
import Loader from '../../shared/Loader';

const FITNESS_LEVELS = {
  1: 'Beginner',
  2: 'Novice',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};

const HomeScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userActivityData, setUserActivityData] = useState([]);
  const [fitnessLevel, setFitnessLevel] = useState('Beginner');
  const [focusPart, setFocusPart] = useState('Full Body');
  const [firstInactiveDay, setFirstInactiveDay] = useState(null);
  const [completedDays, setCompletedDays] = useState({});

  const getUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('appUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserData(user);
        setFitnessLevel(FITNESS_LEVELS[user?.fitnessLevel] || 'Beginner');
        setFocusPart(
          user.focusPart ? user.focusPart.toUpperCase() : 'FULL BODY',
        );
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  useEffect(() => {
    getUserActivityData();
    getUserData();
  }, []);

  const getUserActivityData = async () => {
    setLoader(true);
    try {
      const storedUser = await AsyncStorage.getItem('appUser');
      const user = JSON.parse(storedUser);
      const res = await getUserActivity(user.id);
      if (res && res.data) {
        setUserActivityData(res.data.data);
        processActivityData(res.data.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error('Error retrieving user data:', error);
    }
  };
  const processActivityData = data => {
    let firstInactive = null;
    let completedDates = {};

    data.forEach(item => {
      const formattedDate = `${item.date[0]}-${String(item.date[1]).padStart(
        2,
        '0',
      )}-${String(item.date[2]).padStart(2, '0')}`;

      if (item.statusCode == 3) {
        completedDates[formattedDate] = {
          selected: true, // Fully highlight the date
          selectedColor: 'green', // Circle in green
        };
      }

      if (item.statusCode == 1 && firstInactive === null) {
        firstInactive = item.day;
      }
    });

    setFirstInactiveDay(firstInactive);
    setCompletedDays(completedDates);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>HOME</Text>
        <View style={styles.headerIcons}>
          <FontAwesome5 name="fire" size={24} color="#fc5549" />
          <FontAwesome5
            name="search"
            size={24}
            color="white"
            style={{marginLeft: 15}}
          />
        </View>
      </View>

      {/* In Progress Section */}
      <Text style={styles.sectionTitle}>IN PROGRESS</Text>
      <View style={styles.inProgressCard}>
        <Image
          source={require('../../assets/home/home-ban.jpg')}
          style={styles.inProgressImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.levelTag}>{fitnessLevel}</Text>
          <Text style={styles.workoutTitle}>{focusPart}</Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              navigation.navigate('Plan', {
                userActivityData: userActivityData,
                firstInactiveDay: firstInactiveDay,
              });
            }}>
            <Text style={styles.startButtonText}>
              DAY {firstInactiveDay} · START
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendar */}
      <View style={styles.CalendarContainer}>
        <Calendar
          current={'2025-02-01'}
          theme={{
            backgroundColor: '#181818',
            calendarBackground: '#181818',
            textSectionTitleColor: '#fff',
            selectedDayBackgroundColor: '#E53935',
            selectedDayTextColor: '#fff',
            todayTextColor: '#E53935',
            dayTextColor: '#fff',
            monthTextColor: '#fff',
            arrowColor: '#fff',
            textDisabledColor: '#555',
          }}
          markedDates={{
            ...completedDays, // Fully highlight completed days in green
          }}
        />
      </View>
      <Modal visible={loader} transparent>
        <Loader />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212', padding: 10},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {color: 'white', fontSize: 22, fontWeight: 'bold'},
  headerIcons: {flexDirection: 'row', alignItems: 'center'},
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  // In Progress Card
  inProgressCard: {
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  inProgressImage: {width: '100%', height: 200},
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 15,
    justifyContent: 'flex-end',
  },
  levelTag: {
    backgroundColor: '#fc5549',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontWeight: 'bold',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  workoutTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  startButton: {
    backgroundColor: '#fc5549',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  startButtonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},

  CalendarContainer: {
    marginTop: 20,
    backgroundColor: '#757474',
    borderRadius: 10,
    padding: 10,
  },
});

export default HomeScreen;

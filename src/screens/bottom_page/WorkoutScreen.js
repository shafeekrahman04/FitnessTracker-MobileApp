import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getExerciseData} from '../../api/ExerciseApiService';
import Loader from '../../shared/Loader';

const workouts = [
  {id: '1', title: 'ABS', image: require('../../assets/focus_part/abs.jpg')},
  {
    id: '2',
    title: 'CHEST',
    image: require('../../assets/focus_part/chest.jpg'),
  },
  {id: '3', title: 'ARMS', image: require('../../assets/focus_part/arm.jpg')},
  {id: '4', title: 'LEGS', image: require('../../assets/focus_part/leg.jpg')},
  {
    id: '5',
    title: 'BACK',
    image: require('../../assets/focus_part/full_body.jpg'),
  },
];
const WorkoutScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Classic');
  const [loader, setLoader] = useState(false);
  const [exerciseData, setExerciseData] = useState([]);

  const ExerciseData = async () => {
    setLoader(true);
    try {
      const res = await getExerciseData();
      const data = res.data;
      setExerciseData(data.data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error('Failed to fetch data details:', error);
    }
  };
  useEffect(() => {
    ExerciseData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WORKOUTS</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={24} color="white" />
          <Ionicons
            name="menu"
            size={24}
            color="white"
            style={{marginLeft: 15}}
          />
        </View>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          data={workouts}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const selectedExercises = exerciseData.filter(
              exercise =>
                exercise.bodyPart.toLowerCase() === item.title.toLowerCase(),
            );
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate('ExerciseScreen', {
                    exercises: selectedExercises,
                    title: item.title,
                  })
                }>
                <ImageBackground
                  source={item.image}
                  style={styles.image}
                  imageStyle={{borderRadius: 10}}>
                  <View style={styles.overlay} />
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.workoutCount}>
                    {selectedExercises.length} Workouts
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Modal visible={loader} transparent>
        <Loader />
      </Modal>
    </View>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212'},

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {color: 'white', fontSize: 20, fontWeight: 'bold'},
  headerIcons: {flexDirection: 'row'},

  cardContainer: {marginTop: 15},
  card: {
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 120,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
  },
  title: {color: 'white', fontSize: 18, fontWeight: 'bold'},
  workoutCount: {color: 'white', fontSize: 14, fontWeight: '400'},
});

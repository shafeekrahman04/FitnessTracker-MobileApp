import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const exercises = [
  {
    id: '1',
    name: 'Jumping Jacks',
    detail: '00:30',
    image: require('.././assets/avatar.jpg'),
  },
  {
    id: '2',
    name: 'Abdominal Crunches',
    detail: '16 reps',
    image: require('.././assets/avatar.jpg'),
  },
  {
    id: '3',
    name: 'Russian Twist',
    detail: '20 reps',
    image: require('.././assets/avatar.jpg'),
  },
  {
    id: '4',
    name: 'Mountain Climber',
    detail: '16 reps',
    image: require('.././assets/avatar.jpg'),
  },
  {
    id: '5',
    name: 'Heel Touch',
    detail: '20 reps',
    image: require('.././assets/avatar.jpg'),
  },
  {
    id: '6',
    name: 'Leg Raises',
    detail: '16 reps',
    image: require('.././assets/avatar.jpg'),
  },
];

const ExerciseScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CLASSIC ABS • BEGINNER</Text>
        <Text style={styles.subText}>⏳ 15 min 🔥 151 Cal</Text>
        <Text style={styles.subText}>🛠️ No equipment</Text>
      </View>

      <Text style={styles.sectionTitle}>16 Exercises</Text>

      <FlatList
        data={exercises}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.exerciseItem}>
            {/* <Image source={item.image} style={styles.exerciseImage} /> */}
            <View>
              <Text style={styles.exerciseTitle}>{item.name}</Text>
              <Text style={styles.exerciseDetail}>{item.detail}</Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#111', padding: 20},
  header: {marginBottom: 20},
  title: {fontSize: 22, fontWeight: 'bold', color: '#fff'},
  subText: {fontSize: 14, color: '#bbb', marginVertical: 2},
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  exerciseImage: {width: 50, height: 50, marginRight: 15},
  exerciseTitle: {fontSize: 16, fontWeight: 'bold', color: '#fff'},
  exerciseDetail: {fontSize: 14, color: '#aaa'},
  startButton: {
    backgroundColor: '#E63946',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});

export default ExerciseScreen;

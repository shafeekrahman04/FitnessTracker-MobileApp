import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const workoutPlans = [
  {
    id: '1',
    title: 'Full Body Shred',
    level: 'LEVEL 3',
    buttonText: 'DAY 1 · START',
    image: require('../../assets/home/home-ban.jpg'),
    isInProgress: true,
  },
  {
    id: '2',
    title: 'Immune System Booster',
    level: '3 levels · 7-15 min',
    image: require('../../assets/home/home-ban.jpg'),
    isFree: true,
  },
  {
    id: '3',
    title: 'ABS Blaster',
    level: '3 levels · 13-30 min',
    image: require('../../assets/home/home-ban.jpg'),
    isFree: true,
  },
];

const PlanScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>PLAN</Text>
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
        <Image source={workoutPlans[0].image} style={styles.inProgressImage} />
        <View style={styles.overlay}>
          <Text style={styles.levelTag}>{workoutPlans[0].level}</Text>
          <Text style={styles.workoutTitle}>{workoutPlans[0].title}</Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>
              {workoutPlans[0].buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* All Plans Section */}
      <Text style={styles.sectionTitle}>All Plans</Text>
      <FlatList
        data={workoutPlans.slice(1)}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.planCard}>
            <Image source={item.image} style={styles.planImage} />
            <View style={styles.planOverlay}>
              {item.isFree && <Text style={styles.freeBadge}>FREE</Text>}
              <Text style={styles.planTitle}>{item.title}</Text>
              <Text style={styles.planLevel}>{item.level}</Text>
            </View>
          </View>
        )}
      />
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

  // All Plans
  planCard: {
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  planImage: {width: '100%', height: 120},
  planOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    justifyContent: 'space-between',
  },
  freeBadge: {
    backgroundColor: 'blue',
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  planTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  planLevel: {color: 'gray', fontSize: 14},
});

export default PlanScreen;

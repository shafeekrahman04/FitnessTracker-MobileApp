import React from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mealData = [
  {
    id: '1',
    name: 'Cabbage Salad with Peanuts',
    image: require('../../assets/focus_part/abs.jpg'),
  },
  {
    id: '2',
    name: 'Garlicky Pasta with Swiss Chard and Beans',
    image: require('../../assets/focus_part/abs.jpg'),
  },
  {
    id: '3',
    name: 'White Bean and Potato Tacos (Gluten Free and Vegan)',
    image: require('../../assets/focus_part/abs.jpg'),
  },
  {
    id: '4',
    name: 'Roasted Cauliflower Salad with Spicy Dressing',
    image: require('../../assets/focus_part/abs.jpg'),
  },
  {
    id: '5',
    name: 'Quinoa Tabbouleh Salad with Parsley and Mint (Gluten-Free, Vegan)',
    image: require('../../assets/focus_part/abs.jpg'),
  },
];

const DietScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header with Search Bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DEIT</Text>
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

      {/* Meal List */}
      <FlatList
        data={mealData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DietScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {color: 'white', fontSize: 20, fontWeight: 'bold'},
  headerIcons: {flexDirection: 'row'},
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
  itemText: {
    color: 'white',
    fontSize: 16,
    flexShrink: 1, // Prevents text overflow
  },
});

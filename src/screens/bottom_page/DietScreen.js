import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, StyleSheet, Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../../shared/Loader';
import {getMealItemData} from '../../api/MealItemService';

const foodImages = [
  require('../../assets/diet_food/deitFood.jpg'),
  require('../../assets/diet_food/dietFood2.jpg'),
  require('../../assets/diet_food/dietFood3.jpg'),
  require('../../assets/diet_food/dietFood4.jpg'),
  require('../../assets/diet_food/dietFood5.jpg'),
  require('../../assets/diet_food/dietFood6.jpg'),
  require('../../assets/diet_food/dietFood7.jpg'),
  require('../../assets/diet_food/dietFood8.jpg'),
  require('../../assets/diet_food/dietFood9.jpg'),
  require('../../assets/diet_food/dietFood10.jpg'),
];

const DietScreen = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [mealData, setMealData] = useState([]);

  const getMealData = async () => {
    setLoader(true);
    try {
      const res = await getMealItemData();
      const data = res.data;
      setMealData(data.data);
    } catch (error) {
      console.error('Failed to fetch data details:', error);
    }
    setLoader(false);
  };

  useEffect(() => {
    getMealData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with Search Bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DIET FOODS</Text>
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

      <Modal visible={loader} transparent>
        <Loader />
      </Modal>
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
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  cardContainer: {
    marginTop: 15,
  },
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
});

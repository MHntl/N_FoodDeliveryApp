import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Home/Header';
import MainCategories from '../components/Home/MainCategories';
import {DummyData} from '../constants/data';
import RestaurantList from '../constants/RestaurantList';

const Home = () => {
  const [categories, setCategories] = useState(DummyData.categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState(DummyData.restaurantData);
  const [currentLocation, setCurrentLocation] = useState(
    DummyData.initialCurrentLocation,
  );
  const AllProps = {
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    restaurants,
    setRestaurants,
    currentLocation,
    setCurrentLocation,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header AllProps={AllProps} />
      <MainCategories AllProps={AllProps} />
      <RestaurantList AllProps={AllProps} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

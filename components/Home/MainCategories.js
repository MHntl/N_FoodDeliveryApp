import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../../constants';
import {DummyData} from '../../constants/data';

const MainCategories = ({AllProps}) => {
  const {
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    restaurants,
    setRestaurants,
    currentLocation,
    setCurrentLocation,
  } = AllProps;

  const OnSelectCategory = category => {
    const restaurantList = DummyData.restaurantData.filter(item =>
      item.categories.includes(category.item.id),
    );
    setRestaurants(restaurantList);
    setSelectedCategory(category);
  };

  return (
    <View style={{padding: SIZES.padding * 2}}>
      <Text style={{fontSize: 24, fontWeight: 'bold'}}>Main</Text>
      <Text style={{fontSize: 24, fontWeight: 'bold'}}>Categories</Text>
      <FlatList
        data={DummyData.categoryData}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={item => (
          <TouchableOpacity
            onPress={() => OnSelectCategory(item)}
            style={{
              marginBottom: 5,
              padding: SIZES.padding,
              paddingBottom: SIZES.padding * 2,
              backgroundColor:
                selectedCategory?.item?.id === item.item.id
                  ? COLORS.primary
                  : COLORS.white,
              borderRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: SIZES.padding,
              shadowColor: '#171717',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  selectedCategory?.item?.id === item.item.id
                    ? COLORS.white
                    : COLORS.lightGray,
              }}>
              <Image
                source={item.item.icon}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                marginTop: SIZES.padding,
                color:
                  selectedCategory?.item?.id === item.item.id
                    ? COLORS.white
                    : COLORS.black,
              }}>
              {item.item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MainCategories;

const styles = StyleSheet.create({});

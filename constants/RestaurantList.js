import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, icons} from '.';
import {useNavigation} from '@react-navigation/native';

const RestaurantList = ({AllProps}) => {
  const navigation = useNavigation();
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

  const getCategoryNameById = ids => {
    const categoryNames = ids.map(id => {
      const category = categories.find(item => item.id === id);
      return category ? category.name : null;
    });
    const name = categoryNames.filter(name => name !== null);
    return name + '';
  };

  return (
    <FlatList
      data={restaurants}
      keyExtractor={item => `${item.id}`}
      contentContainerStyle={{
        paddingHorizontal: SIZES.padding * 2,
        paddingBottom: 30,
      }}
      renderItem={item => (
        <TouchableOpacity
          style={{marginBottom: SIZES.padding * 2}}
          onPress={() =>
            navigation.navigate('Restaurant', {item, currentLocation})
          }>
          {/* Image Section */}
          <View style={{marginBottom: SIZES.padding}}>
            <Image
              source={item.item.photo}
              resizeMode="cover"
              style={{width: '100%', height: 200, borderRadius: SIZES.radius}}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}>
              <Text style={{fontWeight: 'bold'}}>{item.item.duration}</Text>
            </View>
          </View>
          {/* Restaurant Info Section */}
          <Text style={FONTS.body2}>{item.item.name}</Text>
          <View style={{flexDirection: 'row', marginTop: SIZES.padding}}>
            {/* Rating */}
            <Image
              source={icons.star}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.primary,
                marginRight: 10,
              }}
            />
            <Text style={FONTS.body3}>{item.item.rating}</Text>
          </View>
          {/* Categories */}
          <View style={{flexDirection: 'row', marginLeft: 10}}>
            <View style={{flexDirection: 'row'}} key={item.index}>
              <Text style={FONTS.body3}>
                {getCategoryNameById(item.item.categories)}
              </Text>
              {/* Price */}
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 3,
                  marginLeft: 10,
                }}>
                {item.item.priceRating === 3 ? (
                  <Text style={{color: 'black'}}>$$$</Text>
                ) : item.item.priceRating === 2 ? (
                  <Text style={{color: 'black'}}>
                    $$<Text style={{color: 'gray'}}>$</Text>
                  </Text>
                ) : (
                  <Text style={{color: 'black'}}>
                    $<Text style={{color: 'gray'}}>$$</Text>
                  </Text>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default RestaurantList;

const styles = StyleSheet.create({});

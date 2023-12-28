import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {Restaurant} from '../../screens';

const Header = ({AllProps}) => {
  const navigation = useNavigation();
  const {
    setOrderItems,
    orderItems,
    editOrder,
    getOrderQty,
    getBasketItemCount,
    sumOrder,
    restaurant,
    setRestaurant,
    currentLocation,
    setCurrentLocation,
  } = AllProps;

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 50,
          paddingLeft: SIZES.padding * 2,
          justifyContent: 'center',
        }}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
      {/* Restaurant Name Section */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: SIZES.padding * 3,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray3,
          }}>
          <Text style={FONTS.h3}>{restaurant?.item.name}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 50,
          paddingRight: SIZES.padding * 2,
          justifyContent: 'center',
        }}>
        <Image
          source={icons.list}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const Order = ({AllProps}) => {
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
    <View
      style={{
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: SIZES.padding * 2,
          paddingHorizontal: SIZES.padding * 3,
          borderColor: COLORS.lightGray2,
          borderWidth: 1,
        }}>
        <Text style={[FONTS.h3]}>
          <Text style={{color: COLORS.primary}}>{getBasketItemCount()}</Text>{' '}
          items in cart
        </Text>
        <Text style={FONTS.h3}>$45</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: SIZES.padding * 2,
          paddingHorizontal: SIZES.padding * 3,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={icons.pin}
            style={{width: 20, height: 20, tintColor: COLORS.darkgray}}
            resizeMode="contain"
          />
          <Text style={[FONTS.h4, {marginLeft: SIZES.padding}]}>Location</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={icons.master_card}
            resizeMode="contain"
            style={{width: 20, height: 20, tintColor: COLORS.darkgray}}
          />
          <Text style={[FONTS.h4, {marginLeft: SIZES.padding}]}>8888 </Text>
        </View>
      </View>
      {/* Order Button */}
      <View
        style={{
          padding: SIZES.padding * 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OrderDelivery', {
              restaurant: restaurant,
              currentLocation: currentLocation,
            })
          }
          style={{
            width: SIZES.width * 0.9,
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            borderRadius: SIZES.radius,
          }}>
          <Text style={[FONTS.h3, {color: COLORS.white}]}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({});

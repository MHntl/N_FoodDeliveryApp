import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {ExpandingDot} from 'react-native-animated-pagination-dots';

const FoodInfo = ({AllProps}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
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
  const data = restaurant?.item.menu.length;
  const editData = new Array(data)
    .fill(null)
    .map((_, index) => ({key: index + 1}));
  return (
    <View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}>
        {restaurant?.item.menu.map((item, index) => (
          <View key={`menu${index}`} style={{alignItems: 'center'}}>
            <View style={{height: SIZES.height * 0.35}}>
              {/* Food Image */}
              <Image
                source={item.photo}
                resizeMode="contain"
                style={{height: '100%', width: SIZES.width}}
              />
              {/* Quantity */}
              <View
                style={{
                  position: 'absolute',
                  bottom: -20,
                  width: SIZES.width,
                  height: 50,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => editOrder('-', item.menuId, item.price)}
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}>
                  <Text style={FONTS.body1}>-</Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={FONTS.h2}>{getOrderQty(item.menuId)}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => editOrder('+', item.menuId, item.price)}
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                  }}>
                  <Text style={FONTS.body1}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Name-Description */}
            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 25,
                paddingHorizontal: SIZES.padding * 2,
              }}>
              <Text
                style={[FONTS.h2, {marginVertical: 10, textAlign: 'center'}]}>
                {item.name}-{item.price.toFixed(2)}
              </Text>
              <Text style={FONTS.body3}>{item.description}</Text>
            </View>
            {/* Calories */}
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Image
                source={icons.fire}
                style={{height: 20, width: 20, marginRight: 10}}
              />
              <Text style={[FONTS.body3, {color: COLORS.darkgray}]}>
                {item.calories.toFixed(2)} cal
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      <ExpandingDot
        data={editData}
        expandingDotWidth={30}
        scrollX={scrollX}
        inActiveDotOpacity={0.6}
        dotStyle={{
          width: 10,
          height: 10,
          backgroundColor: COLORS.primary,
          borderRadius: 5,
          marginHorizontal: 5,
        }}
        containerStyle={{
          position: 'absolute',
          bottom: -9,
        }}
      />
    </View>
  );
};

export default FoodInfo;

const styles = StyleSheet.create({});

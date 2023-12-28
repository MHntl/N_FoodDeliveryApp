import {Animated, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants';
const scrollX = new Animated.Value(0);
export const Dots = ({dotPosition, restaurant}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: SIZES.padding,
      }}>
      {restaurant?.menu.map(() => {
        const opacity = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        const dotSize = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
          extrapolate: 'clamp',
        });
        const dotColor = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`dot${index}`}
            opacity={opacity}
            style={{
              borderRadius: SIZES.radius,
              marginHorizontal: 6,
              width: dotSize,
              height: dotSize,
              backgroundColor: dotColor,
            }}
          />
        );
      })}
    </View>
  );
};

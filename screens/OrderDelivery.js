import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OrderMap from '../components/OrderDelivery/OrderMap';

const OrderDelivery = ({route, navigation}) => {
  let {restaurant, currentLocation} = route.params;
  const params = {restaurant, currentLocation};

  return (
    <View style={{flex: 1}}>
      <OrderMap params={params} />
    </View>
  );
};

export default OrderDelivery;

const styles = StyleSheet.create({});

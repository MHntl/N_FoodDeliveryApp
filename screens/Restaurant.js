import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../constants';
import Header from '../components/Restaurant/Header';
import FoodInfo from '../components/Restaurant/FoodInfo';
import Order from '../components/Restaurant/Order';

const Restaurant = ({route}) => {
  const [restaurant, setRestaurant] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [orderItems, setOrderItems] = useState([]);
  //==========
  useEffect(() => {
    const {item, currentLocation} = route.params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, []);
  //==========
  function editOrder(action, menuId, price) {
    let orderList = orderItems.slice();
    let item = orderList.filter(a => a.menuId == menuId);
    if (action == '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }
      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }

      setOrderItems(orderList);
    }
  }
  //==========
  function getOrderQty(menuId) {
    let orderItem = orderItems.filter(a => a.menuId == menuId);
    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0;
  }
  //==========
  function getBasketItemCount() {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return itemCount;
  }
  //==========
  function sumOrder() {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return total.toFixed(2);
  }
  const AllProps = {
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Header AllProps={AllProps} />
        <FoodInfo AllProps={AllProps} />
      </>
      <Order AllProps={AllProps} />
    </SafeAreaView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
    justifyContent: 'space-between',
  },
});

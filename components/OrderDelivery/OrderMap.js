import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, GOOGLE_API_KEY, SIZES, icons} from '../../constants';
import MapViewDirections from 'react-native-maps-directions';
const {width, height} = Dimensions.get('window');

const OrderMap = ({params}) => {
  const navigation = useNavigation();
  const mapView = useRef();

  const [restaurant, setRestaurant] = useState(null);
  const [streetName, setStreetName] = useState('');
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let fromLoc = params?.currentLocation.gps;
    let toLoc = params?.restaurant.item.location;
    let street = params?.currentLocation.streetName;
    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };
    setRestaurant(params?.restaurant?.item);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        style={[
          {
            height: height,
            width: width,
            justifyContent: 'flex-end',
            alignItems: 'center',
          },
        ]}>
        <MapViewDirections
          ref={mapView}
          strokeColor={COLORS.primary}
          strokeWidth={5}
          optimizeWaypoints
          onReady={result => {
            setDuration(result.duration);
          }}
          destination={toLocation}
          origin={fromLocation}
          apikey={GOOGLE_API_KEY}
        />
        {/*Destination MARKER */}
        <Marker coordinate={toLocation}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.white,
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
              }}>
              <Image
                source={icons.pin}
                style={{width: 25, height: 25, tintColor: COLORS.white}}
              />
            </View>
          </View>
        </Marker>
        {/*Icon */}
        <Marker
          // rotation={angle}
          flat
          coordinate={fromLocation}
          anchor={{x: 0.5, y: 0.5}}>
          {/* <Image source={icons.car} style={{width: 40, height: 40}} /> */}
        </Marker>
      </MapView>
      {/* HEADER */}
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          <Image
            source={icons.red_pin}
            style={{
              width: 30,
              height: 30,
              marginRight: SIZES.padding,
            }}
          />
          <View style={{flex: 1}}>
            <Text style={[FONTS.body3]}>{streetName}</Text>
          </View>
          <Text style={[FONTS.body3]}>{Math.ceil(duration)} mins</Text>
        </View>
      </View>
      {/* DELIVERY */}
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding * 3,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* Avatar */}
            <Image
              source={restaurant?.courier.avatar}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />
            <View style={{flex: 1, marginLeft: SIZES.padding}}>
              {/* Name & Rating */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[FONTS.h4]}>{restaurant?.courier.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={icons.star}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: COLORS.primary,
                      marginRight: SIZES.padding,
                    }}
                  />
                  <Text style={[FONTS.body3]}>{restaurant?.rating}</Text>
                </View>
              </View>
              {/* Restaurant */}
              <Text style={[{color: COLORS.darkgray}, FONTS.body4]}>
                {restaurant?.name}
              </Text>
            </View>
          </View>
          {/* Buttons */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding * 2,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                marginRight: 10,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate('Home')}>
              <Text style={[FONTS.h4, {color: COLORS.white}]}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                backgroundColor: COLORS.secondary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => navigation.goBack()}>
              <Text style={[FONTS.h4, {color: COLORS.white}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderMap;

const styles = StyleSheet.create({});

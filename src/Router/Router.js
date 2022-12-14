import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Player from '../screens/Player';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Player" component={Player} />
    </Stack.Navigator>
  );
};

export default Router;

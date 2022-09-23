import React from 'react';
import {View, Text} from 'react-native';
import Config from 'react-native-config';

const Home = () => {
  console.log(Config.API_URL);
  return (
    <View>
      <Text style={{color: '#000'}}>Home</Text>
    </View>
  );
};

export default Home;

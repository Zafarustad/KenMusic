import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const Error = () => (
  <View style={styles.container}>
    <Text style={{color: 'red'}}>Something went wrong!</Text>
  </View>
);

export default Error;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#1C1B1B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

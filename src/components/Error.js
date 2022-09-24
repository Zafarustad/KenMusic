import React from 'react';
import {View, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/responsive';

const Error = () => (
  <View style={styles.container}>
    <Text style={{color: 'red'}}>Something went wrong!</Text>
  </View>
);

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1B1B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

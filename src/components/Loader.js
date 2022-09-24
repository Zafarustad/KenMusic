import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/responsive';

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator color="#1ED760" size={50} animating={true} />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1B1B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

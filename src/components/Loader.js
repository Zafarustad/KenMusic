import React from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator color="#1ED760" size={50} animating={true} />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#1C1B1B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

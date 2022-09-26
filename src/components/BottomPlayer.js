import React from 'react';
import {View, StyleSheet} from 'react-native';
import {windowWidth, windowHeight} from '../utils/responsive';
import Controls from './Player/Controls';
import {useSelector} from 'react-redux';

const BottomPlayer = () => {
  const {playerInit} = useSelector(state => state.player);

  return (
    playerInit && (
      <View style={styles.container}>
        <Controls />
      </View>
    )
  );
};

export default BottomPlayer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    width: windowWidth,
    height: windowHeight * 0.07,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    elevation: 6,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

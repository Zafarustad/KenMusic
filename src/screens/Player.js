import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {windowHeight, windowWidth} from '../utils/responsive';
import {useSelector, useDispatch} from 'react-redux';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {useRoute} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import {secondsToHHMMSS} from '../utils/function';
import {
  initPlayer,
  setTrackIndex,
  togglePlayPause,
} from '../reducers/playerSlice';
import Controls from '../components/Player/Controls';

const Player = () => {
  const {tracks, currIdx} = useSelector(state => state.player);
  const {position} = useProgress();
  const route = useRoute();
  const dispatch = useDispatch();
  const id = route?.params?.id;
  const albumId = route?.params?.albumId;

  useEffect(() => {
    startPlayback();
  }, []);

  const startPlayback = async () => {
    try {
      const index = tracks.findIndex(track => track.id === id);
      dispatch(setTrackIndex(index));
      dispatch(initPlayer());
      await TrackPlayer.reset();
      await TrackPlayer.add(tracks);
      await TrackPlayer.skip(index, 0);
      await TrackPlayer.setVolume(0.5);
      await TrackPlayer.play();
      dispatch(togglePlayPause(true));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://api.napster.com/imageserver/v2/albums/${albumId}/images/500x500.jpg`,
        }}
        resizeMode="contain"
        style={styles.cover}
      />
      <Text style={{marginTop: 15, color: '#FFFFFF', fontSize: 15}}>
        {tracks.filter((_, idx) => idx === currIdx).map(track => track.title)}
      </Text>
      <View style={styles.progressBar}>
        <Text style={{textAlign: 'center'}}>
          {secondsToHHMMSS(Math.floor(position || 0))}
        </Text>
        <Slider
          style={{width: '70%', height: 40}}
          minimumValue={0}
          maximumValue={30}
          minimumTrackTintColor="#DDDDDD"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#1ED760"
          value={position}
          onSlidingComplete={async value => await TrackPlayer.seekTo(value)}
        />
      </View>
      <Controls />
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#1C1B1B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    width: windowWidth * 0.6,
    height: 300,
    borderRadius: 7,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

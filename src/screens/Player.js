import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {windowHeight, windowWidth} from '../utils/responsive';
import {useSelector} from 'react-redux';
import TrackPlayer, {State, useProgress} from 'react-native-track-player';
import {useRoute} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  FastForward,
} from 'react-native-feather';
import {secondsToHHMMSS} from '../utils/function';

const Player = () => {
  const [playing, setPlaying] = useState(false);
  const {tracks} = useSelector(state => state.player);
  const {position} = useProgress();
  const route = useRoute();
  const id = route?.params?.id;

  useEffect(() => {
    startPlayback();
  }, []);

  const startPlayback = async () => {
    try {
      const index = tracks.findIndex(track => track.id === id);
      await TrackPlayer.reset();
      await TrackPlayer.add(tracks);
      await TrackPlayer.skip(index, 0);
      await TrackPlayer.play();
      setPlaying(true);
    } catch (err) {
      console.log(err);
    }
  };

  const togglePlayback = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      TrackPlayer.pause();
      setPlaying(false);
    } else {
      TrackPlayer.play();
      setPlaying(true);
    }
  };

  const playNextTrack = async () => {
    const currIndex = await TrackPlayer.getCurrentTrack();
    if (currIndex < tracks.length - 1) {
      TrackPlayer.skipToNext();
    }
  };

  const playPreTrack = async () => {
    const currIndex = await TrackPlayer.getCurrentTrack();
    if (currIndex > 0) {
      TrackPlayer.skipToPrevious();
    }
  };

  return (
    <View style={styles.container}>
      <Text>{secondsToHHMMSS(Math.floor(position || 0))}</Text>
      <Slider
        style={{width: '70%', height: 40}}
        minimumValue={0}
        maximumValue={30}
        minimumTrackTintColor="#DDDDDD"
        maximumTrackTintColor="#FFFFFF"
        thumbTintColor="#1ED760"
        value={position}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.actions}
          activeOpacity={0.6}
          onPress={playPreTrack}>
          <SkipBack fill="#1C1B1B" stroke="#FFFFFF" width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actions}
          onPress={togglePlayback}
          activeOpacity={0.6}>
          {playing ? (
            <Pause fill="#1C1B1B" stroke="#FFFFFF" width={20} height={20} />
          ) : (
            <Play fill="#1C1B1B" stroke="#FFFFFF" width={20} height={20} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actions}
          activeOpacity={0.6}
          onPress={playNextTrack}>
          <SkipForward fill="#1C1B1B" stroke="#FFFFFF" width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await TrackPlayer.seekTo(position + 5);
          }}
          style={styles.actions}
          activeOpacity={0.6}>
          <FastForward fill="#1C1B1B" stroke="#FFFFFF" width={20} height={20} />
        </TouchableOpacity>
      </View>
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
  wrapper: {
    width: windowWidth * 0.9,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
});

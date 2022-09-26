import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import TrackPlayer, {
  State,
  useTrackPlayerEvents,
  Event,
  useProgress,
} from 'react-native-track-player';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  FastForward,
} from 'react-native-feather';
import {setTrackIndex, togglePlayPause} from '../../reducers/playerSlice';
import {windowWidth} from '../../utils/responsive';

const Controls = () => {
  const {tracks, currIdx, isPlaying} = useSelector(state => state.player);
  const dispatch = useDispatch();
  const {position} = useProgress();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async () => {
    const index = await TrackPlayer.getCurrentTrack();
    dispatch(setTrackIndex(index));
  });

  const togglePlayback = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      TrackPlayer.pause();
      dispatch(togglePlayPause(false));
    } else {
      TrackPlayer.play();
      dispatch(togglePlayPause(true));
    }
  };

  return (
    <View style={styles.controlsWrapper}>
      <TouchableOpacity
        style={styles.actions}
        disabled={currIdx === 0}
        activeOpacity={0.6}
        onPress={async () => await TrackPlayer.skipToPrevious()}>
        <SkipBack
          fill="#1C1B1B"
          stroke={currIdx === 0 ? '#8D8D8D' : '#FFFFFF'}
          width={20}
          height={20}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actions}
        onPress={togglePlayback}
        activeOpacity={0.6}>
        {isPlaying ? (
          <Pause fill="#1C1B1B" stroke="#FFFFFF" width={20} height={20} />
        ) : (
          <Play fill="#1C1B1B" stroke="#FFFFFF" width={20} height={20} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actions}
        disabled={currIdx === tracks.length - 1}
        activeOpacity={0.6}
        onPress={async () => await TrackPlayer.skipToNext()}>
        <SkipForward
          fill="#1C1B1B"
          stroke={currIdx === tracks.length - 1 ? '#8D8D8D' : '#FFFFFF'}
          width={20}
          height={20}
        />
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
  );
};

export default Controls;

const styles = StyleSheet.create({
  controlsWrapper: {
    width: windowWidth * 0.9,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
});

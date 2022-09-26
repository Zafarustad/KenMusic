import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {windowHeight, windowWidth} from '../utils/responsive';
import {useSelector} from 'react-redux';
import TrackPlayer, {
  State,
  useProgress,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
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
  const [currentIdx, setCurrentIdx] = useState(0);
  const {tracks} = useSelector(state => state.player);
  const {position} = useProgress();
  const route = useRoute();
  const id = route?.params?.id;
  const albumId = route?.params?.albumId;

  useEffect(() => {
    startPlayback();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async () => {
    const index = await TrackPlayer.getCurrentTrack();
    setCurrentIdx(index);
  });

  const startPlayback = async () => {
    try {
      const index = tracks.findIndex(track => track.id === id);
      setCurrentIdx(index);
      await TrackPlayer.reset();
      await TrackPlayer.add(tracks);
      await TrackPlayer.skip(index, 0);
      await TrackPlayer.setVolume(0.5);
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
        {tracks
          .filter((_, idx) => idx === currentIdx)
          .map(track => track.title)}
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
          onSlidingComplete={async (value) => await TrackPlayer.seekTo(value)}
        />
      </View>
      <View style={styles.controlsWrapper}>
        <TouchableOpacity
          style={styles.actions}
          disabled={currentIdx === 0}
          activeOpacity={0.6}
          onPress={async () => await TrackPlayer.skipToPrevious()}>
          <SkipBack
            fill="#1C1B1B"
            stroke={currentIdx === 0 ? '#8D8D8D' : '#FFFFFF'}
            width={20}
            height={20}
          />
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
          disabled={currentIdx === tracks.length - 1}
          activeOpacity={0.6}
          onPress={async () => await TrackPlayer.skipToNext()}>
          <SkipForward
            fill="#1C1B1B"
            stroke={currentIdx === tracks.length - 1 ? '#8D8D8D' : '#FFFFFF'}
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

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {windowWidth, windowHeight} from '../utils/responsive';
import {fetchAlbumDetails} from '../reducers/detailSlice';
import Loader from '../components/Loader';
import {clearTracks} from '../reducers/detailSlice';
import TrackCard from '../components/TrackCard';
import {addTracks} from '../reducers/playerSlice';

const Details = () => {
  const {tracks, error} = useSelector(state => state.details);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const id = route?.params?.id;
  const trackCount = route?.params?.trackCount;

  useEffect(() => {
    dispatch(fetchAlbumDetails(id));
    setupTrackPlayer();
    return () => {
      dispatch(clearTracks());
      TrackPlayer.reset();
    };
  }, []);

  const setupTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        stoppingAppPausesPlayback: false,
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onPlayPreview = async id => {
    try {
      const track = await tracks.filter(track => track.id === id);
      await TrackPlayer.reset();
      await TrackPlayer.add(track);
      await TrackPlayer.play();
    } catch (err) {
      console.log(err);
    }
  };

  const onTrackSelect = id => {
    let playerTracks = tracks.map(track => ({
      id: track.id,
      url: track.previewURL,
      title: track.name,
      artist: track.artistName,
      album: track.albumName,
      duration: 30,
    }));
    dispatch(addTracks(playerTracks));
    navigation.navigate('Player', {id});
  };

  const renderItem = ({item, index}) => (
    <TrackCard
      index={index}
      item={item}
      onPlayPreview={onPlayPreview}
      onTrackSelect={onTrackSelect}
    />
  );

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://api.napster.com/imageserver/v2/albums/${id}/images/500x500.jpg`,
        }}
        style={styles.cover}
      />
      <Text style={styles.trackCount}>Track Count: {trackCount}</Text>
      <View style={{marginTop: 20, marginHorizontal: 20}}>
        <Text style={styles.trackTxt}>Tracks</Text>
        {tracks ? (
          <FlatList
            data={tracks}
            keyExtractor={item => item.id}
            removeClippedSubviews={true}
            renderItem={renderItem}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 430,
            }}
            showsVerticalScrollIndicator={false}
          />
        ) : !tracks && !error ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : null}
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#1C1B1B',
  },
  cover: {
    width: windowWidth,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  trackCount: {
    textAlign: 'center',
    marginTop: 15,
    color: '#FFFFFF',
    fontSize: 18,
  },
  trackTxt: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

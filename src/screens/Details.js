import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {windowWidth, windowHeight} from '../utils/responsive';
import {fetchAlbumDetails} from '../reducers/detailSlice';
import Loader from '../components/Loader';
import {clearTracks} from '../reducers/detailSlice';
import PlayIcon from '../assests/play.png';

const Details = () => {
  const {tracks, error} = useSelector(state => state.details);
  const dispatch = useDispatch();
  const route = useRoute();
  const id = route?.params?.id;
  const trackCount = route?.params?.trackCount;

  useEffect(() => {
    dispatch(fetchAlbumDetails(id));

    return () => {
      dispatch(clearTracks());
    };
  }, []);

  console.log(tracks);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={[
        styles.trackCard,
        {borderBottomWidth: index !== tracks.length - 1 ? 0.5 : 0},
      ]}
      activeOpacity={0.5}>
      <View style={{flexDirection: 'row', flex: 1, marginTop: 5}}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#2C2C2C',
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={PlayIcon} />
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={styles.listText}>{item.name}</Text>
          <Text style={styles.listText}>
            {Math.ceil(item.playbackSeconds / 60)} mins
          </Text>
          <Text style={[styles.listText, {color: '#8D8D8D'}]}>
            Artist: {item.artistName}
          </Text>
          <TouchableOpacity
            style={{
              paddingVertical: 5,
              marginTop: 10,
              width: 120,
              position: 'relative',
              zIndex: 1,
              backgroundColor: '#2C2C2C',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Play Preview</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
  trackCard: {
    width: windowWidth * 0.9,
    paddingVertical: 15,
    borderBottomColor: '#8D8D8D',
  },
  listText: {
    color: '#FFFFFF',
    marginVertical: 2,
  },
});

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {windowWidth} from '../utils/responsive';
import {useNavigation} from '@react-navigation/native';

const months = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const AlbumCard = ({item, index}) => {
  const {albums} = useSelector(state => state.albums);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate('Details', {
          id: item.id,
          trackCount: item.trackCount,
        })
      }
      style={[
        styles.albumCard,
        {borderBottomWidth: index !== albums.length - 1 ? 0.5 : 0},
      ]}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <Image
          source={{
            uri: `https://api.napster.com/imageserver/v2/albums/${item.id}/images/500x500.jpg`,
          }}
          style={{marginTop: 5, flex: 0.5}}
        />
        <View style={{marginLeft: 30}}>
          <Text style={styles.listText}>{item.artistName}</Text>
          <Text style={styles.listText}>Tracks: {item.trackCount}</Text>
          <Text style={[styles.listText, {color: '#8D8D8D'}]}>
            Released on: {months[new Date(item.originallyReleased).getMonth()]}{' '}
            {new Date(item.originallyReleased).getFullYear()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  albumCard: {
    width: windowWidth * 0.9,
    padding: 15,
    borderBottomColor: '#8D8D8D',
  },
  listText: {
    color: '#FFFFFF',
    marginVertical: 5,
  },
});

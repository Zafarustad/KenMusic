import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {windowWidth} from '../../utils/responsive';
import {Play} from 'react-native-feather';

const TrackCard = ({item, index, onPlayPreview, onTrackSelect}) => {
  const {tracks} = useSelector(state => state.details);

  return (
    <TouchableOpacity
      onPress={() => onTrackSelect(item.id)}
      style={[
        styles.trackCard,
        {borderBottomWidth: index !== tracks.length - 1 ? 0.5 : 0},
      ]}
      activeOpacity={0.5}>
      <View style={{flexDirection: 'row', flex: 1, marginTop: 5}}>
        <View style={styles.icon}>
          <Play fill="#1C1B1B" stroke="#FFFFFF" width={15} height={15} />
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
            style={styles.previewBtn}
            onPress={() => onPlayPreview(item.id)}>
            <Text>Play Preview</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TrackCard;

const styles = StyleSheet.create({
  trackCard: {
    width: windowWidth * 0.9,
    paddingVertical: 15,
    borderBottomColor: '#8D8D8D',
  },
  listText: {
    color: '#FFFFFF',
    marginVertical: 2,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: '#2C2C2C',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBtn: {
    paddingVertical: 5,
    marginTop: 10,
    width: 120,
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#2C2C2C',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

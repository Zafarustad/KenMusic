import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchAlbums} from '../reducers/albumSlice';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const {albums, error} = useSelector(state => state.albums);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        width: width * 0.9,
        padding: 10,
        borderBottomColor: '#8D8D8D',
        borderBottomWidth: index !== albums.length - 1 ? 0.5 : 0,
      }}>
      <Text style={styles.listText}>{item.artistName}</Text>
      <Text style={styles.listText}>{item.originallyReleased}</Text>
      <Text style={styles.listText}>{item.trackCount}</Text>
    </TouchableOpacity>
  );

  return albums ? (
    <View style={styles.container}>
      <FlatList
        data={albums}
        keyExtractor={item => item.originallyReleased}
        removeClippedSubviews={true}
        renderItem={renderItem}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        ListHeaderComponent={<Text style={styles.header}>KenMusic</Text>}
        ListFooterComponent={
          <ActivityIndicator color="#1ED760" size={50} animating={true} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  ) : !albums ? (
    <View
      style={[
        styles.container,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <ActivityIndicator color="#1ED760" size={50} animating={true} />
    </View>
  ) : error ? (
    <View
      style={[
        styles.container,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <Text style={{color: 'red'}}>Something went wrong!</Text>
    </View>
  ) : null;
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#1C1B1B',
  },
  header: {
    color: '#1ED760',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  listText: {
    color: '#FFFFFF',
    marginVertical: 5,
  },
});

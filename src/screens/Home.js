import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AlbumCard from '../components/AlbumCard';
import Error from '../components/Error';
import Loader from '../components/Loader';
import {fetchAlbums} from '../reducers/albumSlice';
import {windowHeight, windowWidth} from '../utils/responsive';

const Home = () => {
  const {albums, error, offset} = useSelector(state => state.albums);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbums(offset));
  }, []);

  const renderItem = ({item, index}) => <AlbumCard item={item} index={index} />;

  return albums ? (
    <View style={styles.container}>
      <FlatList
        data={albums}
        keyExtractor={item => item.id}
        removeClippedSubviews={true}
        renderItem={renderItem}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        ListHeaderComponent={<Text style={styles.header}>KenMusic</Text>}
        ListFooterComponent={
          <ActivityIndicator
            color="#1ED760"
            size={50}
            animating={true}
            style={{paddingVertical: 5}}
          />
        }
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.6}
        onEndReached={() => {
          dispatch(fetchAlbums(offset));
        }}
      />
    </View>
  ) : !albums && !error ? (
    <Loader />
  ) : error ? (
    <Error />
  ) : null;
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#1C1B1B',
  },
  header: {
    color: '#1ED760',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
